import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export interface Decision {
  api: 'WeatherAPI' | 'ExchangeRateAPI' | 'NewsAPI';
  params: any;
}

export async function decideAPI(userQuestion: string): Promise<Decision> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
    console.log('[SIMULATION] No Gemini API key, falling back to keyword logic');
    return simulateDecision(userQuestion);
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Tu es un assistant qui sélectionne la meilleure API externe pour répondre à une question utilisateur.
APIs disponibles :
- WeatherAPI : pour la météo (ex: ville, région). Paramètres : { city: string }
- ExchangeRateAPI : pour les taux de change (ex: USD/EUR). Paramètres : { base: string, target: string }
- NewsAPI : pour les actualités. Paramètres : { topic: string }
Réponds UNIQUEMENT par un objet JSON valide de la forme : { "api": "WeatherAPI" | "ExchangeRateAPI" | "NewsAPI", "params": { ... } }.
Question : "${userQuestion}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Gemini response not JSON');
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Gemini error:', error);
    return simulateDecision(userQuestion);
  }
}

function simulateDecision(question: string): Decision {
  const q = question.toLowerCase();
  if (q.includes('météo') || q.includes('temps') || q.includes('weather')) {
    const city = extractCity(question) || 'Abidjan';
    return { api: 'WeatherAPI', params: { city } };
  }
  if (q.includes('taux') || q.includes('change') || q.includes('eur') || q.includes('usd') || q.includes('conversion')) {
    return { api: 'ExchangeRateAPI', params: { base: 'USD', target: 'EUR' } };
  }
  return { api: 'NewsAPI', params: { topic: 'general' } };
}

function extractCity(question: string): string | null {
  const regex = /(?:à|de|sur|in|at|dans)\s+([A-Za-zÀ-ÿ\s-]+)/;
  const match = question.match(regex);
  return match ? match[1].trim() : null;
}

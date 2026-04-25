const responses: Record<string, (params: any) => any> = {
  WeatherAPI: (params) => ({
    success: true,
    data: `Météo pour ${params.city || 'la ville'}: Ensoleillé, 28°C, vent faible. (Données simulées)`,
  }),
  ExchangeRateAPI: (params) => ({
    success: true,
    data: `Taux de change ${params.base || 'USD'}/${params.target || 'EUR'} = 0.92 (Simulé)`,
  }),
  NewsAPI: (params) => ({
    success: true,
    data: `Dernières actualités sur ${params.topic || 'le sujet'}: Les agents IA révolutionnent le commerce sur la blockchain Arc. (Simulé)`,
  }),
};

export async function fetchPremiumData(api: 'WeatherAPI' | 'ExchangeRateAPI' | 'NewsAPI', params: any) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 50));
  const handler = responses[api];
  if (!handler) throw new Error(`API ${api} non supportée`);
  return handler(params);
}

export function getAPICost(api: string): number {
  const pricing: Record<string, number> = {
    WeatherAPI: 0.0021,
    ExchangeRateAPI: 0.0018,
    NewsAPI: 0.0012,
  };
  return pricing[api] || 0.0015;
}

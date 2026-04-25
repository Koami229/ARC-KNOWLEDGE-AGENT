import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Receipt, Database, ArrowRight } from 'lucide-react';

interface Message {
  type: 'user' | 'agent';
  text: string;
  api?: string;
  cost?: number;
  txHash?: string;
  error?: boolean;
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  const askAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion('');
    setLoading(true);
    
    setConversation(prev => [...prev, { type: 'user', text: currentQuestion }]);

    try {
      const { data } = await axios.post('/api/ask', { question: currentQuestion });
      setConversation(prev => [...prev, {
        type: 'agent',
        text: data.answer,
        api: data.apiUsed,
        cost: data.userCost,
        txHash: data.userPaymentTx,
      }]);
    } catch (error) {
      setConversation(prev => [...prev, {
        type: 'agent',
        text: "Désolé, une erreur est survenue lors du traitement de votre demande.",
        error: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Pay-per-Knowledge
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Un agent IA qui effectue des nanopaiements USDC en temps réel pour accéder à des données premium sur la blockchain Arc.
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 bg-[#161B28] border border-slate-800 rounded-2xl mb-6 overflow-y-auto p-4 md:p-6 space-y-6 min-h-[400px] shadow-2xl scrollbar-thin scrollbar-thumb-slate-700"
      >
        {conversation.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="bg-green-500/10 p-4 rounded-full mb-4 border border-green-500/20">
              <Sparkles className="text-green-400" size={32} />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Agent de Connaissances ARC</h3>
            <p className="text-slate-500 text-sm max-w-sm">
              Posez une question pour déclencher un nanopaiement USDC instantané vers des sources de données premium.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full max-w-md">
              {[
                "Quel temps fait-il à Abidjan ?",
                "Taux USD/EUR actuel",
                "Dernières news sur l'IA",
                "Conversion BTC en USDC"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuestion(suggestion)}
                  className="text-left px-4 py-3 bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-xs font-medium text-slate-400 transition-all hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {conversation.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] rounded-2xl p-3 shadow-lg ${
                msg.type === 'user'
                  ? 'bg-blue-600/20 text-blue-100 rounded-tr-none border border-blue-500/30'
                  : 'bg-slate-800/40 text-slate-200 rounded-tl-none border border-slate-700'
              }`}>
                <p className="text-xs leading-relaxed font-medium">{msg.text}</p>
                
                {msg.type === 'agent' && !msg.error && (
                  <div className="mt-3 pt-2 border-t border-slate-700 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-green-400 font-mono font-bold uppercase tracking-wider">
                      <span>SETTLED: {msg.cost} USDC</span>
                    </div>
                    {msg.txHash && (
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono">
                        <span>TX: {msg.txHash.slice(0, 10)}...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800/40 px-5 py-3 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Processing Nanopayment...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-1 bg-[#111827] border border-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
        <form onSubmit={askAgent} className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Posez une question à l'agent..."
            className="w-full bg-slate-900 border-none rounded-xl py-3 px-5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all text-slate-200 placeholder-slate-600 font-medium"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="absolute right-2 top-1.5 bg-green-500 hover:bg-green-400 disabled:bg-slate-800 disabled:text-slate-600 text-[#0B0F1A] p-1.5 rounded-lg transition-transform active:scale-95 flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-[10px] font-bold text-green-400 uppercase tracking-[0.2em] mb-4">Economic Advantage: Arc Nanopayments</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Ethereum L1 Cost</p>
            <p className="text-3xl font-light text-red-400/80">$0.50</p>
            <p className="text-[10px] text-slate-600 mt-1">High friction, slow settlement</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Arc Nanopayment</p>
            <p className="text-3xl font-light text-green-400">$0.0046</p>
            <p className="text-[10px] text-green-500/60 mt-1">Real-time micro-transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import { Layers, Activity, DollarSign, Clock, RefreshCw, Info } from 'lucide-react';
import TransactionTable from '../components/TransactionTable';

interface Stats {
  count: number;
  totalAmount: number;
  avgCost: number;
  transactions: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ count: 0, totalAmount: 0, avgCost: 0, transactions: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTransactions = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const { data } = await axios.get('/api/transactions');
      setStats(data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  };

  const triggerBulkDemo = async () => {
    setRefreshing(true);
    try {
      await axios.post('/api/generate-demo');
      await fetchTransactions();
    } catch (error) {
      console.error('Demo generation failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(() => fetchTransactions(), 10000); // Auto refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 container mx-auto px-8 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">Arc Explorer Dashboard</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Suivi on-chain des nanopaiements USDC</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={triggerBulkDemo}
            className="px-5 py-2 bg-green-500 hover:bg-green-400 text-brand-dark rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-green-500/10"
          >
            Launch Demo Batch
          </button>
          <button 
            onClick={() => fetchTransactions(true)}
            disabled={refreshing}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          label="Total Transactions" 
          value={stats.count.toLocaleString()} 
          icon={<Layers className="text-green-400" size={20} />}
          subValue="Verified On-chain"
          color="green"
        />
        <StatCard 
          label="Volume Settled" 
          value={`${stats.totalAmount.toFixed(3)} USDC`} 
          icon={<DollarSign className="text-green-300" size={20} />}
          subValue="Real-time Settlements"
          color="green"
        />
        <StatCard 
          label="Average Efficiency" 
          value={`${(stats.avgCost * 1000).toFixed(1)}m`} 
          icon={<Activity className="text-blue-400" size={20} />}
          subValue="Latency Optimized"
          color="blue"
        />
      </div>

      <div className="bg-[#161B28] border border-slate-800 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/10 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Nanopayments (Live Feed)</h2>
          <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] rounded border border-green-500/20 font-bold uppercase tracking-wider">
            Circle Arc Verified
          </span>
        </div>
        
        {loading ? (
          <div className="p-20 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <TransactionTable transactions={stats.transactions} />
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, subValue, color }: { label: string, value: string, icon: React.ReactNode, subValue: string, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#161B28] border border-slate-800 rounded-2xl p-6 shadow-lg relative overflow-hidden"
    >
      <p className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest leading-none">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-light text-white">{value.split(' ')[0]}</p>
        <p className="text-xs font-bold text-green-400">{value.split(' ')[1] || ''}</p>
      </div>
      <p className="text-[10px] text-slate-600 mt-3 font-medium uppercase tracking-wider">{subValue}</p>
      <div className="absolute right-4 top-4 opacity-20">
        {icon}
      </div>
    </motion.div>
  );
}

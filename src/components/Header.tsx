import { Link, useLocation } from 'react-router-dom';
import { Bot, BarChart3 } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#111827]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform">
            <Bot size={20} className="text-[#0B0F1A]" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white uppercase">
            ARC <span className="text-green-400">Knowledge Agent</span>
          </h1>
        </Link>
      </div>
      
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-2">
          <Link 
            to="/" 
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              location.pathname === '/' 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Interaction
          </Link>
          <Link 
            to="/dashboard" 
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${
              location.pathname === '/dashboard' 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 size={14} />
            Dashboard
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 pl-6 border-l border-slate-800">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">Mainnet: Online</span>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-500 uppercase font-bold leading-none mb-1">Active Wallet</p>
            <p className="text-xs font-mono text-green-300 leading-none">0x71C...49b2</p>
          </div>
        </div>
      </div>
    </header>
  );
}

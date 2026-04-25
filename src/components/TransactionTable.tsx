import { ExternalLink } from 'lucide-react';

interface Transaction {
  txHash: string;
  action: string;
  api: string;
  amountUSDC: number;
  costTX: number;
  timestamp: string;
}

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="p-20 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Aucune transaction enregistrée</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-[#0B0F1A] text-[10px] uppercase font-bold text-slate-500 tracking-widest border-b border-slate-800">
          <tr>
            <th className="px-6 py-4">Hash</th>
            <th className="px-6 py-4">Action / Service</th>
            <th className="px-6 py-4 text-right">Cost (USDC)</th>
            <th className="px-6 py-4 text-right">Timestamp</th>
          </tr>
        </thead>
        <tbody className="text-xs font-mono divide-y divide-slate-800">
          {transactions.map((tx, i) => (
            <tr key={i} className="hover:bg-slate-800/30 group transition-colors">
              <td className="px-6 py-4">
                <span className="text-green-400/80 tracking-tighter">
                  {tx.txHash.slice(0, 16)}...
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-slate-300 font-sans font-medium text-[11px]">{tx.action}</span>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${
                      tx.api === 'Platform' 
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                        : 'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                      {tx.api}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-slate-300 font-bold">{tx.amountUSDC.toFixed(4)}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-slate-600">
                  {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

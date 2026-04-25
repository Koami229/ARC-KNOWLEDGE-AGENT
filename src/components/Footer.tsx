export default function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 px-8 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
        <span>Built on Arc Mainnet</span>
        <span className="hidden md:inline text-slate-700">|</span>
        <span>Settled in USDC</span>
        <span className="hidden md:inline text-slate-700">|</span>
        <span>Powered by Circle Nanopayments</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">v1.0.4-hackathon</span>
        </div>
      </div>
    </footer>
  );
}

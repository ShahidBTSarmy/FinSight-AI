import React, { useState } from 'react';
import { Search, Cpu, Key, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  activeTab: string;
  activeCompany: { name: string; ticker: string } | null;
  hasApiKey: boolean;
}

export default function Header({ onSearch, activeTab, activeCompany, hasApiKey }: HeaderProps) {
  const [searchVal, setSearchVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim() !== '') {
      onSearch(searchVal.trim());
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'home': return 'Platform Strategy Home';
      case 'dashboard': return 'Executive Dashboard';
      case 'analyzer': return 'AI Company Analyzer';
      case 'sentiment': return 'News & Sentiment Intelligence';
      case 'competitors': return 'Competitor Intelligence Matrix';
      case 'simulator': return 'Economic Impact Simulator';
      case 'copilot': return 'AI Investment Copilot';
      case 'reports': return 'Intelligence Reports Archive';
      case 'settings': return 'System Settings & Integration';
      default: return 'FinSight AI';
    }
  };

  // Mock index stream data in dark theme
  const indices = [
    { name: 'S&P 500', value: '5,310.20', change: '+0.84%', isUp: true },
    { name: 'NASDAQ 100', value: '18,850.50', change: '+1.12%', isUp: true },
    { name: 'NIFTY 50', value: '23,540.80', change: '+0.45%', isUp: true },
    { name: 'SENSEX', value: '77,210.15', change: '-0.15%', isUp: false },
  ];

  return (
    <header id="app-header" className="bg-[#08080c] border-b border-[#1e1e2d] flex flex-col w-full z-10 shrink-0 font-sans">
      {/* Top Ticker Tape */}
      <div className="bg-[#050508]/80 border-b border-[#141420] py-2 px-6 flex items-center justify-between overflow-x-auto scrollbar-none whitespace-nowrap space-x-5 text-[10px] font-mono">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-slate-500 font-bold tracking-widest uppercase pr-3 border-r border-[#1e1e2d] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>MARKET TICK FEED</span>
          </div>
          
          <div className="flex items-center space-x-4 shrink-0">
            {indices.map((ind) => (
              <div key={ind.name} className="flex items-center space-x-1.5 bg-[#0e0e16] px-2.5 py-1 rounded-md border border-[#1e1e2d] shadow-inner text-xxs">
                <span className="text-slate-400 font-medium">{ind.name}</span>
                <span className="text-white font-mono font-bold">{ind.value}</span>
                <span className={`font-mono font-extrabold ${ind.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {ind.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3 text-slate-500 font-mono text-[10px] shrink-0 pl-4 border-l border-[#1e1e2d]">
          <span className="flex items-center space-x-1">
            <Cpu className="w-3 h-3 text-blue-400" />
            <span>MODEL:</span>
            <span className="text-blue-400 font-bold">gemini-3.5-flash</span>
          </span>
          <span className="text-slate-650">|</span>
          <span className="flex items-center space-x-1">
            {hasApiKey ? (
              <>
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">LIVE KEY ACTIVE</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 text-amber-400" />
                <span className="text-amber-400 font-bold">EMULATED FALLBACKS</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="px-6 py-4 flex items-center justify-between bg-[#08080c]">
        {/* Tab Title or Company Indicator */}
        <div className="flex items-center space-x-3.5 text-left">
          <div>
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold block">
              {activeCompany ? `${activeCompany.ticker} RESEARCH CORE` : 'SYSTEM NAVIGATION'}
            </span>
            <h1 className="text-lg md:text-xl font-display font-black text-white tracking-tight mt-0.5">
              {activeCompany ? activeCompany.name : getTabTitle()}
            </h1>
          </div>
          {activeCompany && (
            <div className="bg-blue-500/10 border border-blue-400/20 text-blue-400 px-2.5 py-1 rounded-lg text-xxs font-mono font-bold uppercase tracking-wider">
              Active Focus
            </div>
          )}
        </div>

        {/* Universal Company Search */}
        <form onSubmit={handleSubmit} className="relative w-80 md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-500" />
          </div>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search company (e.g., Apple, Tesla, Reliance, HDFC)..."
            className="w-full pl-10 pr-24 py-2 bg-[#0d0d14] border border-[#1e1e2d] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 transition-all font-sans font-medium shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition cursor-pointer"
          >
            Analyze
          </button>
        </form>
      </div>
    </header>
  );
}

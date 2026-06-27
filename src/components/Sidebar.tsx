import React from 'react';
import { 
  Home, 
  TrendingUp, 
  Cpu, 
  Flame, 
  Compass, 
  Sliders, 
  MessageSquareCode, 
  FolderHeart, 
  Settings2,
  Lock,
  Workflow
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasApiKey: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, hasApiKey }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Platform Home', icon: Home, description: 'SaaS overview & strategy' },
    { id: 'dashboard', label: 'Executive Dashboard', icon: TrendingUp, description: 'Search & key takeaways' },
    { id: 'analyzer', label: 'AI Company Analyzer', icon: Cpu, description: 'Investment intelligence scores' },
    { id: 'sentiment', label: 'Sentiment Intel', icon: Flame, description: 'Bullish & bearish summary' },
    { id: 'competitors', label: 'Competitor Analysis', icon: Compass, description: 'Side-by-side comparison' },
    { id: 'simulator', label: 'Economic Simulator', icon: Sliders, description: 'Projected macro impacts' },
    { id: 'copilot', label: 'AI Investment Copilot', icon: MessageSquareCode, description: 'Quantitative Q&A Chat' },
    { id: 'reports', label: 'Intelligence Reports', icon: FolderHeart, description: 'Saved company analyses' },
    { id: 'settings', label: 'System Settings', icon: Settings2, description: 'API configuration & state' },
  ];

  return (
    <aside id="sidebar-container" className="w-80 h-full bg-[#0a0a0f] border-r border-[#1e1e2d] flex flex-col justify-between shrink-0 font-sans text-slate-400 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-[#1e1e2d] flex items-center space-x-3.5 bg-gradient-to-r from-[#0d0d15] to-[#0a0a0f]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-display font-black text-lg shadow-md shadow-blue-900/30 glow-blue">
            F
          </div>
          <div className="text-left">
            <h1 className="font-display font-extrabold tracking-tight text-white text-md leading-none">
              FinSight <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-semibold">AI</span>
            </h1>
            <p className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest mt-1">Investment Intelligence</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[60vh] scrollbar-none">
          <div className="text-[10px] font-mono text-slate-500 uppercase px-3 mb-3 tracking-widest font-bold">RESEARCH DIRECTIVES</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left group cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#171727] to-[#12121f] text-white border border-[#2b2b45] shadow-lg shadow-black/40' 
                    : 'hover:bg-[#12121c]/60 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3.5 overflow-hidden">
                  <Icon className={`w-4.5 h-4.5 shrink-0 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <div className="overflow-hidden">
                    <div className={`text-[12.5px] font-bold leading-tight tracking-tight ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {item.label}
                    </div>
                    <div className={`text-[9.5px] font-sans mt-0.5 truncate ${isActive ? 'text-slate-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Elegant, clean Footer */}
      <div className="p-4 border-t border-[#1e1e2d] bg-[#07070b] space-y-3">
        <div className="flex items-center justify-between px-1 text-[9.5px] font-mono">
          <span className="text-slate-500 uppercase tracking-widest font-bold">AI COGNITIVE RATIO:</span>
          <span className={`${hasApiKey ? 'text-emerald-400' : 'text-amber-400'} flex items-center space-x-1.5 font-bold`}>
            <span className={`w-1.5 h-1.5 ${hasApiKey ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'} rounded-full inline-block`}></span>
            <span className="tracking-wider uppercase">{hasApiKey ? 'REAL-TIME PRO' : 'EMULATOR HYBRID'}</span>
          </span>
        </div>
        
        <div className="p-3 bg-[#0d0d14] rounded-xl border border-[#1e1e2d] flex items-center space-x-2.5 text-[9.5px] font-mono text-slate-400 shadow-inner">
          <Workflow className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span className="font-semibold text-slate-300">FinSight Enterprise Pipeline v3.5</span>
        </div>
      </div>
    </aside>
  );
}

import React from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  ShieldAlert, 
  Globe, 
  SearchCode, 
  Terminal, 
  Activity,
  Cpu,
  Layers,
  Sparkles,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadAlertsCount: number;
}

export default function Sidebar({ activeTab, setActiveTab, unreadAlertsCount }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Command Home', icon: Home, description: 'Advisor overview & guide' },
    { id: 'markets', label: 'Market Intelligence', icon: TrendingUp, description: 'Live sentiments & indices' },
    { id: 'portfolio', label: 'Portfolio Health', icon: Briefcase, description: 'Stress-testing & resilience' },
    { id: 'oracle', label: 'Oracle Research', icon: Terminal, description: 'Interactive GenAI insights' },
    { id: 'esg', label: 'Alexandria ESG', icon: Globe, description: 'Governance & carbon' },
    { id: 'opportunities', label: 'Opportunity Scanner', icon: SearchCode, description: 'Underpriced anomalies' },
    { id: 'risks', label: 'Risk Radar', icon: ShieldAlert, description: 'Geopolitical & macro alerts' },
  ];

  return (
    <aside id="sidebar-panel" className="w-72 bg-white border-r border-slate-200/70 flex flex-col justify-between h-full text-slate-700 font-sans shrink-0">
      <div className="flex flex-col">
        {/* Header Branding */}
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3 bg-slate-50/20">
          <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-sm shadow-indigo-200/50 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h1 className="font-display font-extrabold tracking-tight text-slate-950 text-md leading-none">FinSight <span className="text-indigo-600 font-medium">AI</span></h1>
            <p className="text-[9px] font-mono text-indigo-600 font-bold uppercase tracking-widest mt-1">Macro Advisory Core</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase px-3.5 mb-3.5 tracking-widest font-semibold">Advisory Modules</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left group cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 text-white font-semibold shadow-sm' 
                    : 'hover:bg-slate-50 hover:text-slate-950 text-slate-500'
                }`}
              >
                <div className="flex items-center space-x-3.5 overflow-hidden">
                  <Icon className={`w-4.5 h-4.5 shrink-0 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-900'}`} />
                  <div className="overflow-hidden">
                    <div className={`text-[13px] font-semibold leading-tight tracking-tight ${isActive ? 'text-white' : 'text-slate-800 group-hover:text-slate-950'}`}>{item.label}</div>
                    <div className={`text-[10px] font-sans mt-0.5 truncate ${isActive ? 'text-slate-400' : 'text-slate-400 group-hover:text-slate-500'}`}>{item.description}</div>
                  </div>
                </div>
                {item.id === 'risks' && unreadAlertsCount > 0 && (
                  <span className="shrink-0 ml-1.5 bg-rose-600 text-white text-[9px] font-mono font-bold rounded-full px-1.5 py-0.5 leading-none min-w-[18px] text-center animate-pulse shadow-sm shadow-rose-250">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Elegant, clean Footer */}
      <div className="p-5 border-t border-slate-100 bg-slate-50/40 space-y-3.5">
        <div className="flex items-center justify-between px-1 text-[10px] font-mono">
          <span className="text-slate-400 uppercase tracking-widest font-semibold">Data Stream:</span>
          <span className="text-emerald-600 flex items-center space-x-1 font-bold">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
            <span className="tracking-wider">ACTIVE</span>
          </span>
        </div>
        <div className="flex items-center justify-between px-1 text-[10px] font-mono">
          <span className="text-slate-400 uppercase tracking-widest font-semibold">Oracle Brain:</span>
          <span className="text-indigo-600 font-bold tracking-wider">GEMINI 3.5</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200/50 flex items-center space-x-2 text-[10px] font-mono text-slate-500 shadow-3xs">
          <Activity className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="font-medium text-slate-600">Institutional Gateway proxy</span>
        </div>
      </div>
    </aside>
  );
}

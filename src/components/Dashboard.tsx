import React from 'react';
import { CompanyReport } from '../types';
import { 
  TrendingUp, 
  Cpu, 
  Flame, 
  Compass, 
  Sliders, 
  MessageSquareCode, 
  HelpCircle,
  TrendingDown,
  Layout,
  CheckCircle,
  PlusCircle,
  FileText
} from 'lucide-react';

interface DashboardProps {
  activeCompany: CompanyReport | null;
  onSelectCompany: (name: string) => void;
  savedReportsCount: number;
}

export default function Dashboard({ activeCompany, onSelectCompany, savedReportsCount }: DashboardProps) {
  
  const trendingCompanies = [
    { name: 'Apple', ticker: 'AAPL', score: 88, desc: 'Ecosystem & services anchor', color: 'border-blue-500/20 hover:border-blue-500/50' },
    { name: 'Tesla', ticker: 'TSLA', score: 74, desc: 'EV pioneer & AI robot developer', color: 'border-purple-500/20 hover:border-purple-500/50' },
    { name: 'Infosys', ticker: 'INFY', score: 81, desc: 'IT consulting transformation lead', color: 'border-indigo-500/20 hover:border-indigo-500/50' },
    { name: 'Reliance', ticker: 'RELIANCE', score: 84, desc: 'Digital, retail & refinery proxy', color: 'border-emerald-500/20 hover:border-emerald-500/50' },
    { name: 'TCS', ticker: 'TCS', score: 83, desc: 'Stable cash returning Tata giant', color: 'border-cyan-500/20 hover:border-cyan-500/50' },
    { name: 'HDFC Bank', ticker: 'HDFC', score: 86, desc: 'Underwriting sentinel credit proxy', color: 'border-amber-500/20 hover:border-amber-500/50' },
  ];

  return (
    <div id="dashboard-tab" className="h-full overflow-y-auto px-6 py-6 space-y-8 font-sans text-slate-300">
      
      {/* 1. SESSION DIAGNOSTIC SUMMARY STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-4 text-left shadow-md">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">ACTIVE RESEARCH SPOTLIGHT</span>
          <h4 className="text-sm font-bold font-display text-white mt-1">
            {activeCompany ? `${activeCompany.companyName} (${activeCompany.ticker})` : 'None Selected'}
          </h4>
          <p className="text-[10px] text-slate-400 mt-1">
            {activeCompany ? 'AI intelligence metrics loaded' : 'Search a company to activate focus'}
          </p>
        </div>

        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-4 text-left shadow-md">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">OVERALL COGNITIVE SCORE</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <h4 className="text-xl font-black font-mono text-blue-400">
              {activeCompany ? `${activeCompany.investmentScore}/100` : '--/--'}
            </h4>
            <span className="text-[10px] text-slate-500">
              {activeCompany ? 'STRONG BUY THESIS' : 'Await input'}
            </span>
          </div>
        </div>

        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-4 text-left shadow-md">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">REPORTS IN SECURE CACHE</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <h4 className="text-xl font-black font-mono text-emerald-400">
              {savedReportsCount}
            </h4>
            <span className="text-[10px] text-slate-500">
              SaaS documents saved
            </span>
          </div>
        </div>

        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-4 text-left shadow-md">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">SESSION LATENCY BUFFER</span>
          <div className="flex items-baseline space-x-2 mt-1">
            <h4 className="text-xl font-black font-mono text-indigo-400">
              8ms
            </h4>
            <span className="text-[10px] text-slate-500">
              TLS 1.3 Proxy active
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HUB ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 columns: Active Company Highlights or Search Prompt */}
        <div className="lg:col-span-8 space-y-6">
          {activeCompany ? (
            <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 text-left space-y-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center justify-between border-b border-[#1e1e2d] pb-3.5">
                <div>
                  <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-extrabold">ACTIVE DOSSIER OVERVIEW</span>
                  <h3 className="text-base font-display font-black text-white mt-0.5">{activeCompany.companyName}</h3>
                </div>
                <div className="flex items-center space-x-2 text-xxs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md uppercase font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Dossier Stabilized</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {activeCompany.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 bg-[#0f0f1c]/50 rounded-xl border border-[#1a1a2b]">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Revenue Base</span>
                    <span className="text-xs font-bold text-white block mt-1">{activeCompany.financials?.revenue}</span>
                  </div>
                  <div className="p-3.5 bg-[#0f0f1c]/50 rounded-xl border border-[#1a1a2b]">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Operating Yield</span>
                    <span className="text-xs font-bold text-emerald-400 block mt-1">{activeCompany.financials?.profitability}</span>
                  </div>
                  <div className="p-3.5 bg-[#0f0f1c]/50 rounded-xl border border-[#1a1a2b]">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Debt Status</span>
                    <span className="text-xs font-bold text-white block mt-1">{activeCompany.financials?.debt}</span>
                  </div>
                </div>

                <div className="pt-3.5">
                  <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold block mb-2">CRITICAL RESEARCH STRATEGIC TAKEAWAYS</span>
                  <ul className="space-y-2.5 text-xxs text-slate-450 leading-relaxed list-none">
                    {activeCompany.keyTakeaways.map((t, idx) => (
                      <li key={idx} className="flex items-start space-x-2 bg-[#0e0e18]/40 border border-[#1a1a28] p-2.5 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                        <span className="text-slate-350">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#0c0c16] to-[#050508] border border-[#1e1e2d] rounded-2xl p-10 text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-[#131322] border border-[#1e1e2d] flex items-center justify-center mx-auto shadow-md">
                <Layout className="w-6 h-6 text-indigo-400 animate-pulse" />
              </div>
              <div className="max-w-md mx-auto space-y-1.5">
                <h3 className="text-sm font-bold font-display text-white">No active company focused yet</h3>
                <p className="text-xxs text-slate-500 leading-relaxed">
                  FinSight AI is built to evaluate companies instantly. Enter any global or regional asset (e.g., Apple, Tesla, Infosys, Reliance, TCS, or HDFC Bank) in the search bar above, or select one from the trending roster below to load immediate actionable intelligence.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right 4 columns: Platform Stats / How-to */}
        <div className="lg:col-span-4 bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 text-left space-y-4 shadow-md relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/5 rounded-full blur-xl"></div>
          <h3 className="text-xs font-bold font-display text-white">Platform Operation Status</h3>
          
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xxs">
              <span className="text-slate-500 font-mono uppercase">API Grounding Pipeline</span>
              <span className="text-emerald-400 font-bold font-mono">Secured (SSL)</span>
            </div>
            <div className="flex items-center justify-between text-xxs">
              <span className="text-slate-500 font-mono uppercase">Vite Server Gateway</span>
              <span className="text-blue-400 font-bold font-mono">Port 3000 online</span>
            </div>
            <div className="flex items-center justify-between text-xxs">
              <span className="text-slate-500 font-mono uppercase">Dynamic AI Emulators</span>
              <span className="text-indigo-400 font-bold font-mono">Active Fallback</span>
            </div>
            <div className="flex items-center justify-between text-xxs">
              <span className="text-slate-500 font-mono uppercase">Underwriting Logic</span>
              <span className="text-white font-bold font-mono">SaaS Engine v3.5</span>
            </div>
          </div>

          <div className="border-t border-[#1e1e2d] pt-4 space-y-2.5">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold">Active Directives checklist</div>
            <div className="text-xxs text-slate-450 leading-relaxed space-y-1.5">
              <p className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Select active target ticker.</span>
              </p>
              <p className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Explore Company Analyzer scoreboards.</span>
              </p>
              <p className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Audit side-by-side competitor matrices.</span>
              </p>
              <p className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Slide economic variables to stress test margins.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TRENDING COMPANY SELECTOR ROSTER */}
      <div className="space-y-4">
        <div className="text-left">
          <span className="text-[9px] font-mono text-blue-400 uppercase font-extrabold tracking-widest">RAPID ANALYSIS SELECTOR</span>
          <h3 className="text-sm font-display font-bold text-white mt-0.5">Trending Investment Targets</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {trendingCompanies.map((c) => (
            <div
              key={c.name}
              onClick={() => onSelectCompany(c.name)}
              className={`p-4 bg-[#0b0b13] border ${c.color} rounded-2xl hover:bg-[#11111f] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left space-y-3.5 shadow-md flex flex-col justify-between`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black font-display text-white">{c.name}</span>
                  <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-400/20 px-2 py-0.5 rounded-md uppercase">
                    {c.ticker}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-sans">
                  {c.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1a1a2a] flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-450 uppercase font-bold">Score</span>
                <span className="text-xs font-black font-mono text-emerald-400">{c.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

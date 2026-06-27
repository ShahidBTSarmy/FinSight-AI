import React from 'react';
import { 
  Cpu, 
  Flame, 
  Compass, 
  Sliders, 
  MessageSquareCode, 
  FolderHeart, 
  Sparkles, 
  ArrowRight, 
  Award,
  Zap,
  ShieldCheck,
  Layout,
  ExternalLink
} from 'lucide-react';

interface HomepageProps {
  onNavigate: (tab: string) => void;
  onLoadDemo: () => void;
}

export default function Homepage({ onNavigate, onLoadDemo }: HomepageProps) {
  const coreValues = [
    {
      title: "Real Fintech SaaS Depth",
      desc: "Answers 'Should I invest in this company, and why?' by transforming disjointed financials into structured strategic metrics."
    },
    {
      title: "Tactical Competitor Comparison",
      desc: "Juxtapose growth metrics, competitive advantages, and core risk structures with dual-column clarity."
    },
    {
      title: "Stress Impact Projections",
      desc: "Simulate interest rates, energy spikes, or GDP movements to calculate estimated percentage-based margin impacts."
    }
  ];

  const modules = [
    {
      id: 'dashboard',
      label: 'Executive Dashboard',
      icon: Layout,
      color: 'from-blue-500 to-indigo-600',
      glow: 'glow-blue',
      badge: 'Analytical Hub',
      desc: 'Enter any global company to generate an overarching diagnostic, view saved reports, and inspect system health parameters.'
    },
    {
      id: 'analyzer',
      label: 'AI Company Analyzer',
      icon: Cpu,
      color: 'from-purple-500 to-fuchsia-600',
      glow: 'glow-purple',
      badge: 'Score Metrics',
      desc: 'Audits investment feasibility across five core pillars: growth, balance sheet health, risk factors, moat strength, and valuation.'
    },
    {
      id: 'sentiment',
      label: 'Sentiment Intelligence',
      icon: Flame,
      color: 'from-orange-500 to-rose-600',
      glow: 'glow-orange',
      badge: 'News Radar',
      desc: 'Aggregates recent market news and institutional commentary to formulate Bullish, Bearish, and Neutral sentiment indexes.'
    },
    {
      id: 'competitors',
      label: 'Competitor Intelligence',
      icon: Compass,
      color: 'from-cyan-500 to-blue-600',
      glow: 'glow-blue',
      badge: 'Moat Auditor',
      desc: 'Side-by-side interactive comparison matrices outlining competitor financial sizes, relative risk variables, and physical advantages.'
    },
    {
      id: 'simulator',
      label: 'Economic Simulator',
      icon: Sliders,
      color: 'from-teal-500 to-emerald-600',
      glow: 'glow-emerald',
      badge: 'Projective Delta',
      desc: 'Stress-test target margins against extreme inflation, rate hikes, foreign exchange translation, and global energy shocks.'
    },
    {
      id: 'copilot',
      label: 'AI Investment Copilot',
      icon: MessageSquareCode,
      color: 'from-fuchsia-500 to-pink-600',
      glow: 'glow-purple',
      badge: 'GenAI Brain',
      desc: 'Have conversational Q&A sessions with our quantitative co-advisor to detail micro-risks and query strategic positions.'
    }
  ];

  return (
    <div id="homepage-container" className="h-full overflow-y-auto px-6 py-8 space-y-12 font-sans text-slate-300">
      
      {/* 1. HERO SPOTLIGHT PANEL */}
      <div className="relative bg-gradient-to-br from-[#0c0c16] via-[#080812] to-[#040409] border border-[#212135]/50 rounded-3xl p-8 md:p-10 overflow-hidden shadow-2xl">
        {/* Ambient grids & custom gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141424_1px,transparent_1px),linear-gradient(to_bottom,#141424_1px,transparent_1px)] bg-[size:28px_28px] opacity-25"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-5 max-w-2xl text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-500/15 border border-blue-500/30 px-3.5 py-1.5 rounded-full text-blue-300 text-[10px] font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Institutional Investment Intelligence Suite v3.5</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-none text-white">
              AI-Powered <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Investment Intelligence
              </span> <br />
              for Smarter Decisions
            </h1>
            
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl font-normal">
              Analyze companies, evaluate risks, understand market sentiment, and make informed investment decisions through AI-powered financial intelligence. Say goodbye to un-actionable charts and generic data feeds.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-blue-900/30 transition-all flex items-center space-x-2.5 cursor-pointer group"
              >
                <span>Analyze a Company</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onLoadDemo}
                className="px-6 py-3.5 bg-[#12121d] hover:bg-[#19192b] text-slate-200 border border-[#2b2b45] rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center space-x-2.5 cursor-pointer"
              >
                <span>View Demo Report</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* 2. PROMINENT "BUILT BY SHAHID PASHA" ACCENT CARD */}
          <div className="shrink-0 lg:max-w-sm w-full">
            <div className="p-6 bg-gradient-to-b from-[#131322] to-[#0b0b14] border border-[#2b2b45] rounded-2xl shadow-2xl space-y-4 relative overflow-hidden group hover:border-[#4f4fad] transition-all duration-300 text-left">
              {/* Glowing decorative indicator */}
              <div className="absolute top-0 right-0 bg-blue-600 text-white font-mono text-[8px] font-bold tracking-widest px-4 py-1 rounded-bl-xl uppercase">
                Core Engineer
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg font-display font-extrabold text-base glow-blue">
                  SP
                </div>
                <div>
                  <span className="text-[9px] font-mono text-indigo-400 uppercase font-bold tracking-widest block">Lead Developer Portfolio</span>
                  <h3 className="text-base font-display font-black text-white tracking-wide mt-0.5">Shahid Pasha</h3>
                </div>
              </div>

              {/* Removed requested paragraphs and badge */}
            </div>
          </div>
        </div>
      </div>

      {/* 3. COHESIVE VALUE PROPOSITION STATS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coreValues.map((val, idx) => (
          <div key={idx} className="p-5 bg-[#0a0a0f] border border-[#1e1e2d] rounded-2xl text-left space-y-1.5 shadow-md">
            <div className="text-xs font-bold text-white font-display flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>{val.title}</span>
            </div>
            <p className="text-xxs text-slate-500 leading-relaxed">
              {val.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 4. MODULAR RESEARCH DIRECTIVES SECTION */}
      <div className="space-y-6">
        <div className="text-left border-l-2 border-blue-500 pl-4">
          <span className="text-[10px] font-mono text-blue-400 uppercase font-extrabold tracking-widest">PRODUCT COMPASS</span>
          <h2 className="text-lg md:text-xl font-display font-black text-white mt-1">SaaS Advisory Portal Modules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div 
                key={mod.id} 
                onClick={() => onNavigate(mod.id)}
                className="bg-[#0b0b14] border border-[#1e1e2d] rounded-2xl p-5 hover:border-[#2b2b45] hover:bg-[#10101d] transition-all duration-200 flex flex-col justify-between group text-left cursor-pointer shadow-md relative overflow-hidden"
              >
                {/* Micro visual colored bar */}
                <div className="absolute top-0 left-6 w-12 h-[2px] bg-slate-800 group-hover:bg-blue-500 transition-colors"></div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${mod.color} text-white shadow-md ${mod.glow}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[8.5px] font-mono font-bold tracking-wider px-2 py-0.5 bg-[#141424] border border-[#212135] rounded-md text-slate-400 uppercase">
                      {mod.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold font-display text-white group-hover:text-blue-400 transition-colors">
                      {mod.label}
                    </h3>
                    <p className="text-xxs text-slate-400 leading-relaxed font-sans">
                      {mod.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#151525] mt-5 flex items-center justify-between">
                  <span className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                    READY FOR INPUT
                  </span>
                  <span className="flex items-center space-x-1 text-xxs font-mono text-blue-400 hover:text-blue-300 font-bold tracking-wider">
                    <span>Explore Module</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. METICULOUS OPERATING INSTRUCTIONS STRIP */}
      <div className="bg-[#08080f] border border-[#1e1e2d] rounded-2xl p-6 text-left space-y-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#121221] rounded-xl text-blue-400 border border-[#1e1e2d]">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Platform Manual</span>
            <h3 className="text-xs font-bold font-display text-white">Three-Step Instant Analysis Workflow</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5 p-4 bg-[#0d0d16]/40 border border-[#1e1e2d] rounded-xl">
            <span className="text-[10px] font-mono text-indigo-400 font-black uppercase">Step 01</span>
            <h4 className="text-xxs font-bold text-white">Type Company Name</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Use the top-right search input from any tab, or pick one from the Trending list inside the Dashboard.
            </p>
          </div>
          <div className="space-y-1.5 p-4 bg-[#0d0d16]/40 border border-[#1e1e2d] rounded-xl">
            <span className="text-[10px] font-mono text-blue-400 font-black uppercase">Step 02</span>
            <h4 className="text-xxs font-bold text-white">Inspect Custom Metrics</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Examine side-by-side advantages, news sentiment summary ratios, and run the macroeconomic slider simulator.
            </p>
          </div>
          <div className="space-y-1.5 p-4 bg-[#0d0d16]/40 border border-[#1e1e2d] rounded-xl">
            <span className="text-[10px] font-mono text-emerald-400 font-black uppercase">Step 03</span>
            <h4 className="text-xxs font-bold text-white">Consult AI Copilot</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ask questions in natural language. Copilot automatically consumes your active company context to give simple answers.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1a1a2d] flex flex-wrap items-center justify-between gap-4 text-[9px] font-mono text-slate-500 font-bold uppercase">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ENCRYPTED SECURE SAAS PIPELINE</span>
          </span>
          <span className="text-[8.5px] text-slate-600">
            Finsight AI • All Rights Reserved 2026
          </span>
        </div>
      </div>

    </div>
  );
}

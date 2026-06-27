import React from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  Compass, 
  Leaf, 
  Target, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';

interface HomepageProps {
  onNavigate: (tab: string) => void;
  unreadAlertsCount: number;
}

export default function Homepage({ onNavigate, unreadAlertsCount }: HomepageProps) {
  const modules = [
    {
      id: 'markets',
      label: 'Market Intelligence',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
      textLight: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      badge: 'Live Sentiment',
      desc: 'Real-time financial sentiment metrics, global benchmark tickers, and custom interactive historical performance data streams.',
      actionText: 'Launch Terminal'
    },
    {
      id: 'portfolio',
      label: 'Portfolio Health',
      icon: Briefcase,
      color: 'from-emerald-500 to-teal-600',
      textLight: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      badge: 'Risk Analyzer',
      desc: 'Run multi-variable stress testing models (GDP drops, oil shocks, pandemic spikes) with instant real-time capital weight allocation sliders.',
      actionText: 'Stress Test Portfolio'
    },
    {
      id: 'oracle',
      label: 'Oracle Research',
      icon: Compass,
      color: 'from-purple-500 to-fuchsia-600',
      textLight: 'text-purple-600 bg-purple-50 border-purple-100',
      badge: 'GenAI Brain',
      desc: 'Engage with our Gemini-powered institutional advisor to synthesize complex macroeconomic reports, ask about hedging strategies, or formulate risk parameters.',
      actionText: 'Query Oracle'
    },
    {
      id: 'esg',
      label: 'Alexandria ESG',
      icon: Leaf,
      color: 'from-teal-600 to-cyan-700',
      textLight: 'text-teal-600 bg-teal-50 border-teal-100',
      badge: 'Carbon & Governance',
      desc: 'Inspect corporate climate highlights, social governance scores, and independent audit compliance details for global enterprise holdings.',
      actionText: 'Review ESG Records'
    },
    {
      id: 'opportunities',
      label: 'Opportunity Scanner',
      icon: Target,
      color: 'from-amber-500 to-orange-600',
      textLight: 'text-amber-600 bg-amber-50 border-amber-100',
      badge: 'Alpha Scanner',
      desc: 'Detect deep-value anomalies, oversold signals, high institutional demand tickers, and instantly simulate injecting them into your active portfolio.',
      actionText: 'Scan Anomalies'
    },
    {
      id: 'risks',
      label: 'Risk Radar',
      icon: ShieldAlert,
      color: 'from-rose-500 to-red-650',
      textLight: 'text-rose-600 bg-rose-50 border-rose-100',
      badge: unreadAlertsCount > 0 ? `${unreadAlertsCount} Active Feeds` : 'Macro Shield',
      desc: 'Geopolitical disruption logs, maritime shipping alerts, cyber defense status. Features custom browser-native push alerts for instant warnings.',
      actionText: 'Open Radar Screen',
      highlightBadge: unreadAlertsCount > 0
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Authorize Notifications',
      desc: 'Click on "Risk Radar" or the Header Alert Badge to allow secure browser-level push alerts for sudden macroeconomic anomalies.'
    },
    {
      step: '02',
      title: 'Analyze & Refine Portfolio',
      desc: 'Head to "Portfolio Health" to adjust share count limits. Apply global shock scenarios to monitor immediate prospective delta drops.'
    },
    {
      step: '03',
      title: 'Scan Opportunities',
      desc: 'Filter extreme oversold signals with underpriced catalysts. Add top-tier anomalies to your testing allocation pools in one click.'
    },
    {
      step: '04',
      title: 'Formulate with the Oracle',
      desc: 'Use the "Oracle Research" chat to prompt complex hedging scenarios. Ask questions about inflation or carbon records to auto-audit.'
    }
  ];

  return (
    <div id="homepage-container" className="h-full overflow-y-auto pr-1 pb-16 space-y-8 font-sans text-slate-800">
      
      {/* 1. Hero Spotlight & Built By Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-6 md:p-8 text-white overflow-hidden shadow-md">
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-15"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1.5 rounded-full text-indigo-300 text-xxs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>FinSight Intelligence Suite v3.5</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight leading-tight">
              The Next-Generation Institutional <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                Macro Advisory Command Center
              </span>
            </h1>
            
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl font-normal">
              A premium, high-fidelity quantitative analysis playground designed to stress-test assets against extreme global catalysts, audit ESG profiles, scan underpriced anomalies, and communicate with institutional-grade GenAI advisors.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('markets')}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-indigo-900/30 transition-all flex items-center space-x-2 cursor-pointer group"
              >
                <span>Enter Command Center</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#directions-section"
                className="px-5 py-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center space-x-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Operating Instructions</span>
              </a>
            </div>
          </div>

          {/* Prominent & Premium "Built by Shahid Pasha" Banner */}
          <div className="shrink-0 lg:max-w-xs w-full">
            <div className="p-5.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl shadow-xl space-y-3.5 relative overflow-hidden group hover:border-white/25 transition-all duration-300 text-left">
              {/* Subtle top decoration badge */}
              <div className="absolute top-0 right-0 bg-indigo-650 text-white font-mono text-[8px] font-bold tracking-widest px-3.5 py-1 rounded-bl-xl uppercase">
                Verified
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-md font-bold text-sm">
                  SP
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-300 uppercase font-bold tracking-widest">Lead Engineer</span>
                  <h3 className="text-sm font-display font-extrabold text-white tracking-wide mt-0.5">Shahid Pasha</h3>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 space-y-2">
                <p className="text-[11px] text-slate-300 leading-normal font-sans">
                  Crafted meticulously to combine high-performance web components, robust type-safety, responsive layouts, and seamless real-time web push channels.
                </p>
                <div className="flex items-center space-x-1.5 text-[9px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Gold Standard Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Advisory Modules Grid - Careful Layout with Rich Colors */}
      <div className="space-y-4">
        <div className="text-left">
          <span className="text-[10px] font-mono text-indigo-600 uppercase font-extrabold tracking-widest">Institutional Portal</span>
          <h2 className="text-lg font-display font-bold text-slate-950 mt-1">Explore Advisory Modules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div 
                key={mod.id} 
                className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between group text-left shadow-2xs relative"
              >
                {/* Visual accent colored pill */}
                <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r rounded-b-md from-slate-100 to-slate-200 group-hover:from-indigo-500 group-hover:to-indigo-600 transition-colors"></div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${mod.color} text-white shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border uppercase ${mod.textLight} ${mod.highlightBadge ? 'animate-bounce' : ''}`}>
                      {mod.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-display font-bold text-slate-900 group-hover:text-indigo-650 transition-colors">
                      {mod.label}
                    </h3>
                    <p className="text-xxs text-slate-500 leading-relaxed font-sans mt-2">
                      {mod.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">
                    SYSTEM SECURE
                  </span>
                  <button
                    onClick={() => onNavigate(mod.id)}
                    className="flex items-center space-x-1 text-xxs font-mono text-indigo-600 hover:text-indigo-800 font-bold tracking-wider transition cursor-pointer group-hover:translate-x-1.5 duration-300"
                  >
                    <span>{mod.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Operational Directions Section */}
      <div id="directions-section" className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6 text-left space-y-5">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Manual Guide</span>
            <h3 className="text-sm font-display font-bold text-slate-950 mt-0.5">Operating Instructions & Alignment</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((st, index) => (
            <div key={index} className="bg-white p-4.5 rounded-xl border border-slate-200/50 space-y-2 shadow-3xs relative overflow-hidden">
              <span className="absolute -right-2 -bottom-2 text-3xl font-mono font-extrabold text-slate-50 opacity-40 select-none">
                {st.step}
              </span>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                <h4 className="text-xxs font-bold font-display text-slate-900">{st.title}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans mt-1">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Security / Technology Badge Strip */}
        <div className="pt-4 border-t border-slate-250/50 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-slate-450 font-bold">
          <div className="flex items-center space-x-5">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>TLS 1.3 SIGNATURE SECURED</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>LATENCY LIMIT: &lt; 15MS</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Globe2 className="w-4 h-4 text-indigo-500" />
              <span>MULTILATERAL LIQUIDITY DATA</span>
            </span>
          </div>
          <span className="text-[9px] text-slate-400">
            ESTABLISHED WORKSPACE PREVIEW PROTOCOL
          </span>
        </div>
      </div>

    </div>
  );
}

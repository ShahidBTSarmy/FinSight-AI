import React from 'react';
import { CompanyReport } from '../types';
import { 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  TrendingDown, 
  Layout, 
  Search,
  DollarSign,
  Briefcase,
  HelpCircle
} from 'lucide-react';

interface AnalyzerProps {
  activeCompany: CompanyReport | null;
  onNavigate: (tab: string) => void;
}

export default function Analyzer({ activeCompany, onNavigate }: AnalyzerProps) {
  if (!activeCompany) {
    return (
      <div id="analyzer-empty" className="h-full flex items-center justify-center p-6">
        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-10 text-center max-w-lg space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
          <div className="w-14 h-14 rounded-full bg-[#131322] border border-[#1e1e2d] flex items-center justify-center mx-auto shadow-md">
            <Zap className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-bold font-display text-white">No active company focused</h3>
            <p className="text-xxs text-slate-500 leading-relaxed">
              Before we can audit and score corporate metrics, please utilize the top search bar to find an asset (e.g. Apple, Tesla, Reliance, HDFC) or select one from the Executive Dashboard.
            </p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-2.5 bg-[#141424] hover:bg-[#1c1c32] border border-[#2b2b45] text-slate-200 text-xxs font-mono font-bold uppercase rounded-xl tracking-wider transition cursor-pointer"
          >
            Go to Executive Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { scores } = activeCompany;

  // Map scores into descriptions
  const scoreDetails = [
    {
      label: "Growth Score",
      score: scores.growth,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      desc: "Measures compounding annual revenue trends, client expansion, and product line development vectors.",
      metric: activeCompany.financials?.revenue || "Resilient YoY growth"
    },
    {
      label: "Financial Health Score",
      score: scores.financialHealth,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      desc: "Evaluates debt-to-equity ratio coverage, cash reserve liquidity, and AAA-grade asset sheet resilience.",
      metric: activeCompany.financials?.debt || "High liquidity buffer"
    },
    {
      label: "Structural Risk Score",
      score: scores.risk,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      desc: "Quantifies regulatory vulnerability, leverage exposure, and macro market cycle elasticity. (Lower is safer).",
      metric: `Risk factor: ${scores.risk > 40 ? 'Moderate/High' : 'Favorable/Low'}`
    },
    {
      label: "Competitive Strength",
      score: scores.competitiveStrength,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      desc: "Audits consumer retention moats, ecosystem density, intellectual property patents, and pricing margins.",
      metric: activeCompany.financials?.profitability || "High operational moats"
    },
    {
      label: "Valuation Score",
      score: scores.valuation,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      desc: "Weighs spot price multiples relative to historical averages and projected discounting cash flow yields.",
      metric: "P/E margin adjusted yield"
    }
  ];

  // Helper to color overall investment score
  const getOverallColor = (sc: number) => {
    if (sc >= 85) return 'text-emerald-400';
    if (sc >= 75) return 'text-blue-400';
    return 'text-amber-400';
  };

  return (
    <div id="analyzer-tab" className="h-full overflow-y-auto px-6 py-6 space-y-8 font-sans text-slate-300 text-left">
      
      {/* 1. OVERALL INVESTMENT THESIS GAUGE */}
      <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

        {/* Big Radial Score */}
        <div className="relative shrink-0 flex items-center justify-center w-40 h-40 rounded-full border-4 border-[#12121e] bg-[#050508]/80 shadow-inner glow-blue">
          {/* Subtle gauge glow ring */}
          <div className="absolute inset-2 rounded-full border border-dashed border-slate-700/40"></div>
          <div className="text-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">INTELLIGENCE</span>
            <span className={`text-4xl font-black font-mono leading-none tracking-tight block mt-1 ${getOverallColor(activeCompany.investmentScore)}`}>
              {activeCompany.investmentScore}
            </span>
            <span className="text-[9px] font-mono text-slate-400 font-extrabold uppercase mt-1 inline-block bg-blue-500/10 border border-blue-400/20 px-2 py-0.5 rounded-md">
              Score Ratio
            </span>
          </div>
        </div>

        {/* Summary text */}
        <div className="space-y-4 max-w-xl">
          <div>
            <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold">RESEARCH SUMMARY</span>
            <h2 className="text-base md:text-lg font-display font-black text-white mt-1">
              Active Focus Target: {activeCompany.companyName} ({activeCompany.ticker})
            </h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {activeCompany.summary}
          </p>
          <div className="flex flex-wrap gap-2.5 text-xxs font-mono">
            <span className="bg-[#121221] border border-[#2b2b45] px-2.5 py-1 rounded-md text-slate-400">
              Ticker: {activeCompany.ticker}
            </span>
            <span className="bg-[#121221] border border-[#2b2b45] px-2.5 py-1 rounded-md text-slate-400">
              Score Assessment: {activeCompany.investmentScore >= 85 ? 'AAA OUTSTANDING' : 'STABLE FOCUS'}
            </span>
            <span className="bg-[#121221] border border-[#2b2b45] px-2.5 py-1 rounded-md text-slate-400">
              Audit status: Secured
            </span>
          </div>
        </div>
      </div>

      {/* 2. FIVE SCOREBOARDS CARDS GRID */}
      <div className="space-y-4">
        <div>
          <span className="text-[9px] font-mono text-blue-400 uppercase font-extrabold tracking-widest">COGNITIVE METRICS BREAKDOWN</span>
          <h3 className="text-sm font-display font-bold text-white mt-0.5">Primary Five Pillar Scores</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {scoreDetails.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#0b0b13] border border-[#1e1e2d] hover:border-[#2a2a3e] rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xxs font-bold text-white font-display block">
                    {item.label}
                  </span>
                  <span className={`text-sm font-black font-mono px-2 py-0.5 rounded-md ${item.color} ${item.bg} border ${item.border}`}>
                    {item.score}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#161625] space-y-1">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-bold">PILLAR FACTOR</span>
                <span className="text-[10px] text-slate-300 font-semibold block truncate">
                  {item.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. KEY TAKEAWAYS CORE PANEL */}
      <div className="bg-[#090910] border border-[#1e1e2d] rounded-2xl p-6 shadow-md space-y-4">
        <div>
          <span className="text-[9px] font-mono text-indigo-400 uppercase font-extrabold tracking-widest block">SAAS DECISION STRATEGY</span>
          <h3 className="text-sm font-display font-bold text-white mt-0.5">Platform Research Audit Takeaways</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeCompany.keyTakeaways.map((takeaway, idx) => (
            <div key={idx} className="p-4 bg-[#0d0d16]/50 border border-[#1d1d2c] rounded-xl flex items-start space-x-3.5">
              <span className="w-5 h-5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xxs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                {takeaway}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

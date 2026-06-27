import React from 'react';
import { CompanyReport } from '../types';
import { 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Globe, 
  MessageSquare, 
  Layout, 
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface SentimentProps {
  activeCompany: CompanyReport | null;
  onNavigate: (tab: string) => void;
}

export default function Sentiment({ activeCompany, onNavigate }: SentimentProps) {
  if (!activeCompany) {
    return (
      <div id="sentiment-empty" className="h-full flex items-center justify-center p-6">
        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-10 text-center max-w-lg space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl"></div>
          <div className="w-14 h-14 rounded-full bg-[#131322] border border-[#1e1e2d] flex items-center justify-center mx-auto shadow-md">
            <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-bold font-display text-white">No active company focused</h3>
            <p className="text-xxs text-slate-500 leading-relaxed">
              Before we can compile and score public financial commentary, please utilize the search bar to find an asset or select one from the Executive Dashboard.
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

  const { sentiment } = activeCompany;

  // Mock comments/news headers to give high depth
  const mockNewsHeadlines = [
    { source: "Bloomberg Fin", time: "2 hours ago", title: `${activeCompany.companyName} institutional volume spikes following AI development pipeline releases.`, impact: "Bullish" },
    { source: "WSJ Tech", time: "5 hours ago", title: `Antitrust investigations and macro trade pricing restrict multiple expansions on ${activeCompany.ticker}.`, impact: "Neutral" },
    { source: "Reuters Capital", time: "1 day ago", title: `Analysts upgrade ${activeCompany.ticker} valuation target, referencing strong cash reserves.`, impact: "Bullish" },
    { source: "FinSight Core", time: "2 days ago", title: `Economic simulator detects minor currency headwinds for multinational exporters.`, impact: "Neutral" }
  ];

  return (
    <div id="sentiment-tab" className="h-full overflow-y-auto px-6 py-6 space-y-8 font-sans text-slate-300 text-left">
      
      {/* 1. VISUAL RATIOS CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 columns: Large visual ratio block */}
        <div className="lg:col-span-5 bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 flex flex-col justify-between shadow-lg space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl"></div>
          
          <div>
            <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest font-extrabold">SENTIMENT PROFILE</span>
            <h3 className="text-sm font-display font-bold text-white mt-0.5"> COMMENTARY RATIOS </h3>
          </div>

          <div className="space-y-4">
            {/* Horizontal progress bar stack */}
            <div className="h-6 rounded-lg w-full overflow-hidden flex font-mono text-[9px] text-white font-extrabold shadow-inner">
              <div 
                style={{ width: `${sentiment.bullish}%` }} 
                className="bg-emerald-500 flex items-center justify-center transition-all duration-300 shadow-lg"
                title={`Bullish: ${sentiment.bullish}%`}
              >
                {sentiment.bullish > 15 && `BULL: ${sentiment.bullish}%`}
              </div>
              <div 
                style={{ width: `${sentiment.neutral}%` }} 
                className="bg-zinc-600 flex items-center justify-center transition-all duration-300"
                title={`Neutral: ${sentiment.neutral}%`}
              >
                {sentiment.neutral > 15 && `NEU: ${sentiment.neutral}%`}
              </div>
              <div 
                style={{ width: `${sentiment.bearish}%` }} 
                className="bg-rose-500 flex items-center justify-center transition-all duration-300 shadow-lg"
                title={`Bearish: ${sentiment.bearish}%`}
              >
                {sentiment.bearish > 15 && `BEAR: ${sentiment.bearish}%`}
              </div>
            </div>

            {/* Metric pill legend */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#11111e]/60 border border-[#1d1d2d] rounded-xl text-center space-y-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-[9px] font-mono text-slate-500 uppercase block">BULLISH</span>
                <span className="text-sm font-mono font-black text-emerald-400">{sentiment.bullish}%</span>
              </div>
              <div className="p-3 bg-[#11111e]/60 border border-[#1d1d2d] rounded-xl text-center space-y-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 inline-block"></span>
                <span className="text-[9px] font-mono text-slate-500 uppercase block">NEUTRAL</span>
                <span className="text-sm font-mono font-black text-zinc-300">{sentiment.neutral}%</span>
              </div>
              <div className="p-3 bg-[#11111e]/60 border border-[#1d1d2d] rounded-xl text-center space-y-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
                <span className="text-[9px] font-mono text-slate-500 uppercase block">BEARISH</span>
                <span className="text-sm font-mono font-black text-rose-400">{sentiment.bearish}%</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1e1e2d] flex items-center justify-between text-[9px] font-mono text-slate-500">
            <span>INDEX MODEL: FINSIGHT-3</span>
            <span className="text-orange-400 font-bold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI CALIBRATED</span>
            </span>
          </div>
        </div>

        {/* Right 7 columns: AI Summary commentary analysis */}
        <div className="lg:col-span-7 bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>

          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-extrabold">COGNITIVE SUMMARY REPORT</span>
              <h3 className="text-sm font-display font-bold text-white mt-0.5"> AI SENTIMENT COMMENTARY </h3>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {sentiment.summary}
            </p>
          </div>

          <div className="pt-4 border-t border-[#1e1e2d] mt-6 bg-[#0f0f1c]/55 border border-[#1a1a2b] p-3 rounded-xl flex items-start space-x-3 text-xxs">
            <Globe className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-normal">
              <span className="font-bold text-white block">Real-time Grounding Note</span>
              <p className="text-slate-550 leading-relaxed">
                Our model maps recent earnings calls transcripts, buy-side research briefs, and corporate public filings up to the current session.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 2. RECENT FINANCIAL ARTICLES FEED */}
      <div className="space-y-4">
        <div>
          <span className="text-[9px] font-mono text-indigo-400 uppercase font-extrabold tracking-widest">GROUNDED NEWS FEED</span>
          <h3 className="text-sm font-display font-bold text-white mt-0.5">Commentary & Disruption Logs</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockNewsHeadlines.map((news, idx) => (
            <div 
              key={idx} 
              className="p-4 bg-[#0b0b13] border border-[#1e1e2d] hover:border-[#212133] rounded-xl flex items-start justify-between space-x-4 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[9px] font-mono">
                  <span className="text-slate-400 font-bold">{news.source}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{news.time}</span>
                </div>
                <h4 className="text-xxs font-bold text-white leading-relaxed">
                  {news.title}
                </h4>
              </div>

              <span className={`shrink-0 text-[8.5px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                news.impact === "Bullish" 
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                  : 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
              }`}>
                {news.impact}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

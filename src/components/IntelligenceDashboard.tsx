import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  TrendingUpDown,
  Flame, 
  Zap, 
  Gauge,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { MarketIndex } from '../types';

interface IntelligenceDashboardProps {
  indices: MarketIndex[];
  onRefresh: () => void;
}

export default function IntelligenceDashboard({ indices }: IntelligenceDashboardProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(indices[0]?.symbol || 'SPX');
  const selectedIndex = indices.find(ind => ind.symbol === selectedSymbol) || indices[0];

  const handleIndexSelect = (index: MarketIndex) => {
    setSelectedSymbol(index.symbol);
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'Bullish') return 'text-emerald-700 bg-emerald-50 border-emerald-200/60';
    if (sentiment === 'Bearish') return 'text-rose-700 bg-rose-50 border-rose-200/60';
    return 'text-amber-700 bg-amber-50 border-amber-200/60';
  };

  const sectorSentiments = [
    { name: 'Technology & AI', score: 85, state: 'Strong Bullish', change: '+1.4%' },
    { name: 'Healthcare & Pharma', score: 62, state: 'Mild Bullish', change: '+0.2%' },
    { name: 'Financials & Banking', score: 48, state: 'Neutral', change: '-0.1%' },
    { name: 'Energy & Industrials', score: 36, state: 'Mild Bearish', change: '-0.8%' },
    { name: 'Consumer Discretionary', score: 55, state: 'Neutral', change: '+0.4%' },
  ];

  const predictiveCatalysts = [
    {
      id: 'cat-1',
      title: 'Advanced AI Node Production Boost',
      sector: 'Technology / Semiconductors',
      sentiment: 'Highly Bullish',
      score: 92,
      impact: 'Drives NVDA, TSM, and high-performance server architecture CAPEX forward. Strong positive momentum.',
      probability: '90%'
    },
    {
      id: 'cat-2',
      title: 'Federal Reserve Rate Strategy Guidance',
      sector: 'Macroeconomic',
      sentiment: 'Neutral / Dovish',
      score: 55,
      impact: 'Yields likely stabilizing around 4.2%. Bond markets pricing in 2-3 rate cuts before year-end, positive for Software.',
      probability: '75%'
    },
    {
      id: 'cat-3',
      title: 'Global Freight Rates Volatility Surge',
      sector: 'Industrials / E-commerce',
      sentiment: 'Bearish',
      score: 28,
      impact: 'Maritime bottlenecks increase freight-per-container costs. Medium margin compression risks for low-margin retail.',
      probability: '65%'
    }
  ];

  return (
    <div className="flex flex-col space-y-6 h-full overflow-y-auto pb-12 pr-1 font-sans">
      {/* Premium Welcome & Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/10 rounded-2xl p-6 text-white relative overflow-hidden shadow-md">
        {/* Abstract background glows */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-4xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-400/20 px-2.5 py-1 rounded-lg w-max uppercase font-bold tracking-widest">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>ALLOCATOR COCKPIT ACTIVE</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight font-display text-white">
              Welcome Back, Institutional Allocator
            </h1>
            <p className="text-xxs md:text-xs text-slate-300 leading-relaxed font-sans max-w-2xl">
              Finsight AI is synchronized. Portfolio health resilience is steady at <span className="text-emerald-400 font-semibold">94%</span>. We are currently tracking <span className="text-indigo-300 font-semibold">12 live valuation anomalies</span> and monitoring <span className="text-rose-400 font-semibold">3 active geopolitical and macroeconomic risks</span>.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0 lg:min-w-[400px]">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-5xs font-mono text-indigo-200 block uppercase tracking-widest font-bold">PORTFOLIO NAV</span>
              <span className="text-sm font-bold font-display block mt-1 text-white">$576,420</span>
              <span className="text-5xs font-mono text-emerald-400 block mt-0.5 font-bold">+1.24% today</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-5xs font-mono text-indigo-200 block uppercase tracking-widest font-bold">ORACLE SESSIONS</span>
              <span className="text-sm font-bold font-display block mt-1 text-white">Secure Link</span>
              <span className="text-5xs font-mono text-indigo-300 block mt-0.5 font-bold">Ready</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl col-span-2 sm:col-span-1">
              <span className="text-5xs font-mono text-indigo-200 block uppercase tracking-widest font-bold">ESC RATINGS</span>
              <span className="text-sm font-bold font-display block mt-1 text-emerald-400">AA (High)</span>
              <span className="text-5xs font-mono text-slate-300 block mt-0.5 font-bold">Carbon Reductions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker Header / Section Title */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Market Indices Overview</h2>
        </div>
        <span className="text-5xs font-mono text-slate-400 font-bold tracking-wide">CLICK AN INDEX CARD TO UPDATE THE TREND ANALYSIS CHART</span>
      </div>

      {/* Overview Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {indices.map((ind) => {
          const isSelected = selectedIndex.symbol === ind.symbol;
          const isUp = ind.change >= 0;
          return (
            <button
              key={ind.symbol}
              onClick={() => handleIndexSelect(ind)}
              className={`p-4.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                isSelected 
                  ? 'bg-white border-indigo-500 shadow-lg shadow-indigo-100/50 ring-1 ring-indigo-500/10' 
                  : 'bg-white border-slate-200/70 hover:border-slate-300 hover:shadow-md hover:shadow-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">{ind.name}</span>
                <span className={`text-5xs font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${getSentimentColor(ind.sentiment)}`}>
                  {ind.sentiment}
                </span>
              </div>
              
              <div className="mt-3">
                <span className="text-lg font-bold text-slate-900 tracking-tight font-display">{ind.price.toLocaleString()}</span>
                <div className="flex items-center space-x-1.5 mt-0.5 text-4xs font-mono">
                  <span className={isUp ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                    {isUp ? '+' : ''}{ind.changePercent.toFixed(2)}%
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-400 font-medium">{ind.symbol}</span>
                </div>
              </div>

              {/* Mini Sparkline indicator */}
              <div className="w-full h-8 mt-4.5">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ind.chartData.slice(-10)}>
                    <defs>
                      <linearGradient id={`color-${ind.symbol}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity={0.15}/>
                        <stop offset="95%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={isUp ? '#10b981' : '#ef4444'} 
                      strokeWidth={1.5} 
                      fillOpacity={1} 
                      fill={`url(#color-${ind.symbol})`} 
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Historical Area Chart & Real-Time Sentiment Gauge */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart (2 cols) */}
        <div className="xl:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xxs font-mono text-indigo-600 uppercase font-bold tracking-wider">Trend Intelligence</span>
              <h3 className="text-sm font-display font-bold text-slate-900 mt-0.5">{selectedIndex.name} Dynamic Chart</h3>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-4xs font-mono text-slate-500">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>P/E RATIO: <strong className="text-slate-800 font-semibold">{selectedIndex.peRatio}x</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                <span>IV VOLATILITY: <strong className="text-slate-800 font-semibold">{selectedIndex.volatility}%</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>AI SENTIMENT: <strong className="text-slate-800 font-semibold">{selectedIndex.sentimentScore}%</strong></span>
              </div>
            </div>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedIndex.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="selectedAreaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                <XAxis 
                  dataKey="time" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  fontFamily="monospace"
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  fontFamily="monospace"
                  tickLine={false} 
                  domain={['auto', 'auto']}
                  tickFormatter={(val) => val.toLocaleString()}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
                  labelStyle={{ fontFamily: 'monospace', color: '#64748b', fontSize: '11px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#1e293b', fontSize: '12px', fontWeight: '500' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#selectedAreaColor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Gauge & Sector Heatmap */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xxs font-mono text-indigo-600 uppercase font-bold tracking-wider">Oracle Core Metrics</span>
                <h3 className="text-sm font-display font-bold text-slate-900 mt-0.5">Sentiment Index</h3>
              </div>
              <Gauge className="w-4.5 h-4.5 text-indigo-500" />
            </div>

            {/* Micro Gauge visualization */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden mb-5">
              <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-semibold">Live Composite Momentum</span>
              
              <div className="relative flex items-center justify-center mt-3 h-28 w-28">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    className="stroke-slate-100"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    className="stroke-indigo-600"
                    strokeWidth="7"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 46}
                    strokeDashoffset={2 * Math.PI * 46 * (1 - selectedIndex.sentimentScore / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold text-slate-900 font-display tracking-tight">{selectedIndex.sentimentScore}%</span>
                  <span className="text-5xs font-mono text-indigo-600 uppercase font-bold tracking-widest">BULLISH</span>
                </div>
              </div>

              <p className="text-4xs text-slate-400 mt-3.5 text-center max-w-xs leading-normal">
                Synthesized from institutional filings, trade transcripts, and options volatility indicators.
              </p>
            </div>
          </div>

          {/* Sector Sentiment meters */}
          <div className="space-y-3.5 pt-3">
            <div className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold">Sector Analysis</div>
            {sectorSentiments.map((sec) => (
              <div key={sec.name} className="space-y-1">
                <div className="flex items-center justify-between text-xxs">
                  <span className="text-slate-700 font-semibold text-xs">{sec.name}</span>
                  <span className="font-mono text-slate-400 text-3xs">
                    <strong className="text-slate-800">{sec.score}%</strong> ({sec.change})
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                  <div 
                    className={`h-full rounded-full ${
                      sec.score >= 70 ? 'bg-emerald-500' : sec.score >= 50 ? 'bg-indigo-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${sec.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Predictive Catalysts & Institutional Opportunities Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-500" />
              <h3 className="text-sm font-display font-bold text-slate-900">Key AI Advisory Catalysts</h3>
            </div>
            <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold">Alexandria Database</span>
          </div>

          <div className="space-y-3.5">
            {predictiveCatalysts.map((cat) => (
              <div key={cat.id} className="p-4 bg-slate-50/40 hover:bg-slate-50/70 border border-slate-100 hover:border-slate-200 rounded-xl transition-all duration-200 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-5xs font-mono bg-white px-2 py-0.5 rounded-md text-slate-500 border border-slate-200 shadow-2xs font-bold">
                      {cat.sector.toUpperCase()}
                    </span>
                    <span className={`text-5xs font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${
                      cat.score >= 70 ? 'text-emerald-700 bg-emerald-50 border-emerald-150' : cat.score >= 50 ? 'text-indigo-700 bg-indigo-50 border-indigo-150' : 'text-rose-700 bg-rose-50 border-rose-150'
                    }`}>
                      {cat.sentiment} ({cat.score})
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 leading-snug">{cat.title}</h4>
                  <p className="text-xxs text-slate-500 leading-relaxed font-sans">{cat.impact}</p>
                </div>

                <div className="flex flex-row md:flex-col items-center justify-between md:justify-center shrink-0 p-3 bg-white border border-slate-100 rounded-xl min-w-28 text-center shadow-2xs">
                  <span className="text-5xs font-mono text-slate-400 block tracking-widest font-bold">PROBABILITY</span>
                  <span className="text-md font-bold text-slate-800 font-mono mt-0.5">{cat.probability}</span>
                  <span className="text-5xs font-mono text-indigo-600 block mt-1 uppercase font-bold tracking-wider">Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Intel / Quick info tip */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50/70 border border-indigo-100/50 rounded-xl text-indigo-700 flex items-start space-x-3">
              <Info className="w-5 h-5 shrink-0 text-indigo-500" />
              <div className="text-xxs font-sans leading-relaxed text-indigo-950">
                <strong className="text-indigo-900 font-semibold block mb-0.5 text-xs font-display">Macro Sentiment Stream</strong>
                This intelligence model targets corporate transcripts, central bank statements, and global freight bottlenecks. Select indexes on the left list to dynamically update analysis vectors.
              </div>
            </div>

            <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-xl space-y-3 shadow-2xs">
              <div className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold">Composite Summary</div>
              <div className="flex items-center justify-between text-xxs">
                <span className="text-slate-500">Average Sentiment</span>
                <span className="text-emerald-700 font-bold font-mono">68.2% BULLISH</span>
              </div>
              <div className="flex items-center justify-between text-xxs">
                <span className="text-slate-500">Transcripts Monitored</span>
                <span className="text-slate-800 font-semibold font-mono">14,240</span>
              </div>
              <div className="flex items-center justify-between text-xxs">
                <span className="text-slate-500">System Confidence</span>
                <span className="text-indigo-600 font-semibold font-mono">94.8%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50/40 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl flex items-center justify-between group mt-4 transition cursor-pointer">
            <div>
              <span className="text-5xs font-mono text-slate-400 tracking-widest font-bold uppercase">Next scheduled audit</span>
              <p className="text-xxs font-mono font-bold text-slate-800 mt-0.5">In 2h 14m (UTC)</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-700 group-hover:border-slate-200 shadow-2xs transition">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

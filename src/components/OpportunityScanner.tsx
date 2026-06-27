import React, { useState, useMemo } from 'react';
import { 
  SearchCode, 
  ArrowUpRight, 
  TrendingUp, 
  Search, 
  SlidersHorizontal,
  ThumbsUp,
  Cpu,
  ChevronRight,
  Info
} from 'lucide-react';
import { OpportunityAnomaly } from '../types';

interface OpportunityScannerProps {
  opportunities: OpportunityAnomaly[];
  onAddAsset: (symbol: string, name: string, price: number, sector: string) => void;
}

export default function OpportunityScanner({ opportunities, onAddAsset }: OpportunityScannerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'valuation' | 'sentiment' | 'rsi'>('valuation');
  const [selectedSymbol, setSelectedSymbol] = useState<string>(opportunities[0]?.symbol || 'TSM');

  // Filtering & Sorting
  const processedOpportunities = useMemo(() => {
    let filtered = opportunities.filter(o => 
      o.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.sector.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'valuation') return b.valuationScore - a.valuationScore;
      if (sortBy === 'sentiment') return b.sentimentScore - a.sentimentScore;
      if (sortBy === 'rsi') return a.rsi - b.rsi; // Lower RSI (oversold) is ranked higher as opportunity
      return 0;
    });
  }, [opportunities, searchQuery, sortBy]);

  const selectedCo = useMemo(() => {
    return opportunities.find(op => op.symbol === selectedSymbol) || processedOpportunities[0] || opportunities[0];
  }, [opportunities, selectedSymbol, processedOpportunities]);

  const getRecommendationColor = (rec: string) => {
    if (rec === 'STRONG BUY') return 'text-emerald-750 bg-emerald-50 border-emerald-200/60 font-bold';
    if (rec === 'ACCUMULATE') return 'text-teal-750 bg-teal-50 border-teal-200/60 font-bold';
    return 'text-amber-750 bg-amber-50 border-amber-200/60 font-bold';
  };

  return (
    <div className="flex flex-col space-y-6 h-full overflow-y-auto pb-12 pr-1 font-sans">
      {/* Filtering Actions bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search anomalies by symbol, company, or sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-sans shadow-inner transition"
          />
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
        </div>

        {/* Sorting controls */}
        <div className="flex items-center space-x-3 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Rank By:</span>
          
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex space-x-1">
            <button
              onClick={() => setSortBy('valuation')}
              className={`px-3 py-1.5 text-4xs font-mono rounded-lg transition-all duration-200 cursor-pointer font-bold ${
                sortBy === 'valuation' ? 'bg-white text-indigo-650 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              VALUATION
            </button>
            <button
              onClick={() => setSortBy('sentiment')}
              className={`px-3 py-1.5 text-4xs font-mono rounded-lg transition-all duration-200 cursor-pointer font-bold ${
                sortBy === 'sentiment' ? 'bg-white text-indigo-650 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              SENTIMENT
            </button>
            <button
              onClick={() => setSortBy('rsi')}
              className={`px-3 py-1.5 text-4xs font-mono rounded-lg transition-all duration-200 cursor-pointer font-bold ${
                sortBy === 'rsi' ? 'bg-white text-indigo-650 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              OVERSOLD (RSI)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Listings + Catalyst Drilldown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Opportunity List (2 cols) */}
        <div className="xl:col-span-2 space-y-3">
          <span className="text-xxs font-mono text-indigo-600 uppercase font-bold tracking-wider block">Live Valuation Anomalies</span>
          
          {processedOpportunities.length === 0 ? (
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl text-center shadow-xs">
              <p className="text-xs text-slate-400">No anomalies found matching search constraints.</p>
            </div>
          ) : (
            processedOpportunities.map((op) => {
              const isSelected = selectedCo?.symbol === op.symbol;
              return (
                <div
                  key={op.symbol}
                  onClick={() => setSelectedSymbol(op.symbol)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-3xs ${
                    isSelected 
                      ? 'bg-white border-indigo-400 shadow-md shadow-indigo-100/50 ring-1 ring-indigo-500/10' 
                      : 'bg-white border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/20'
                  }`}
                >
                  {/* Left info */}
                  <div className="flex items-center space-x-3.5 w-60 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center font-bold text-slate-800 text-xs font-mono shadow-2xs">
                      {op.symbol}
                    </div>
                    <div className="truncate text-left">
                      <h4 className="text-xs font-bold text-slate-850 truncate leading-snug">{op.name}</h4>
                      <span className="text-5xs font-mono text-slate-400 uppercase font-bold tracking-wider mt-0.5 block">{op.sector}</span>
                    </div>
                  </div>

                  {/* Quantitative metrics */}
                  <div className="grid grid-cols-4 gap-4 flex-1 w-full">
                    <div className="text-left">
                      <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">PRICE</span>
                      <span className="text-xs font-bold font-mono text-slate-800 block mt-0.5">${op.price.toFixed(2)}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">VAL. SCORE</span>
                      <span className="text-xs font-bold font-mono text-indigo-600 block mt-0.5">{op.valuationScore}/100</span>
                    </div>
                    <div className="text-left">
                      <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">AI SENTIMENT</span>
                      <span className="text-xs font-bold font-mono text-emerald-600 block mt-0.5">{op.sentimentScore}/100</span>
                    </div>
                    <div className="text-left">
                      <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">RSI RANGE</span>
                      <span className={`text-xs font-bold font-mono block mt-0.5 ${op.rsi <= 40 ? 'text-emerald-600 font-bold' : 'text-slate-550'}`}>
                        {op.rsi}
                      </span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center space-x-3 self-stretch md:self-auto justify-between shrink-0 pl-1 md:pl-0 border-t border-slate-50 md:border-t-0 pt-2.5 md:pt-0">
                    <span className={`text-5xs font-mono font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider ${getRecommendationColor(op.recommendation)}`}>
                      {op.recommendation}
                    </span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition ${isSelected ? 'text-indigo-600' : ''}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Catalyst Briefing (1 col) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          {selectedCo ? (
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xxs font-mono text-indigo-600 uppercase font-bold tracking-wider">Anomaly briefing</span>
                  <h3 className="text-sm font-display font-bold text-slate-900 mt-0.5">{selectedCo.symbol} Catalyst Analysis</h3>
                </div>
                <ArrowUpRight className="w-4.5 h-4.5 text-indigo-600 animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-between shadow-3xs">
                  <div className="text-left">
                    <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">PE MULTIPLE</span>
                    <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">{selectedCo.peRatio}x</span>
                  </div>
                  <div className="text-right">
                    <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">PEER DISCOUNT</span>
                    <span className="text-xs font-bold text-emerald-650 font-mono mt-0.5 block">~18.5% Below Peers</span>
                  </div>
                </div>

                {/* Core Catalyst text */}
                <div className="space-y-2">
                  <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">Primary Catalyst Vector</span>
                  <p className="text-xxs text-slate-600 leading-relaxed font-sans bg-slate-50/50 p-3.5 rounded-xl border border-slate-150 text-left">
                    {selectedCo.catalyst}
                  </p>
                </div>

                {/* Action plan summary */}
                <div className="p-4 bg-indigo-50/60 border border-indigo-100/50 text-indigo-950 rounded-xl flex items-start space-x-3">
                  <ThumbsUp className="w-4.5 h-4.5 shrink-0 text-indigo-500 mt-0.5" />
                  <div className="text-xxs font-sans leading-relaxed text-indigo-900 text-left">
                    <strong className="text-indigo-950 block mb-0.5 text-xs font-display">Advisor Momentum Signal</strong>
                    This ticker displays standard value-growth divergence (high institutional sentiment coupled with a highly oversold RSI). Accumulation is highly optimal inside this technical range.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Info className="w-8 h-8 text-slate-300 mb-2" />
              <span className="text-xs text-slate-400 font-sans">Select an anomaly to view the detailed briefing.</span>
            </div>
          )}

          {selectedCo && (
            <div className="mt-5 space-y-3">
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2.5 shadow-3xs text-left">
                <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">Signal Confidence Matrix</span>
                <div className="flex items-center justify-between text-xxs font-mono">
                  <span className="text-slate-500">Advisory Confidence</span>
                  <span className="text-emerald-700 font-bold">89.2% (Strong)</span>
                </div>
                <div className="flex items-center justify-between text-xxs font-mono">
                  <span className="text-slate-500">Valuation Percentile</span>
                  <span className="text-slate-800 font-semibold">12th Percentile</span>
                </div>
              </div>

              <button
                onClick={() => onAddAsset(selectedCo.symbol, selectedCo.name, selectedCo.price, selectedCo.sector)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xxs font-mono font-bold tracking-wider uppercase transition shadow-sm cursor-pointer hover:shadow-indigo-100 flex items-center justify-center space-x-2"
              >
                <Cpu className="w-4 h-4 text-indigo-200" />
                <span>Simulate & Add to Portfolio</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

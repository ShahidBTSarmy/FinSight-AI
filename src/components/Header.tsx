import React, { useState } from 'react';
import { Search, Bell, TrendingUp, TrendingDown, RefreshCw, AlertTriangle, Sparkles } from 'lucide-react';
import { MarketIndex } from '../types';

interface HeaderProps {
  indices: MarketIndex[];
  onRefresh: () => void;
  isRefreshing: boolean;
  onSearch: (query: string) => void;
  activeTab: string;
  unreadAlertsCount: number;
  onTriggerMockAlert: () => void;
  onViewRisks: () => void;
}

export default function Header({ 
  indices, 
  onRefresh, 
  isRefreshing, 
  onSearch, 
  activeTab, 
  unreadAlertsCount,
  onTriggerMockAlert,
  onViewRisks
}: HeaderProps) {
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'home': return 'Command Center Home';
      case 'markets': return 'Market Intelligence';
      case 'portfolio': return 'Portfolio Stress-Tester';
      case 'oracle': return 'Interactive Oracle Research';
      case 'esg': return 'Alexandria ESG Center';
      case 'opportunities': return 'Opportunity Anomalies Scanner';
      case 'risks': return 'Critical Risk Radar';
      default: return 'FinSight AI';
    }
  };

  return (
    <header id="app-header" className="bg-white border-b border-slate-200/65 flex flex-col w-full z-10 shrink-0 font-sans">
      {/* Top Ticker Tape */}
      <div className="bg-slate-50/70 border-b border-slate-150/60 py-2 px-6 flex items-center overflow-x-auto scrollbar-none whitespace-nowrap space-x-5 text-[10px] font-mono">
        <div className="flex items-center space-x-2 text-slate-400 font-bold tracking-widest uppercase pr-4 border-r border-slate-200 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>LIVE MARGIN STREAM</span>
        </div>
        
        {indices.map((ind) => {
          const isUp = ind.change >= 0;
          return (
            <div key={ind.symbol} className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border border-slate-200/60 shadow-3xs hover:border-slate-350 transition-colors shrink-0">
              <span className="text-slate-950 font-bold">{ind.symbol}</span>
              <span className="text-slate-600 font-medium">{ind.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className={`flex items-center space-x-0.5 ${isUp ? 'text-emerald-600' : 'text-rose-600'} font-bold`}>
                {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{isUp ? '+' : ''}{ind.changePercent.toFixed(2)}%</span>
              </span>
            </div>
          );
        })}

        {/* Dynamic global metrics */}
        <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border border-slate-200/60 shadow-3xs shrink-0">
          <span className="text-slate-450 font-bold">US 10Y BOND:</span>
          <span className="text-slate-950 font-bold">4.24%</span>
          <span className="text-rose-600 font-bold">-0.05%</span>
        </div>
        <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border border-slate-200/60 shadow-3xs shrink-0">
          <span className="text-slate-450 font-bold">GOLD:</span>
          <span className="text-slate-950 font-bold">$2,341.20</span>
          <span className="text-emerald-600 font-bold">+0.66%</span>
        </div>
        <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border border-slate-200/60 shadow-3xs shrink-0">
          <span className="text-slate-450 font-bold">VIX SPOT:</span>
          <span className="text-slate-950 font-bold">13.20</span>
          <span className="text-emerald-600 font-bold">-2.40%</span>
        </div>
      </div>

      {/* Main Header bar */}
      <div className="px-6 py-4.5 flex items-center justify-between bg-white">
        {/* Left: Tab Title & Status */}
        <div className="flex items-center space-x-4">
          <div className="text-left">
            <h2 className="text-xl font-display font-extrabold text-slate-950 tracking-tight leading-tight">{getTabTitle()}</h2>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1 font-bold">FinSight Portfolio Core &bull; Secured Client Session</p>
          </div>
        </div>

        {/* Right: Search, Refresh, Alerts, System Profile */}
        <div className="flex items-center space-x-4">
          {/* Quick search input */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search assets or scan catalysts..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-72 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-sans transition-all"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </form>

          {/* Refresh Action */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2.5 text-slate-500 hover:text-slate-950 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-3xs transition-all cursor-pointer"
            title="Force Synchronize Feed"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
          </button>

          {/* Trigger Mock Alert Button (Dev Simulator) */}
          <button
            onClick={onTriggerMockAlert}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white border border-slate-800 hover:border-slate-700 text-[10px] font-mono font-bold tracking-wider rounded-xl shadow-2xs transition-all cursor-pointer"
            title="Trigger Simulated High-Priority Alert"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>TRIGGER RISK FEED</span>
          </button>

          {/* Quick risk alert badge */}
          <div className="relative">
            <button 
              onClick={onViewRisks}
              className={`p-2.5 rounded-xl border shadow-3xs transition-all cursor-pointer relative ${
                unreadAlertsCount > 0 
                  ? 'text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-350' 
                  : 'text-slate-500 bg-white hover:bg-slate-50 border-slate-200'
              }`}
              title={`${unreadAlertsCount} Unread Critical Risk Alerts`}
            >
              <AlertTriangle className={`w-4 h-4 ${unreadAlertsCount > 0 ? 'animate-pulse' : ''}`} />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-rose-600 text-white text-[9px] font-mono font-bold rounded-full border-2 border-white leading-none min-w-[18px] text-center shadow-sm">
                  {unreadAlertsCount}
                </span>
              )}
            </button>
          </div>

          {/* User status */}
          <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-indigo-55 bg-indigo-50 border border-indigo-100 flex items-center justify-center font-extrabold text-indigo-600 text-xs shadow-3xs">
              IA
            </div>
            <div className="hidden lg:block text-left leading-none">
              <p className="text-xs font-bold text-slate-950 font-display">Institutional Allocator</p>
              <p className="text-[9px] font-mono text-slate-450 mt-1 uppercase font-bold tracking-wider">ID: IA-08-QE</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

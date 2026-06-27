import React from 'react';
import { CompanyReport } from '../types';
import { 
  FolderHeart, 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  ShieldAlert, 
  HelpCircle,
  Cpu
} from 'lucide-react';

interface ReportsProps {
  savedReports: CompanyReport[];
  onSelectReport: (report: CompanyReport) => void;
  activeCompany: CompanyReport | null;
}

export default function Reports({ savedReports, onSelectReport, activeCompany }: ReportsProps) {
  return (
    <div id="reports-tab" className="h-full overflow-y-auto px-6 py-6 space-y-8 font-sans text-slate-300 text-left">
      
      <div className="flex items-center space-x-3.5 border-b border-[#1e1e2d] pb-4">
        <div className="p-2.5 bg-gradient-to-tr from-rose-500 to-pink-600 text-white rounded-xl shadow-md glow-purple">
          <FolderHeart className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[9.5px] font-mono text-pink-400 uppercase tracking-widest font-extrabold block">RESEARCH ARCHIVE</span>
          <h2 className="text-base md:text-lg font-display font-black text-white">Investment Intelligence Archive</h2>
        </div>
      </div>

      {savedReports.length === 0 ? (
        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-10 text-center max-w-md mx-auto space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#131322] border border-[#1e1e2d] flex items-center justify-center mx-auto shadow-md">
            <FileText className="w-5.5 h-5.5 text-pink-400 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold font-display text-white">No compiled dossiers yet</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              When you enter a company name in the search bar or pick a trending option from the Dashboard, the AI automatically stores its finalized profile report in your local secure browser cache.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedReports.map((rep) => {
            const isActive = activeCompany?.ticker === rep.ticker;
            return (
              <div 
                key={rep.ticker} 
                onClick={() => onSelectReport(rep)}
                className={`p-5 bg-[#0b0b13] border ${
                  isActive ? 'border-pink-500 bg-[#12111d]' : 'border-[#1e1e2d] hover:border-[#2b2b45]'
                } rounded-2xl flex flex-col justify-between space-y-4 transition-all duration-150 cursor-pointer text-left shadow-md group relative overflow-hidden`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 bg-pink-500 text-white text-[8px] font-mono font-bold tracking-widest px-3 py-0.5 rounded-bl uppercase">
                    ACTIVE FOCUS
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black font-display text-white">{rep.companyName}</span>
                    <span className="text-[9.5px] font-mono font-extrabold text-pink-400 bg-pink-500/10 border border-pink-400/20 px-1.5 py-0.2 rounded uppercase">
                      {rep.ticker}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-450 leading-relaxed line-clamp-2">
                    {rep.summary}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#1b1b2c] flex items-center justify-between text-xxs font-mono">
                  <div className="flex items-center space-x-1">
                    <span className="text-slate-500">INVEST SCORE:</span>
                    <span className="text-emerald-400 font-extrabold font-mono">{rep.investmentScore}/100</span>
                  </div>
                  <span className="text-pink-400 hover:text-pink-300 font-bold flex items-center space-x-1">
                    <span>Activate Focus</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

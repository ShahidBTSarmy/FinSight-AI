import React, { useState } from 'react';
import { CompanyReport } from '../types';
import { 
  Compass, 
  HelpCircle, 
  Layout, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  Award,
  ArrowLeftRight
} from 'lucide-react';

interface CompetitorsProps {
  activeCompany: CompanyReport | null;
  onNavigate: (tab: string) => void;
}

export default function Competitors({ activeCompany, onNavigate }: CompetitorsProps) {
  const [selectedCompIdx, setSelectedCompIdx] = useState(0);

  if (!activeCompany) {
    return (
      <div id="competitors-empty" className="h-full flex items-center justify-center p-6">
        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-10 text-center max-w-lg space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"></div>
          <div className="w-14 h-14 rounded-full bg-[#131322] border border-[#1e1e2d] flex items-center justify-center mx-auto shadow-md">
            <Compass className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-bold font-display text-white">No active company focused</h3>
            <p className="text-xxs text-slate-500 leading-relaxed">
              Before we can deploy our side-by-side competitive comparison matrix, please select a company to focus on from the Dashboard or search above.
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

  const comps = activeCompany.competitors || [];
  const activeCompetitor = comps[selectedCompIdx] || null;

  return (
    <div id="competitors-tab" className="h-full overflow-y-auto px-6 py-6 space-y-8 font-sans text-slate-300 text-left">
      
      {/* 1. SELECTION CONTROLLERS BAR */}
      <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-3.5">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
            <Compass className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-extrabold">COMPETITIVE MATRIX ENGINE</span>
            <h3 className="text-xs font-bold text-white block">Compare {activeCompany.companyName} vs Market Rivals</h3>
          </div>
        </div>

        {/* Competitor list tabs */}
        <div className="flex items-center bg-[#050508] p-1.5 rounded-xl border border-[#1a1a2b] space-x-1.5 shrink-0">
          {comps.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCompIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xxs font-mono font-bold tracking-wider uppercase transition cursor-pointer ${
                selectedCompIdx === idx 
                  ? 'bg-cyan-600 text-white' 
                  : 'text-slate-500 hover:text-slate-350 hover:bg-[#0d0d16]'
              }`}
            >
              {c.name.split(' (')[0] || c.name}
            </button>
          ))}
        </div>
      </div>

      {activeCompetitor ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Side-by-side Matrix comparisons */}
          <div className="lg:col-span-8 bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#1e1e2d] pb-3.5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-extrabold block">TACTICAL COLUMN COMPARISON</span>
              <div className="flex items-center space-x-1.5 text-xxs text-slate-500 font-mono">
                <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
                <span>Side-By-Side Variables</span>
              </div>
            </div>

            {/* Matrix comparison table */}
            <div className="space-y-4">
              {/* Row 1: Revenue comparison */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 bg-[#0f0f1c]/40 border border-[#1a1a2c] rounded-xl items-center">
                <div className="md:col-span-3 text-left">
                  <span className="text-[10px] font-mono text-slate-400 font-black uppercase block">REVENUE COMP</span>
                  <span className="text-[10px] text-slate-600 leading-normal">Total annual yield</span>
                </div>
                <div className="md:col-span-4 p-3.5 bg-[#07070b] border border-[#141420] rounded-xl text-center">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase font-extrabold">{activeCompany.companyName}</span>
                  <span className="text-xs font-black text-white block mt-1">{activeCompany.financials?.revenue}</span>
                </div>
                <div className="md:col-span-1 text-center font-mono text-slate-650 text-[10px] font-black">VS</div>
                <div className="md:col-span-4 p-3.5 bg-[#0d0d18] border border-cyan-500/10 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-cyan-400 block uppercase font-extrabold">{activeCompetitor.name}</span>
                  <span className="text-xs font-black text-white block mt-1">{activeCompetitor.revenue}</span>
                </div>
              </div>

              {/* Row 2: Profitability comparison */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 bg-[#0f0f1c]/40 border border-[#1a1a2c] rounded-xl items-center">
                <div className="md:col-span-3 text-left">
                  <span className="text-[10px] font-mono text-slate-400 font-black uppercase block">OPERATING MARGIN</span>
                  <span className="text-[10px] text-slate-600 leading-normal">Operational yield index</span>
                </div>
                <div className="md:col-span-4 p-3.5 bg-[#07070b] border border-[#141420] rounded-xl text-center">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase font-extrabold">{activeCompany.companyName}</span>
                  <span className="text-xs font-black text-emerald-400 block mt-1">{activeCompany.financials?.profitability.split(',')[0]}</span>
                </div>
                <div className="md:col-span-1 text-center font-mono text-slate-650 text-[10px] font-black">VS</div>
                <div className="md:col-span-4 p-3.5 bg-[#0d0d18] border border-cyan-500/10 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-cyan-400 block uppercase font-extrabold">{activeCompetitor.name}</span>
                  <span className="text-xs font-black text-emerald-400 block mt-1">{activeCompetitor.profitability}</span>
                </div>
              </div>

              {/* Row 3: Growth comparison */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 bg-[#0f0f1c]/40 border border-[#1a1a2c] rounded-xl items-center">
                <div className="md:col-span-3 text-left">
                  <span className="text-[10px] font-mono text-slate-400 font-black uppercase block">GROWTH MOMENTUM</span>
                  <span className="text-[10px] text-slate-600 leading-normal">Year over Year growth index</span>
                </div>
                <div className="md:col-span-4 p-3.5 bg-[#07070b] border border-[#141420] rounded-xl text-center">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase font-extrabold">{activeCompany.companyName}</span>
                  <span className="text-xs font-black text-white block mt-1">{activeCompany.scores.growth}/100 Score</span>
                </div>
                <div className="md:col-span-1 text-center font-mono text-slate-650 text-[10px] font-black">VS</div>
                <div className="md:col-span-4 p-3.5 bg-[#0d0d18] border border-cyan-500/10 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-cyan-400 block uppercase font-extrabold">{activeCompetitor.name}</span>
                  <span className="text-xs font-black text-white block mt-1">{activeCompetitor.growth}</span>
                </div>
              </div>

              {/* Row 4: Risk comparison */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 bg-[#0f0f1c]/40 border border-[#1a1a2c] rounded-xl items-center">
                <div className="md:col-span-3 text-left">
                  <span className="text-[10px] font-mono text-slate-400 font-black uppercase block">STRUCTURAL RISK</span>
                  <span className="text-[10px] text-slate-600 leading-normal">Risk factor audit matrix</span>
                </div>
                <div className="md:col-span-4 p-3.5 bg-[#07070b] border border-[#141420] rounded-xl text-center">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase font-extrabold">{activeCompany.companyName}</span>
                  <span className="text-xs font-black text-white block mt-1">{activeCompany.scores.risk}/100 Risk Score</span>
                </div>
                <div className="md:col-span-1 text-center font-mono text-slate-650 text-[10px] font-black">VS</div>
                <div className="md:col-span-4 p-3.5 bg-[#0d0d18] border border-cyan-500/10 rounded-xl text-center">
                  <span className="text-[9px] font-mono text-cyan-400 block uppercase font-extrabold">{activeCompetitor.name}</span>
                  <span className="text-xs font-black text-rose-400 block mt-1 truncate max-w-[200px]" title={activeCompetitor.risk}>
                    {activeCompetitor.risk}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Competitive Advantages of Competitor */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 shadow-md text-left space-y-4">
              <div>
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-extrabold">TACTICAL ADVANTAGES</span>
                <h3 className="text-xs font-bold text-white block">Competitor Moats</h3>
              </div>

              <p className="text-[10.5px] text-slate-500 leading-relaxed">
                Our model identifies key operational and intellectual advantages that make {activeCompetitor.name} a formidable market participant:
              </p>

              <div className="space-y-2.5 pt-2">
                {activeCompetitor.advantages && activeCompetitor.advantages.map((adv: string, idx: number) => (
                  <div key={idx} className="p-3 bg-[#0d0d16] border border-[#1e1e2d] rounded-xl flex items-start space-x-2.5">
                    <Award className="w-4.5 h-4.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xxs text-slate-350 leading-relaxed font-semibold">
                      {adv}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Strategic Guidance info box */}
            <div className="p-5.5 bg-gradient-to-br from-[#0c0c16] to-[#050508] border border-[#1e1e2d] rounded-2xl text-left space-y-3 shadow-inner">
              <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold block">TACTICAL THESIS SUMMARY</span>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                When comparing {activeCompany.companyName} with {activeCompetitor.name.split(' (')[0]}, allocators should pay close attention to whether {activeCompany.companyName} has superior pricing margins ({activeCompany.financials?.profitability.split(',')[0]}) to offset higher multiple valuations.
              </p>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 text-center text-slate-550 text-xxs font-mono font-bold uppercase">
          Competitor details unavailable.
        </div>
      )}

    </div>
  );
}

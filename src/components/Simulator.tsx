import React, { useState } from 'react';
import { CompanyReport } from '../types';
import { 
  Sliders, 
  HelpCircle, 
  Layout, 
  TrendingUp, 
  TrendingDown, 
  Info,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

interface SimulatorProps {
  activeCompany: CompanyReport | null;
  onNavigate: (tab: string) => void;
}

export default function Simulator({ activeCompany, onNavigate }: SimulatorProps) {
  // Simulator inputs (represented as multiplier deltas)
  const [inflation, setInflation] = useState(0); // scale -5 to +5 %
  const [interestRate, setInterestRate] = useState(0); // scale -5 to +5 %
  const [currency, setCurrency] = useState(0); // scale -10 to +10 %
  const [oil, setOil] = useState(0); // scale -50 to +50 %
  const [gdp, setGdp] = useState(0); // scale -3 to +3 %

  if (!activeCompany) {
    return (
      <div id="simulator-empty" className="h-full flex items-center justify-center p-6">
        <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-10 text-center max-w-lg space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
          <div className="w-14 h-14 rounded-full bg-[#131322] border border-[#1e1e2d] flex items-center justify-center mx-auto shadow-md">
            <Sliders className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-bold font-display text-white">No active company focused</h3>
            <p className="text-xxs text-slate-500 leading-relaxed">
              Before we can stress-test balance sheets and project macroeconomic margin deltas, please select a company to focus on from the Dashboard or search above.
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

  const baseImpact = activeCompany.economicImpact;
  const baseExplanations = activeCompany.economicImpactExplanations || {
    inflation: "Sensitive to raw material inflation pressures.",
    interestRate: "Reflects variable capital financing requirements.",
    currency: "Impacted by transnational exchange translation.",
    oil: "Correlates directly with logistics and overhead indices.",
    gdp: "Tied directly to macro aggregate spending triggers."
  };

  // Real-time calculation based on multiplier factors
  // baseline variables are mapped to:
  // baseImpact.inflation refers to impact of +2% inflation (so divide by 2 to get per 1% impact)
  // baseImpact.interestRate refers to impact of +1.5% interest rate hike (divide by 1.5)
  // baseImpact.currency refers to impact of +5% currency strengthening (divide by 5)
  // baseImpact.oil refers to impact of +20% oil shift (divide by 20)
  // baseImpact.gdp refers to impact of +1% GDP expansion (divide by 1)
  
  const calculatedInflationDelta = (inflation * (baseImpact.inflation / 2));
  const calculatedRateDelta = (interestRate * (baseImpact.interestRate / 1.5));
  const calculatedCurrencyDelta = (currency * (baseImpact.currency / 5));
  const calculatedOilDelta = (oil * (baseImpact.oil / 20));
  const calculatedGdpDelta = (gdp * (baseImpact.gdp / 1));

  const totalProjectedImpact = parseFloat((
    calculatedInflationDelta + 
    calculatedRateDelta + 
    calculatedCurrencyDelta + 
    calculatedOilDelta + 
    calculatedGdpDelta
  ).toFixed(2));

  const isPositive = totalProjectedImpact >= 0;

  return (
    <div id="simulator-tab" className="h-full overflow-y-auto px-6 py-6 space-y-8 font-sans text-slate-300 text-left">
      
      {/* 1. INTERACTIVE REAL-TIME METRIC GAUGE CARD */}
      <div className="bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        <div className="space-y-4 max-w-xl">
          <div>
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-extrabold block">ECONOMETRIC STRESS TESTER</span>
            <h2 className="text-base md:text-lg font-display font-black text-white mt-1">
              Macro Simulation for {activeCompany.companyName} ({activeCompany.ticker})
            </h2>
          </div>
          <p className="text-xs text-slate-450 leading-relaxed font-sans">
            Slide the macroeconomic levers below to simulate inflation, rate hikes, energy price shocks, and GDP recessions. The platform calculates the estimated compound strategic impact on corporate profit margins in real-time.
          </p>
          <div className="p-3 bg-[#0f0f1c]/50 border border-[#1d1d2c] rounded-xl flex items-start space-x-2 text-xxs">
            <Info className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-slate-400 leading-normal">
              Sensitivity profiles are calibrated server-side by the Gemini research agent using historical margin covariance logs.
            </p>
          </div>
        </div>

        {/* Calculated Margin Output Gauge */}
        <div className="relative shrink-0 flex items-center justify-center w-48 h-48 rounded-2xl border border-[#1e1e35] bg-[#0d0d16] shadow-2xl p-6 text-center">
          <div className={`absolute -inset-0.5 rounded-2xl blur opacity-25 ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
          <div className="relative z-10 space-y-2">
            <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block font-bold">ESTIMATED MARGIN SHIFT</span>
            <span className={`text-4xl font-black font-mono block leading-none tracking-tight ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? '+' : ''}{totalProjectedImpact}%
            </span>
            <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded-md inline-block border ${
              isPositive 
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
            }`}>
              {isPositive ? 'EXPANDING MARGINS' : 'MARGIN CONTRATION'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. FIVE ADJUSTABLE SLIDERS & EXPLANATIONS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sliders list: Left 7 columns */}
        <div className="lg:col-span-7 bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 shadow-md space-y-6">
          <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-extrabold block">STRESS CONFIGURATION LEVERS</span>
          
          <div className="space-y-6 pt-1">
            {/* Slider 1: Inflation */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xxs font-bold text-white font-display">Inflation Shift Ratio</span>
                <span className="text-xs font-mono font-bold text-slate-400">{inflation > 0 ? '+' : ''}{inflation}%</span>
              </div>
              <input 
                type="range" 
                min="-5" 
                max="5" 
                step="0.5"
                value={inflation}
                onChange={(e) => setInflation(parseFloat(e.target.value))}
                className="w-full accent-blue-500 bg-[#161625] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block leading-normal">{baseExplanations.inflation}</span>
            </div>

            {/* Slider 2: Interest Rates */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xxs font-bold text-white font-display">Interest Rate Hike (bps)</span>
                <span className="text-xs font-mono font-bold text-slate-400">{interestRate > 0 ? '+' : ''}{(interestRate * 100).toFixed(0)} bps</span>
              </div>
              <input 
                type="range" 
                min="-3" 
                max="3" 
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-[#161625] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block leading-normal">{baseExplanations.interestRate}</span>
            </div>

            {/* Slider 3: Currency Strength */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xxs font-bold text-white font-display">FX Trade Weight (USD/Basket)</span>
                <span className="text-xs font-mono font-bold text-slate-400">{currency > 0 ? '+' : ''}{currency}%</span>
              </div>
              <input 
                type="range" 
                min="-10" 
                max="10" 
                step="1"
                value={currency}
                onChange={(e) => setCurrency(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-[#161625] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block leading-normal">{baseExplanations.currency}</span>
            </div>

            {/* Slider 4: Oil Price Shift */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xxs font-bold text-white font-display">Energy / Crude Index Shift</span>
                <span className="text-xs font-mono font-bold text-slate-400">{oil > 0 ? '+' : ''}{oil}%</span>
              </div>
              <input 
                type="range" 
                min="-50" 
                max="50" 
                step="5"
                value={oil}
                onChange={(e) => setOil(parseFloat(e.target.value))}
                className="w-full accent-rose-500 bg-[#161625] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block leading-normal">{baseExplanations.oil}</span>
            </div>

            {/* Slider 5: GDP Growth rate */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xxs font-bold text-white font-display">Aggregate GDP Trend</span>
                <span className="text-xs font-mono font-bold text-slate-400">{gdp > 0 ? '+' : ''}{gdp}%</span>
              </div>
              <input 
                type="range" 
                min="-3" 
                max="3" 
                step="0.5"
                value={gdp}
                onChange={(e) => setGdp(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-[#161625] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block leading-normal">{baseExplanations.gdp}</span>
            </div>
          </div>
        </div>

        {/* Sensitivity Reference: Right 5 columns */}
        <div className="lg:col-span-5 bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 shadow-md text-left space-y-4">
          <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold block">BASELINE PROFILE</span>
          <h3 className="text-xs font-display font-bold text-white block">Underwriting Elasticity Constants</h3>
          <p className="text-[10.5px] text-slate-500 leading-relaxed">
            The base calculation models how {activeCompany.companyName} margins react to baseline macro impulses:
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 bg-[#0d0d16] border border-[#1d1d2d] rounded-xl text-xxs">
              <span className="text-slate-400 font-mono font-semibold">Inflation (+2% base)</span>
              <span className={`font-mono font-extrabold ${baseImpact.inflation >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {baseImpact.inflation >= 0 ? '+' : ''}{baseImpact.inflation}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0d0d16] border border-[#1d1d2d] rounded-xl text-xxs">
              <span className="text-slate-400 font-mono font-semibold">Interest Rate Hike (+1.5% base)</span>
              <span className={`font-mono font-extrabold ${baseImpact.interestRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {baseImpact.interestRate >= 0 ? '+' : ''}{baseImpact.interestRate}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0d0d16] border border-[#1d1d2d] rounded-xl text-xxs">
              <span className="text-slate-400 font-mono font-semibold">FX Strengthening (+5% base)</span>
              <span className={`font-mono font-extrabold ${baseImpact.currency >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {baseImpact.currency >= 0 ? '+' : ''}{baseImpact.currency}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0d0d16] border border-[#1d1d2d] rounded-xl text-xxs">
              <span className="text-slate-400 font-mono font-semibold">Oil Price Rise (+20% base)</span>
              <span className={`font-mono font-extrabold ${baseImpact.oil >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {baseImpact.oil >= 0 ? '+' : ''}{baseImpact.oil}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0d0d16] border border-[#1d1d2d] rounded-xl text-xxs">
              <span className="text-slate-400 font-mono font-semibold">GDP Growth (+1% base)</span>
              <span className={`font-mono font-extrabold ${baseImpact.gdp >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {baseImpact.gdp >= 0 ? '+' : ''}{baseImpact.gdp}%
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

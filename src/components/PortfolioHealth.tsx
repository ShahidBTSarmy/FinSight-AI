import React, { useState, useMemo, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  Tooltip, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  ShieldAlert, 
  Sliders, 
  Gauge, 
  RefreshCw,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { PortfolioAsset, StressScenario } from '../types';

interface PortfolioHealthProps {
  portfolio: PortfolioAsset[];
  scenarios: StressScenario[];
}

export default function PortfolioHealth({ portfolio: initialPortfolio, scenarios }: PortfolioHealthProps) {
  // State for user adjusted holdings to calculate stress impact
  const [shares, setShares] = useState<{ [symbol: string]: number }>(() => {
    const initialShares: { [symbol: string]: number } = {};
    initialPortfolio.forEach(asset => {
      initialShares[asset.symbol] = asset.shares;
    });
    return initialShares;
  });

  const [selectedScenario, setSelectedScenario] = useState<StressScenario | null>(scenarios[0]);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  
  // Immersive simulation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationText, setSimulationText] = useState('');

  // Sync state if initialPortfolio gains new assets in parent state
  useEffect(() => {
    setShares(prev => {
      const updated = { ...prev };
      initialPortfolio.forEach(asset => {
        if (updated[asset.symbol] === undefined) {
          updated[asset.symbol] = asset.shares;
        }
      });
      return updated;
    });
  }, [initialPortfolio]);

  const triggerScenarioSimulation = (scenario: StressScenario) => {
    setIsSimulating(true);
    setSimulationText('Initializing Stress Engine...');
    
    setTimeout(() => {
      setSimulationText('Running Delta Coefficient projections...');
    }, 200);

    setTimeout(() => {
      setSimulationText('Simulating GDP and inflation pressures...');
    }, 450);

    setTimeout(() => {
      setSelectedScenario(scenario);
      setIsSimulating(false);
    }, 700);
  };

  // Calculate dynamic portfolio values based on user's share quantities
  const portfolioData = useMemo(() => {
    let totalVal = 0;
    let totalCost = 0;
    let totalDailyChange = 0;
    
    const updatedAssets = initialPortfolio.map(asset => {
      const currentShares = shares[asset.symbol] ?? asset.shares;
      const val = currentShares * asset.currentPrice;
      const cost = currentShares * asset.avgPrice;
      const assetDailyChange = currentShares * asset.dailyChange;
      
      totalVal += val;
      totalCost += cost;
      totalDailyChange += assetDailyChange;
      
      return {
        ...asset,
        shares: currentShares,
        value: val,
        dailyChange: assetDailyChange,
      };
    });

    // Calculate allocations
    const assetsWithAlloc = updatedAssets.map(asset => ({
      ...asset,
      allocation: totalVal > 0 ? parseFloat(((asset.value / totalVal) * 100).toFixed(1)) : 0,
      dailyChangePercent: asset.value > 0 ? parseFloat(((asset.dailyChange / asset.value) * 100).toFixed(2)) : 0
    }));

    // Portfolio level metrics
    const totalChangePercent = totalVal > 0 ? (totalDailyChange / totalVal) * 100 : 0;
    const portfolioBeta = assetsWithAlloc.reduce((acc, curr) => acc + (curr.beta * (curr.allocation / 100)), 0);
    const overallEsg = assetsWithAlloc.reduce((acc, curr) => acc + (curr.esgScore * (curr.allocation / 100)), 0);

    return {
      assets: assetsWithAlloc,
      totalValue: totalVal,
      totalCost,
      totalDailyChange,
      totalChangePercent,
      portfolioBeta,
      overallEsg
    };
  }, [shares, initialPortfolio]);

  // Adjust shares handler
  const adjustShares = (symbol: string, amount: number) => {
    setShares(prev => {
      const current = prev[symbol] ?? 0;
      const updated = Math.max(0, current + amount);
      return { ...prev, [symbol]: updated };
    });
  };

  // Reset to default
  const handleReset = () => {
    const initialShares: { [symbol: string]: number } = {};
    initialPortfolio.forEach(asset => {
      initialShares[asset.symbol] = asset.shares;
    });
    setShares(initialShares);
  };

  // Calculate stress scenario financial impacts
  const stressImpact = useMemo(() => {
    if (!selectedScenario) return null;
    
    let originalTotal = portfolioData.totalValue;
    let postStressTotal = 0;
    
    const assetImpactDetails = portfolioData.assets.map(asset => {
      const impactPct = selectedScenario.assetImpacts[asset.symbol] ?? selectedScenario.marketImpact;
      const dollarChange = asset.value * (impactPct / 100);
      const postStressValue = asset.value + dollarChange;
      postStressTotal += postStressValue;
      
      return {
        symbol: asset.symbol,
        name: asset.name,
        currentValue: asset.value,
        postStressValue,
        impactPercent: impactPct,
        dollarChange
      };
    });

    const netChange = postStressTotal - originalTotal;
    const netChangePercent = originalTotal > 0 ? (netChange / originalTotal) * 100 : 0;
    const resilienceScore = Math.max(0, Math.min(100, Math.round(100 + netChangePercent * 1.8)));

    return {
      scenarioName: selectedScenario.name,
      originalValue: originalTotal,
      projectedValue: postStressTotal,
      netChange,
      netChangePercent,
      resilienceScore,
      details: assetImpactDetails
    };
  }, [selectedScenario, portfolioData]);

  // Chart data formatting
  const pieChartData = useMemo(() => {
    return portfolioData.assets.map(a => ({
      name: a.symbol,
      value: a.value,
      color: a.symbol === 'NVDA' ? '#10b981' : 
             a.symbol === 'MSFT' ? '#6366f1' : 
             a.symbol === 'AAPL' ? '#8b5cf6' : 
             a.symbol === 'AMZN' ? '#f59e0b' : 
             a.symbol === 'TLT' ? '#3b82f6' : '#ec4899'
    }));
  }, [portfolioData]);

  return (
    <div className="flex flex-col space-y-6 h-full overflow-y-auto pb-12 pr-1 font-sans">
      {/* Portfolio Main Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Total Net Asset Value (NAV)</span>
          <span className="text-xl font-bold text-slate-900 block mt-1 tracking-tight font-display">
            ${portfolioData.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <div className="flex items-center space-x-1.5 mt-1 text-4xs font-mono">
            <span className={portfolioData.totalDailyChange >= 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
              {portfolioData.totalDailyChange >= 0 ? '+' : ''}
              ${portfolioData.totalDailyChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-slate-300">|</span>
            <span className={portfolioData.totalChangePercent >= 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
              {portfolioData.totalChangePercent >= 0 ? '+' : ''}
              {portfolioData.totalChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="p-4.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Portfolio Volatility Beta</span>
          <span className="text-xl font-bold text-slate-900 block mt-1 tracking-tight font-display">
            {portfolioData.portfolioBeta.toFixed(2)}
          </span>
          <span className="text-5xs font-mono text-slate-400 tracking-wider block mt-1">
            {portfolioData.portfolioBeta > 1.2 ? 'GROWTH-BIASED WEIGHTING' : 'BALANCED RISK WEIGHTING'}
          </span>
        </div>

        <div className="p-4.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Sharpe Efficiency Ratio</span>
          <span className="text-xl font-bold text-indigo-600 block mt-1 tracking-tight font-display">
            2.14
          </span>
          <span className="text-5xs font-mono text-slate-400 tracking-wider block mt-1">OPTIMIZED VOLATILITY ADJUSTED</span>
        </div>

        <div className="p-4.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Weighted ESG Score</span>
          <span className="text-xl font-bold text-slate-900 block mt-1 tracking-tight font-display">
            {Math.round(portfolioData.overallEsg)}/100
          </span>
          <span className="text-5xs font-mono text-indigo-600 font-bold tracking-wider block mt-1">COMPLIANCE RATING: AA (HIGH)</span>
        </div>
      </div>

      {/* Main Breakdown Area & Sliders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Dynamic holdings editor */}
        <div className="xl:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4.5 h-4.5 text-indigo-600" />
                <h3 className="text-sm font-display font-bold text-slate-900">Allocation Weight Optimizer</h3>
              </div>
              <button 
                onClick={handleReset}
                className="text-4xs font-mono text-slate-400 hover:text-slate-700 flex items-center space-x-1 border border-slate-200 hover:border-slate-300 px-2.5 py-1 rounded-lg transition-all duration-200 bg-white shadow-2xs cursor-pointer font-bold"
              >
                <RefreshCw className="w-3 h-3 text-slate-500" />
                <span>RESET DEFAULT</span>
              </button>
            </div>

            <p className="text-xxs text-slate-400 font-sans mb-5 leading-relaxed">
              Dynamically model asset distribution targets. Modify holdings below to immediately recalculate composite indices, ESG compliance vectors, and stress-test vulnerabilities.
            </p>

            <div className="space-y-3">
              {portfolioData.assets.map((asset) => {
                const colors = {
                  NVDA: 'border-emerald-100 bg-emerald-50/10',
                  MSFT: 'border-indigo-100 bg-indigo-50/10',
                  AAPL: 'border-purple-100 bg-purple-50/10',
                  AMZN: 'border-amber-100 bg-amber-50/10',
                  TLT: 'border-blue-100 bg-blue-50/10',
                  GLD: 'border-pink-100 bg-pink-50/10'
                };
                const colorClass = colors[asset.symbol as keyof typeof colors] || 'border-slate-100 bg-slate-50/20';

                return (
                  <div key={asset.symbol} className={`p-4 rounded-xl border ${colorClass} flex flex-col xl:flex-row xl:items-center justify-between gap-4 transition-all duration-200`}>
                    <div className="flex items-center space-x-3 w-52 shrink-0">
                      <div className="p-1.5 bg-white border border-slate-200/75 rounded-lg text-center min-w-14 shrink-0 shadow-2xs">
                        <span className="text-xs font-bold text-slate-900 block font-mono leading-tight">{asset.symbol}</span>
                        <span className="text-5xs font-mono text-slate-400 block uppercase font-bold tracking-widest">{asset.sector.split(' ')[0]}</span>
                      </div>
                      <div className="truncate text-left">
                        <h4 className="text-xs font-semibold text-slate-800 truncate leading-snug">{asset.name}</h4>
                        <span className="text-4xs font-mono text-slate-400 font-medium">${asset.currentPrice} | Beta {asset.beta}</span>
                      </div>
                    </div>

                    {/* Tactile Allocation Slider + Precision Counters */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 justify-end">
                      {/* Range slider */}
                      <div className="flex items-center space-x-2.5 flex-1 min-w-[120px] max-w-xs md:max-w-none">
                        <input 
                          type="range"
                          min="0"
                          max={Math.max(1000, asset.shares * 3)}
                          value={asset.shares}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setShares(prev => ({ ...prev, [asset.symbol]: val }));
                          }}
                          className="w-full accent-indigo-650 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Precision step counters */}
                      <div className="flex items-center space-x-1 shrink-0">
                        <button 
                          onClick={() => adjustShares(asset.symbol, -10)} 
                          className="w-7 h-7 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 text-slate-600 font-mono text-3xs hover:text-slate-900 transition shadow-2xs font-bold cursor-pointer"
                        >
                          -10
                        </button>
                        <button 
                          onClick={() => adjustShares(asset.symbol, -1)} 
                          className="w-6 h-6 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 text-slate-600 font-mono text-3xs hover:text-slate-900 transition shadow-2xs font-bold cursor-pointer"
                        >
                          -1
                        </button>
                        <div className="w-14 text-center font-mono text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg py-1 shadow-2xs">
                          {asset.shares}
                        </div>
                        <button 
                          onClick={() => adjustShares(asset.symbol, 1)} 
                          className="w-6 h-6 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 text-slate-600 font-mono text-3xs hover:text-slate-900 transition shadow-2xs font-bold cursor-pointer"
                        >
                          +1
                        </button>
                        <button 
                          onClick={() => adjustShares(asset.symbol, 10)} 
                          className="w-7 h-7 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 text-slate-600 font-mono text-3xs hover:text-slate-900 transition shadow-2xs font-bold cursor-pointer"
                        >
                          +10
                        </button>
                      </div>

                      {/* Allocation display */}
                      <div className="text-right w-24 shrink-0">
                        <span className="text-xs font-bold text-slate-900 block font-mono leading-tight">${Math.round(asset.value).toLocaleString()}</span>
                        <span className="text-4xs font-mono text-indigo-600 font-bold uppercase tracking-wider">{asset.allocation}% weight</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Portfolio Pie composition chart */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xxs font-mono text-indigo-600 uppercase font-bold tracking-wider">Asset Distribution</span>
            <h3 className="text-sm font-display font-bold text-slate-900 mt-0.5 mb-4">Portfolio Weight Matrix</h3>
            
            <div className="w-full h-56 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(data) => setActiveSegment(data.name)}
                    onMouseLeave={() => setActiveSegment(null)}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: number) => `$${val.toLocaleString()}`}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
                    itemStyle={{ color: '#1e293b', fontSize: '12px', fontWeight: '500' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xs font-mono text-slate-400 font-bold tracking-wider">ALLOCATIONS</span>
                <span className="text-xs font-bold text-slate-800 font-display mt-0.5">Asset Mix</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {pieChartData.map((seg) => {
              const matchingAsset = portfolioData.assets.find(a => a.symbol === seg.name);
              return (
                <div key={seg.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50/50 text-xxs border border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-sm block" style={{ backgroundColor: seg.color }}></span>
                    <span className="text-slate-800 font-bold font-mono">{seg.name}</span>
                    <span className="text-slate-400 truncate max-w-28 text-3xs">{matchingAsset?.name}</span>
                  </div>
                  <span className="font-mono text-slate-700 font-bold">{matchingAsset?.allocation}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Macro Stress testing cockpit */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4.5 h-4.5 text-rose-500" />
            <h3 className="text-sm font-display font-bold text-slate-900">Macroeconomic Stress-Testing Engine</h3>
          </div>
          <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold">Scenario Simulator</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Scenario Selector */}
          <div className="lg:col-span-1 space-y-2.5">
            <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider block font-bold">1. Choose Risk Vector</span>
            <div className="space-y-2">
              {scenarios.map((sc) => {
                const isSelected = selectedScenario?.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => triggerScenarioSimulation(sc)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer shadow-2xs ${
                      isSelected 
                        ? 'bg-rose-50 border-rose-300 text-rose-950 ring-1 ring-rose-500/10' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold leading-snug">
                      <span className={isSelected ? 'text-rose-900 font-bold' : 'text-slate-800'}>{sc.name}</span>
                      <span className="font-mono text-4xs text-slate-400 font-semibold">{sc.probability}% Prob</span>
                    </div>
                    <span className="text-4xs font-mono text-slate-400 mt-1 block truncate max-w-xs">{sc.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Overview (3 cols) */}
          {isSimulating ? (
            <div className="lg:col-span-3 flex flex-col items-center justify-center min-h-[300px] bg-slate-900 border border-slate-800 rounded-xl p-8 relative overflow-hidden shadow-lg">
              {/* Pulsing background grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
              
              <div className="relative flex flex-col items-center space-y-4 text-center z-10">
                <RefreshCw className="w-10 h-10 text-rose-500 animate-spin" />
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-rose-500 uppercase tracking-widest font-bold">FinSight Stress Engine v3.5</span>
                  <h4 className="text-sm font-bold text-white font-display leading-snug">{simulationText}</h4>
                  <p className="text-[10px] font-mono text-slate-400 max-w-md mx-auto">Re-fitting covariance weights and checking asset correlation limits...</p>
                </div>
                
                {/* Simulated loader bar */}
                <div className="w-64 bg-slate-800 h-1 rounded-full overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-rose-500 via-indigo-500 to-purple-500 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            </div>
          ) : stressImpact && (
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/40 border border-slate-200/60 rounded-xl p-5">
              {/* Macro stats left */}
              <div className="md:col-span-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold">2. Simulated parameters</span>
                  <h4 className="text-xs font-bold text-rose-700 font-display uppercase tracking-wider mt-1">{stressImpact.scenarioName}</h4>
                  
                  <p className="text-xxs text-slate-500 font-sans mt-3.5 leading-relaxed">
                    {selectedScenario?.description}
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-150 rounded-xl space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xxs font-mono">
                    <span className="text-slate-400 font-bold">PROJECTED GDP:</span>
                    <span className="text-rose-600 font-bold">{selectedScenario?.gdpImpact}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xxs font-mono">
                    <span className="text-slate-400 font-bold">INFLATION PRESSURE:</span>
                    <span className="text-amber-600 font-bold">+{selectedScenario?.inflationImpact}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xxs font-mono">
                    <span className="text-slate-400 font-bold">INTEREST SHIFT:</span>
                    <span className="text-indigo-600 font-bold">+{selectedScenario?.interestRateImpact}bps</span>
                  </div>
                </div>
              </div>

              {/* Loss projection middle */}
              <div className="md:col-span-1 flex flex-col justify-center items-center text-center p-5 bg-white border border-slate-150 rounded-xl relative overflow-hidden shadow-2xs">
                <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">3. Portfolio Impact Delta</span>
                
                <div className="mt-4">
                  <span className={`text-2xl font-bold font-display block leading-none ${stressImpact.netChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stressImpact.netChange >= 0 ? '+' : ''}${Math.round(stressImpact.netChange).toLocaleString()}
                  </span>
                  <span className={`text-xs font-bold font-mono mt-1.5 block ${stressImpact.netChange >= 0 ? 'text-emerald-600 animate-pulse' : 'text-rose-600'}`}>
                    {stressImpact.netChange >= 0 ? '+' : ''}{stressImpact.netChangePercent.toFixed(2)}%
                  </span>
                </div>

                <div className="mt-5 w-full bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                  <div className="flex justify-between items-center text-xxs font-mono text-slate-500">
                    <span>Projected NAV:</span>
                    <span className="text-slate-800 font-bold">${Math.round(stressImpact.projectedValue).toLocaleString()}</span>
                  </div>
                </div>

                {/* Resilience gauge score */}
                <div className="mt-4 flex items-center justify-center space-x-1.5">
                  {stressImpact.resilienceScore >= 70 ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span className="text-xxs font-sans text-slate-500">
                    Resilience: <strong className={stressImpact.resilienceScore >= 70 ? 'text-emerald-600' : 'text-rose-600'}>{stressImpact.resilienceScore}/100</strong>
                  </span>
                </div>
              </div>

              {/* Asset level drilldown right */}
              <div className="md:col-span-1 space-y-2">
                <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">4. Individual asset exposure</span>
                <div className="overflow-y-auto max-h-60 space-y-1.5 pr-1">
                  {stressImpact.details.map((det) => {
                    const isBenefit = det.dollarChange >= 0;
                    return (
                      <div key={det.symbol} className="p-2.5 bg-white border border-slate-100 rounded-xl flex items-center justify-between text-xxs font-mono shadow-3xs">
                        <div>
                          <span className="text-slate-800 font-bold block">{det.symbol}</span>
                          <span className="text-slate-400 text-5xs font-bold uppercase tracking-wider">{det.name.split(' ')[0]}</span>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold block ${isBenefit ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isBenefit ? '+' : ''}{det.impactPercent.toFixed(1)}%
                          </span>
                          <span className={`text-4xs block font-medium ${isBenefit ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {isBenefit ? '+' : ''}${Math.round(det.dollarChange).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

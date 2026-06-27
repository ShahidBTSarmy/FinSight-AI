import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  CartesianGrid,
  Cell
} from 'recharts';
import { 
  Globe, 
  Leaf, 
  Users, 
  Scale, 
  CheckCircle, 
  Sparkles, 
  TrendingDown,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { EsgFactor } from '../types';

interface EsgIntelligenceProps {
  esgData: EsgFactor[];
}

export default function EsgIntelligence({ esgData }: EsgIntelligenceProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(esgData[0]?.symbol || 'MSFT');
  const selectedFactor = esgData.find(co => co.symbol === selectedSymbol) || esgData[0];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'AAA': return 'text-emerald-700 bg-emerald-50 border-emerald-200/60';
      case 'AA': return 'text-teal-700 bg-teal-50 border-teal-200/60';
      case 'A': return 'text-cyan-700 bg-cyan-50 border-cyan-200/60';
      case 'BBB': return 'text-amber-700 bg-amber-50 border-amber-200/60';
      default: return 'text-rose-700 bg-rose-50 border-rose-200/60';
    }
  };

  // Convert current selected factor into radar chart compatible structure
  const radarChartData = [
    { subject: 'Environmental', value: selectedFactor.environmentalScore, fullMark: 100 },
    { subject: 'Social Responsibility', value: selectedFactor.socialScore, fullMark: 100 },
    { subject: 'Corporate Governance', value: selectedFactor.governanceScore, fullMark: 100 },
    { subject: 'Carbon Control', value: 100 - Math.min(100, selectedFactor.carbonIntensity), fullMark: 100 },
    { subject: 'Board Diversity', value: selectedFactor.boardDiversity * 2, fullMark: 100 }, // Scaled for visual balance
  ];

  return (
    <div className="flex flex-col space-y-6 h-full overflow-y-auto pb-12 pr-1 font-sans">
      {/* Overview ESG Banner cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex items-center space-x-3.5 shadow-xs">
          <div className="p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl shrink-0">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Environmental Delta</span>
            <span className="text-sm font-bold text-slate-900 block mt-0.5">Carbon Reductions</span>
            <span className="text-4xs font-mono text-emerald-600 mt-1 block font-bold">-12.8% YoY Avg</span>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex items-center space-x-3.5 shadow-xs">
          <div className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Social standard</span>
            <span className="text-sm font-bold text-slate-900 block mt-0.5">Diversity & Safety</span>
            <span className="text-4xs font-mono text-indigo-600 mt-1 block font-bold">92.4% Compliance</span>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex items-center space-x-3.5 shadow-xs">
          <div className="p-2.5 bg-purple-50 border border-purple-100 text-purple-600 rounded-xl shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Governance</span>
            <span className="text-sm font-bold text-slate-900 block mt-0.5">Independent Board</span>
            <span className="text-4xs font-mono text-purple-600 mt-1 block font-bold">88.5% Autonomy</span>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex items-center space-x-3.5 shadow-xs">
          <div className="p-2.5 bg-teal-50 border border-teal-100 text-teal-600 rounded-xl shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Climate commitment</span>
            <span className="text-sm font-bold text-slate-900 block mt-0.5">Net Zero Stream</span>
            <span className="text-4xs font-mono text-teal-600 mt-1 block font-bold">2030 Global Pledge</span>
          </div>
        </div>
      </div>

      {/* Main Radar Vector & Company Scorecard Selection */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Company Selector Table (1 col) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xxs font-mono text-indigo-600 uppercase font-bold tracking-wider">Corporate List</span>
            <h3 className="text-sm font-display font-bold text-slate-900 mt-0.5 mb-4">ESG Corporate Index</h3>

            <div className="space-y-2.5">
              {esgData.map((co) => {
                const isSelected = selectedFactor.symbol === co.symbol;
                return (
                  <button
                    key={co.symbol}
                    onClick={() => setSelectedSymbol(co.symbol)}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group cursor-pointer shadow-3xs ${
                      isSelected 
                        ? 'bg-indigo-50/50 border-indigo-400 text-indigo-950 ring-1 ring-indigo-500/10' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-bold font-mono text-slate-800 shadow-3xs">
                        {co.symbol}
                      </div>
                      <div className="truncate text-left">
                        <span className="text-xs font-semibold block text-slate-800 leading-snug">{co.company}</span>
                        <span className="text-4xs font-mono text-slate-400 block uppercase font-medium mt-0.5">INTENSITY: {co.carbonIntensity} tCO2</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className={`text-5xs font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${getGradeColor(co.grade)}`}>
                        {co.grade}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl text-4xs font-mono text-slate-400 leading-relaxed mt-5">
            <span className="text-slate-500 font-bold uppercase block mb-1 tracking-wider">What is Alexandria ESG?</span>
            This matrix monitors structural ESG footprints. AAA denotes gold-standard sustainability leadership; CCC signals severe compliance risk profiles.
          </div>
        </div>

        {/* Detailed Factor Radar and Scorecard (2 cols) */}
        <div className="xl:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-600 animate-pulse" />
              <h3 className="text-sm font-display font-bold text-slate-900">{selectedFactor.company} ({selectedFactor.symbol}) Performance</h3>
            </div>
            <span className={`text-5xs font-mono font-bold px-2.5 py-1 rounded-md border uppercase ${getGradeColor(selectedFactor.grade)}`}>
              {selectedFactor.grade} Grade Leader
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Visual Radar of vectors */}
            <div className="w-full h-72 flex items-center justify-center bg-slate-50/20 rounded-xl border border-slate-100 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarChartData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={10} fontFamily="monospace" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={8} />
                  <Radar
                    name="Corporate Score"
                    dataKey="value"
                    stroke="#4f46e5"
                    fill="#6366f1"
                    fillOpacity={0.12}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
                    itemStyle={{ color: '#1e293b', fontSize: '12px', fontWeight: '500' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Scorecard Drilldown metrics */}
            <div className="space-y-4">
              <div>
                <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold">Total Framework compliance</span>
                <span className="text-2xl font-bold text-slate-900 block mt-0.5 font-display tracking-tight">{selectedFactor.totalScore}/100</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center shadow-3xs">
                  <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">E-Score</span>
                  <span className="text-sm font-bold text-emerald-600 block mt-1 font-mono">{selectedFactor.environmentalScore}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center shadow-3xs">
                  <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">S-Score</span>
                  <span className="text-sm font-bold text-indigo-600 block mt-1 font-mono">{selectedFactor.socialScore}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center shadow-3xs">
                  <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold block">G-Score</span>
                  <span className="text-sm font-bold text-purple-600 block mt-1 font-mono">{selectedFactor.governanceScore}</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xxs font-sans text-slate-600 pt-2">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400 font-medium">Carbon Intensity:</span>
                  <span className="text-slate-800 font-bold font-mono">{selectedFactor.carbonIntensity} tCO2e / $M rev</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400 font-medium">Board Diversity Metrics:</span>
                  <span className="text-slate-800 font-bold font-mono">{selectedFactor.boardDiversity}% Autonomy</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400 font-medium">Regulatory Audit Score:</span>
                  <span className="text-emerald-700 font-bold font-mono">{selectedFactor.complianceRating} Standing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Qualitative highlights list */}
          <div className="mt-5 p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3 shadow-3xs">
            <span className="text-5xs font-mono text-slate-400 uppercase font-bold tracking-widest block">Corporate Climate & Social Record</span>
            <div className="space-y-2.5">
              {selectedFactor.highlights?.map((highlight, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xxs leading-relaxed">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

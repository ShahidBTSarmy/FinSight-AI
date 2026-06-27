import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Timer, 
  CheckSquare, 
  Square,
  Sparkles,
  Info
} from 'lucide-react';
import { RiskAlert } from '../types';

interface RiskRadarProps {
  alerts: RiskAlert[];
  riskChecklist: { [id: string]: boolean };
  toggleHedgingAction: (id: string) => void;
  onRequestNotificationPermission: () => void;
  notificationPermissionStatus: string;
}

export default function RiskRadar({ 
  alerts, 
  riskChecklist, 
  toggleHedgingAction,
  onRequestNotificationPermission,
  notificationPermissionStatus
}: RiskRadarProps) {

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Critical': return 'text-rose-750 bg-rose-50 border-rose-200/60 font-bold';
      case 'High': return 'text-orange-750 bg-orange-50 border-orange-200/60 font-bold';
      case 'Medium': return 'text-amber-750 bg-amber-50 border-amber-200/60 font-bold';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  // Scheduled Macro updates
  const upcomingMacroTimeline = [
    { event: 'US Consumer Price Index (CPI) Publication', date: 'Jul 12, 12:30 UTC', status: 'Pending Verification', priority: 'High' },
    { event: 'Federal Open Market Committee (FOMC) Rate Verdict', date: 'Jul 26, 18:00 UTC', status: 'Pending Verification', priority: 'Critical' },
    { event: 'EU Carbon Border Adjustment Auditing Cycle', date: 'Aug 01, 09:00 UTC', status: 'Scheduled', priority: 'Medium' },
  ];

  return (
    <div className="flex flex-col space-y-6 h-full overflow-y-auto pb-12 pr-1 font-sans">
      {/* Desktop Notification Banner */}
      {notificationPermissionStatus !== 'granted' && (
        <div className="bg-white border border-indigo-200/80 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-3xs">
          <div className="flex items-start space-x-3 text-slate-800">
            <ShieldAlert className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0 animate-pulse" />
            <div className="text-left">
              <h4 className="text-xs font-bold font-display text-slate-900">Enable Desktop Push Notifications for Real-Time Risk Feeds</h4>
              <p className="text-xxs text-slate-500 font-sans mt-0.5 leading-relaxed">
                Stay updated instantly. Receive secure high-priority alerts even if FinSight is backgrounded or minimized, or if you're analyzing secondary modules.
              </p>
            </div>
          </div>
          <button
            onClick={onRequestNotificationPermission}
            className={`px-4 py-2.5 rounded-xl text-5xs font-mono font-bold tracking-wider shadow-3xs transition duration-200 shrink-0 cursor-pointer ${
              notificationPermissionStatus === 'denied'
                ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            disabled={notificationPermissionStatus === 'denied'}
          >
            {notificationPermissionStatus === 'denied' ? 'NOTIFICATIONS BLOCKED' : 'AUTHORIZE DESKTOP ALERTS'}
          </button>
        </div>
      )}

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Monitored Risk Elements</span>
          <span className="text-xl font-bold text-slate-900 block mt-1 tracking-tight font-display">24 Vectors</span>
          <span className="text-4xs text-rose-600 font-mono mt-1 block font-bold">&bull; 3 Active High-Severity Alerts</span>
        </div>

        <div className="p-4.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Active Hedge Coverage</span>
          <span className="text-xl font-bold text-emerald-600 block mt-1 tracking-tight font-display">
            {Object.values(riskChecklist).filter(Boolean).length} / {alerts.length} Hedges
          </span>
          <span className="text-4xs text-slate-400 font-mono mt-1 block">Active defensive overlay applied</span>
        </div>

        <div className="p-4.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-4xs font-mono text-slate-400 uppercase tracking-wider font-bold">Macro Volatility Factor</span>
          <span className="text-xl font-bold text-slate-900 block mt-1 tracking-tight font-display">Moderate</span>
          <span className="text-4xs text-slate-400 font-mono mt-1 block">Baseline baseline within 12.8 - 14.5% range</span>
        </div>
      </div>

      {/* Main Alert Log + Hedging Action Protocol */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Risk Logs (2 cols) */}
        <div className="xl:col-span-2 space-y-3.5">
          <span className="text-xxs font-mono text-indigo-600 uppercase font-bold tracking-wider block">Risk Response Registers</span>

          {alerts.map((alert) => {
            const isHedged = riskChecklist[alert.id];
            return (
              <div 
                key={alert.id} 
                className={`p-5 rounded-2xl border transition-all duration-300 shadow-3xs ${
                  isHedged 
                    ? 'bg-slate-50/70 border-slate-200/60 opacity-70' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-slate-100 pb-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-5xs font-mono bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-slate-500 font-bold">
                        {alert.category.toUpperCase()}
                      </span>
                      <span className={`text-5xs font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${getSeverityBadge(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className="text-4xs font-mono text-slate-400">UPDATED: {alert.timestamp}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug font-display">{alert.title}</h4>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0 text-right">
                    <div>
                      <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold">PROBABILITY</span>
                      <span className="text-xs font-bold font-mono text-slate-800 block mt-0.5">{alert.probability}%</span>
                    </div>
                    <div className="border-l border-slate-200 pl-4">
                      <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold">TIMEFRAME</span>
                      <span className="text-xs font-bold font-mono text-slate-600 block mt-0.5">{alert.impactTimeframe}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="md:col-span-2 space-y-3">
                    <p className="text-xxs text-slate-500 leading-relaxed font-sans">{alert.description}</p>
                    <div className="p-3 bg-slate-50/50 border border-slate-150 rounded-xl text-xxs font-mono">
                      <strong className="text-indigo-600 block mb-0.5 uppercase tracking-wider text-5xs font-bold">Defensive Overlay Blueprint:</strong>
                      <span className="text-slate-600 leading-relaxed font-sans block text-xxs">{alert.hedgingStrategy}</span>
                    </div>
                  </div>

                  {/* Interactive checklist action */}
                  <div className="flex justify-end shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => toggleHedgingAction(alert.id)}
                      className={`w-full md:w-auto px-4 py-2.5 rounded-xl border text-5xs font-mono tracking-wider font-bold flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer shadow-3xs ${
                        isHedged 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-1 ring-emerald-500/10' 
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      {isHedged ? <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0" />}
                      <span>{isHedged ? 'HEDGE COVERED' : 'EXECUTE HEDGING'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scheduled Timeline & Info Panel */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div>
              <span className="text-xxs font-mono text-indigo-600 uppercase font-bold tracking-wider">Catalyst Calendar</span>
              <h3 className="text-sm font-display font-bold text-slate-900 mt-0.5 mb-4">Macro Event Timeline</h3>
            </div>

            <div className="space-y-3">
              {upcomingMacroTimeline.map((item, index) => (
                <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-3 text-xxs font-mono shadow-3xs">
                  <Timer className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-slate-800 font-bold font-sans block leading-tight">{item.event}</span>
                    <div className="flex items-center space-x-2 text-4xs text-slate-400">
                      <span>{item.date}</span>
                      <span>&bull;</span>
                      <span className={item.priority === 'Critical' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>{item.priority.toUpperCase()} PRIORITY</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-indigo-50/60 border border-indigo-100/50 text-indigo-950 rounded-xl flex items-start space-x-3 mt-5">
            <Info className="w-4.5 h-4.5 shrink-0 text-indigo-500 mt-0.5" />
            <div className="text-xxs font-sans leading-relaxed text-indigo-900">
              <strong className="text-indigo-950 block mb-0.5 text-xs font-display">Macro Defensive Guidelines</strong>
              Executing any "DEFENSIVE COVER" strategy applies corresponding risk index mitigators, simulating short futures options or high-yield short-term treasuries.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

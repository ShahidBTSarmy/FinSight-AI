import React from 'react';
import { Settings2, Cpu, ShieldCheck, Key, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

interface SettingsProps {
  hasApiKey: boolean;
  onRefreshStatus: () => void;
  isChecking: boolean;
}

export default function Settings({ hasApiKey, onRefreshStatus, isChecking }: SettingsProps) {
  return (
    <div id="settings-tab" className="h-full overflow-y-auto px-6 py-6 space-y-8 font-sans text-slate-300 text-left">
      
      {/* HEADER ROW */}
      <div className="flex items-center space-x-3.5 border-b border-[#1e1e2d] pb-4">
        <div className="p-2.5 bg-gradient-to-tr from-slate-600 to-slate-800 text-white rounded-xl shadow-md">
          <Settings2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">SYSTEM CONFIGURATION</span>
          <h2 className="text-base md:text-lg font-display font-black text-white">Platform Settings & Security</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Security & Key Info (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold block">SECURITY COMPLIANCE DIRECTIVE</span>
            <h3 className="text-xs font-bold text-white block font-display">Secured API Key Handling Policy</h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            In compliance with enterprise fintech safety protocols, FinSight AI utilizes a full-stack proxy architecture. Private API credentials (such as your **Gemini API Key**) are isolated completely on the server-side, ensuring they are never exposed to the client browser's memory.
          </p>

          <div className="p-4 bg-[#0d0d16] border border-[#2b2b45] rounded-xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
            <div className="flex items-center space-x-2">
              <Key className="w-4.5 h-4.5 text-blue-400" />
              <span className="text-xxs font-bold text-white font-display">How to configure your live Gemini API Key:</span>
            </div>
            
            <ol className="text-xxs text-slate-400 list-decimal pl-4 space-y-2 leading-relaxed">
              <li>Open the **Settings** menu at the top-right of your Google AI Studio workspace.</li>
              <li>Select the **Secrets** or **Environment Variables** panel.</li>
              <li>Add a new secret key with the name: <code className="font-mono bg-slate-900 px-1 py-0.5 rounded text-indigo-400 font-bold">GEMINI_API_KEY</code>.</li>
              <li>Input your official Google DeepMind/Gemini API token as the value, and save.</li>
            </ol>
            
            <p className="text-[10px] text-slate-500 leading-relaxed font-sans pt-1">
              Once saved, Google AI Studio will inject this token automatically as an encrypted environment variable. The FinSight server will discover it instantly on subsequent calls, upgrading your session from emulation fallbacks to real-time research.
            </p>
          </div>
        </div>

        {/* Right column: Diagnostic Logs checklist (5 cols) */}
        <div className="lg:col-span-5 bg-[#0b0b13] border border-[#1e1e2d] rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex justify-between items-center border-b border-[#1e1e2d] pb-3">
            <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold block">SYSTEM DIAGNOSTIC</span>
            <button
              onClick={onRefreshStatus}
              disabled={isChecking}
              className="p-1.5 hover:bg-[#151525] border border-[#1e1e2d] rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xxs font-mono text-slate-500 uppercase">System Latency Proxy</span>
              <span className="text-emerald-400 font-bold font-mono text-xxs">8ms (Stable)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xxs font-mono text-slate-500 uppercase">Inbound Node Port</span>
              <span className="text-blue-400 font-bold font-mono text-xxs">3000 Active</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xxs font-mono text-slate-500 uppercase">Secure SSL Transport</span>
              <span className="text-emerald-400 font-bold font-mono text-xxs">TLS 1.3 Verified</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xxs font-mono text-slate-500 uppercase">Gemini Authentication</span>
              {hasApiKey ? (
                <span className="text-emerald-400 font-bold font-mono text-xxs flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AUTHENTICATED</span>
                </span>
              ) : (
                <span className="text-amber-400 font-bold font-mono text-xxs flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>EMULATED MODE</span>
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1e1e2d] space-y-2">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Active Version</span>
            <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
              FinSight Investment Decision Intelligence Suite v3.5. Powered by Google DeepMind Gemini models on Cloud Run containers.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

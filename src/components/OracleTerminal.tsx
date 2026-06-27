import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Send, 
  Sparkles, 
  Activity, 
  HelpCircle, 
  CornerDownLeft, 
  Loader2, 
  ArrowRight 
} from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../types';

export default function OracleTerminal() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingLog, setThinkingLog] = useState<string>('');
  const threadEndRef = useRef<HTMLDivElement>(null);

  // Suggested research triggers
  const promptTriggers = [
    { title: 'Semiconductor Friction', query: 'Analyze semiconductor sector resilience to maritime shipping bottlenecks and geopolitical friction.' },
    { title: 'Rate Compressions', query: 'Tweak S&P 500 projections for a scenario where inflation rises to 4.5% and the Fed maintains rates at 5.5%.' },
    { title: 'Carbon Risk Offsets', query: 'Suggest optimal high-yield hedge setups for a carbon-heavy retail portfolio.' },
  ];

  // Auto-scroll chat thread to bottom
  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle preset queries
  const handlePresetSelect = (query: string) => {
    if (isLoading) return;
    submitMessage(query);
  };

  const submitMessage = async (text: string) => {
    if (!text.trim()) return;

    // Create user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Simulated scanning updates for professional feel
    const updates = [
      'Establishing secure intelligence channel...',
      'Synthesizing SEC filings and macro metrics...',
      'Re-projecting S&P sector volatility factors...',
      'Compiling strategic hedges via Gemini...'
    ];

    let step = 0;
    setThinkingLog(updates[0]);
    const interval = setInterval(() => {
      step++;
      if (step < updates.length) {
        setThinkingLog(updates[step]);
      } else {
        clearInterval(interval);
      }
    }, 1200);

    try {
      const response = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });

      if (!response.ok) {
        throw new Error('Terminal Oracle interface error.');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'No response returned from institutional terminal.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        sources: data.sources || ['SEC Regulatory Filings', 'Alexandria ESG Directory', 'Real-Time Commodity Feeds']
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        sender: 'assistant',
        text: 'System Note: Connection to the server-side Gemini gateway was interrupted. Please check your network or ensure your GEMINI_API_KEY is supplied in the Settings > Secrets panel of your workspace.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      clearInterval(interval);
      setIsLoading(false);
      setThinkingLog('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs font-sans">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100 px-5 py-4.5 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <Terminal className="w-4 h-4 text-indigo-600" />
          <span className="text-4xs font-mono text-slate-400 font-bold tracking-widest uppercase">Secured Financial Research Oracle</span>
        </div>
        <div className="flex items-center space-x-2 text-4xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span className="text-slate-400 uppercase tracking-wider">AI Gateway Online</span>
        </div>
      </div>

      {/* Main chat viewport */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/30">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-xl mx-auto space-y-6">
            <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full shadow-2xs">
              <Sparkles className="w-7 h-7" />
            </div>
            
            <div>
              <h3 className="text-md font-display font-bold text-slate-900 tracking-tight">Active Financial Advisory Oracle</h3>
              <p className="text-xxs text-slate-400 mt-2 leading-relaxed font-sans max-w-md mx-auto">
                Connect directly with our server-side Gemini intelligence engine. Submit custom macro questions, model stress scenarios, or query complex hedging setups.
              </p>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full pt-4">
              {promptTriggers.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetSelect(t.query)}
                  className="p-4 bg-white hover:bg-slate-50 border border-slate-200/70 hover:border-slate-300 rounded-2xl transition-all duration-300 text-left text-xxs flex flex-col justify-between group h-28 shadow-3xs cursor-pointer"
                >
                  <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition leading-tight">{t.title}</span>
                  <p className="text-slate-400 mt-1.5 leading-normal line-clamp-3 font-sans text-4xs">{t.query}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => {
            const isAssistant = m.sender === 'assistant';
            return (
              <div 
                key={m.id} 
                className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'} animate-fade-in`}
              >
                <div className={`max-w-[85%] rounded-2xl p-4.5 border ${
                  isAssistant 
                    ? 'bg-white border-slate-200/60 text-slate-800 shadow-3xs' 
                    : 'bg-indigo-600 border-indigo-700 text-white shadow-2xs'
                }`}>
                  {isAssistant ? (
                    <div className="markdown-body text-xs md:text-sm text-slate-800 text-left">
                      <Markdown>{m.text}</Markdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line leading-relaxed font-sans text-xs md:text-sm">{m.text}</p>
                  )}
                  
                  {/* Sources info for Assistant messages */}
                  {isAssistant && m.sources && m.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-5xs font-mono text-slate-400 flex flex-wrap gap-2.5 items-center">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Corroborated Sources:</span>
                      {m.sources.map((src, sIdx) => (
                        <span key={sIdx} className="bg-slate-50 px-2 py-0.5 rounded-md text-slate-500 border border-slate-200/50 font-bold">{src.toUpperCase()}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-5xs font-mono text-slate-400 mt-1.5 px-2 uppercase tracking-wider">
                  {isAssistant ? 'Finsight Oracle' : 'Allocator Portfolio'} &bull; {m.timestamp}
                </div>
              </div>
            );
          })
        )}

        {/* Live Loading animation with simulated telemetry updates */}
        {isLoading && (
          <div className="flex flex-col items-start animate-fade-in">
            <div className="bg-white border border-slate-250/60 rounded-2xl p-4 max-w-[85%] text-slate-400 flex items-center space-x-3.5 shadow-3xs">
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
              <div className="space-y-0.5">
                <span className="text-5xs font-mono text-slate-400 uppercase tracking-widest font-bold">Oracle Processing</span>
                <p className="text-xxs font-mono text-indigo-600 animate-pulse font-semibold">{thinkingLog}</p>
              </div>
            </div>
          </div>
        )}

        <div ref={threadEndRef} />
      </div>

      {/* Message input bar */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            submitMessage(inputValue);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            placeholder="Query global catalysts, SEC details, or request sector-hedging options..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-4 pr-14 py-3.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-sans shadow-inner transition"
          />
          <div className="absolute right-2.5 flex items-center">
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-lg transition-all duration-200 shadow-2xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
        <div className="mt-2.5 flex items-center justify-between text-5xs font-mono text-slate-400 uppercase px-1 tracking-wider">
          <span>Secure advisor terminal Active</span>
          <span>Press Enter to Submit</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { CompanyReport, CopilotMessage } from '../types';
import { 
  MessageSquareCode, 
  Send, 
  Sparkles, 
  Trash2, 
  HelpCircle,
  TrendingUp,
  Cpu,
  RefreshCw
} from 'lucide-react';

interface CopilotProps {
  activeCompany: CompanyReport | null;
  messages: CopilotMessage[];
  setMessages: React.Dispatch<React.SetStateAction<CopilotMessage[]>>;
  isSending: boolean;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
}

export default function Copilot({ 
  activeCompany, 
  messages, 
  setMessages, 
  isSending, 
  onSendMessage, 
  onClearChat 
}: CopilotProps) {
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim() !== '' && !isSending) {
      onSendMessage(inputVal.trim());
      setInputVal('');
    }
  };

  const handleSuggestionClick = (text: string) => {
    if (!isSending) {
      onSendMessage(text);
    }
  };

  // Build grounded suggestions based on active company
  const suggestions = activeCompany 
    ? [
        `Should I invest in ${activeCompany.companyName}?`,
        `What are the core competitive moats for ${activeCompany.ticker}?`,
        `What are the critical risks in ${activeCompany.companyName}'s business?`,
        `Describe how inflation impact delta affects ${activeCompany.ticker}.`
      ]
    : [
        "What makes a business have a strong economic moat?",
        "How do interest rate hikes affect growth stocks?",
        "Explain structural risk score definition.",
        "How do I analyze a balance sheet for health?"
      ];

  return (
    <div id="copilot-tab" className="h-full flex flex-col font-sans text-slate-300 bg-[#06060a]">
      {/* 1. COPILOT HEADER WITH CONTEXT STATUS */}
      <div className="px-6 py-4 border-b border-[#1e1e2d] bg-[#08080c] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3 text-left">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl shadow-md glow-blue">
            <MessageSquareCode className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[9.5px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold block">QUANTITATIVE CO-ADVISOR</span>
            <h3 className="text-xs font-bold text-white block">FinSight Intelligence Copilot</h3>
          </div>
        </div>

        {/* Focus Company badge */}
        <div className="flex items-center space-x-3 shrink-0">
          {activeCompany ? (
            <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl text-xxs font-mono text-blue-400 font-bold flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Grounded on: {activeCompany.companyName}</span>
            </div>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl text-xxs font-mono text-amber-400 font-bold">
              Unrestricted Prompt Mode
            </div>
          )}

          <button
            onClick={onClearChat}
            title="Clear Chat Logs"
            className="p-2 hover:bg-[#151525] hover:text-white rounded-xl border border-[#1e1e2d] transition text-slate-500 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. CHAT FEED & HISTORY */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-none">
        
        {/* Welcome message if empty */}
        {messages.length === 0 && (
          <div className="max-w-xl mx-auto text-center py-10 space-y-5">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-full mx-auto">
              <Sparkles className="w-5.5 h-5.5 animate-pulse" />
            </div>
            <div className="space-y-1.5 text-center">
              <h4 className="text-sm font-bold font-display text-white">Ask your Quantitative Copilot Anything</h4>
              <p className="text-xxs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Our copilot understands strategic finance. If you have a company loaded under active focus, the copilot automatically consumes its financial metrics, news sentiment ratios, and risk variables.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const isAi = msg.role === 'assistant';
          return (
            <div 
              key={msg.id} 
              className={`flex ${isAi ? 'justify-start' : 'justify-end'} max-w-4xl mx-auto`}
            >
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed max-w-[85%] text-left space-y-1.5 shadow-md relative overflow-hidden ${
                isAi 
                  ? 'bg-[#0d0d15] border-[#1e1e2d] text-slate-200' 
                  : 'bg-indigo-600 border-indigo-500 text-white'
              }`}>
                {isAi && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
                )}
                
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pb-1 border-b border-[#ffffff]/5">
                  <span className={isAi ? 'text-indigo-400 font-extrabold' : 'text-indigo-200 font-extrabold'}>
                    {isAi ? 'FINSIGHT AI CO-ADVISOR' : 'ALLOCATOR PROMPT'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="pt-1.5 whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Pulse Loading state */}
        {isSending && (
          <div className="flex justify-start max-w-4xl mx-auto">
            <div className="p-4 bg-[#0d0d15] border border-[#1e1e2d] rounded-2xl text-slate-400 text-xxs font-mono flex items-center space-x-2.5 shadow-md">
              <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin" />
              <span>Co-advisor is formulating underwriting thesis...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. CLICKABLE SUGGESTIONS TRAY */}
      <div className="px-6 py-2 bg-[#050508]/60 border-t border-[#131320] flex items-center space-x-3.5 overflow-x-auto scrollbar-none whitespace-nowrap shrink-0">
        <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest font-extrabold shrink-0">
          SUGGESTIONS:
        </span>
        <div className="flex items-center space-x-2 shrink-0">
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(sug)}
              disabled={isSending}
              className="px-3 py-1.5 bg-[#0e0e16] hover:bg-[#141423] border border-[#1e1e2d] rounded-lg text-[10.5px] font-sans font-medium text-slate-350 transition disabled:opacity-50 cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* 4. CHAT INPUT BLOCK */}
      <div className="px-6 py-4 border-t border-[#1e1e2d] bg-[#08080c] shrink-0">
        <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isSending}
            placeholder={activeCompany ? `Ask a question about ${activeCompany.companyName} (e.g. "Should I buy?", "What is its moat?")...` : "Ask any quantitative finance question..."}
            className="w-full pl-5 pr-20 py-3.5 bg-[#0d0d14] border border-[#1e1e2d] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all font-sans font-medium shadow-inner disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSending || inputVal.trim() === ''}
            className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white rounded-lg text-xxs font-mono font-bold tracking-wider uppercase transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}

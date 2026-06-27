import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Analyzer from './components/Analyzer';
import Sentiment from './components/Sentiment';
import Competitors from './components/Competitors';
import Simulator from './components/Simulator';
import Copilot from './components/Copilot';
import Reports from './components/Reports';
import Settings from './components/Settings';

import { CompanyReport, CopilotMessage } from './types';
import { mockCompanyDatabase, generateDynamicMockReport, getChatFallback } from './utils/fallbackGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeCompany, setActiveCompany] = useState<CompanyReport | null>(() => mockCompanyDatabase['apple']);
  const [savedReports, setSavedReports] = useState<CompanyReport[]>(() => [
    mockCompanyDatabase['apple'],
    mockCompanyDatabase['tesla'],
    mockCompanyDatabase['reliance']
  ]);
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  
  // UI Loading States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  // Auto-check key status on startup by doing a silent metadata check
  useEffect(() => {
    const checkApiKeyStatus = async () => {
      setIsChecking(true);
      try {
        const res = await fetch('/api/analyze?q=apple');
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response was not JSON format");
        }
        const data = await res.json();
        if (data && data.ticker) {
          // If response has no "Emulation" note in any field, set hasApiKey to true
          const isEmulated = data.note && data.note.toLowerCase().includes('emulation');
          setHasApiKey(!isEmulated);
        }
      } catch (err: any) {
        console.warn("API key check handled gracefully:", err.message || err);
        setHasApiKey(false);
      } finally {
        setIsChecking(false);
      }
    };
    checkApiKeyStatus();
  }, []);

  const handleRefreshStatus = async () => {
    setIsChecking(true);
    try {
      const res = await fetch('/api/analyze?q=apple');
      if (!res.ok) {
        throw new Error(`Server status ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const data = await res.json();
      if (data && data.ticker) {
        const isEmulated = data.note && data.note.toLowerCase().includes('emulation');
        setHasApiKey(!isEmulated);
      }
    } catch (err) {
      console.warn("Refresh status handled gracefully:", err);
      setHasApiKey(false);
    } finally {
      setIsChecking(false);
    }
  };

  // Main company analysis search handler
  const handleAnalyzeCompany = async (query: string) => {
    if (!query || query.trim() === '') return;
    setIsLoading(true);
    
    // Switch to analyzer tab immediately so they see the progress loading state
    setActiveTab('analyzer');

    try {
      let data: CompanyReport;
      try {
        const res = await fetch(`/api/analyze?q=${encodeURIComponent(query.trim())}`);
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON format");
        }
        data = await res.json();
      } catch (fetchErr) {
        console.warn("Server API failed, using high-fidelity client-side fallback:", fetchErr);
        const qLower = query.trim().toLowerCase();
        data = mockCompanyDatabase[qLower] || generateDynamicMockReport(query.trim());
      }

      if (data && data.ticker) {
        setActiveCompany(data);
        
        // Add to saved reports list
        setSavedReports(prev => {
          if (prev.some(r => r.ticker.toLowerCase() === data.ticker.toLowerCase())) {
            return prev.map(r => r.ticker.toLowerCase() === data.ticker.toLowerCase() ? data : r);
          }
          return [data, ...prev];
        });

        // Set live key flag based on response note
        const isEmulated = data.note && data.note.toLowerCase().includes('emulation');
        setHasApiKey(!isEmulated);

        // Clear copilot messages if company changes to keep context crisp
        setMessages([]);
      }
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Click handler for trending lists or archive selection
  const handleSelectCompanyDirectly = (companyName: string) => {
    handleAnalyzeCompany(companyName);
  };

  const handleLoadDemoReport = async () => {
    setIsLoading(true);
    setActiveTab('analyzer');
    try {
      let data: CompanyReport;
      try {
        const res = await fetch('/api/analyze?q=apple');
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON format");
        }
        data = await res.json();
      } catch (fetchErr) {
        console.warn("Demo server API failed, using client fallback:", fetchErr);
        data = mockCompanyDatabase['apple'];
      }

      if (data && data.ticker) {
        setActiveCompany(data);
        setSavedReports(prev => {
          if (prev.some(r => r.ticker === data.ticker)) return prev;
          return [data, ...prev];
        });
        const isEmulated = data.note && data.note.toLowerCase().includes('emulation');
        setHasApiKey(!isEmulated);
      }
    } catch (err) {
      console.warn("Demo loading handled gracefully:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSavedReport = (report: CompanyReport) => {
    setActiveCompany(report);
    setMessages([]); // Refresh chat context
    setActiveTab('analyzer');
  };

  // Copilot Chat Action
  const handleSendMessage = async (text: string) => {
    if (!text || text.trim() === '') return;
    
    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsSending(true);

    try {
      let reply: string;
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages,
            companyContext: activeCompany
          })
        });
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        const data = await res.json();
        reply = data?.reply || "";
      } catch (chatErr) {
        console.warn("Server chat API failed, using client fallback:", chatErr);
        reply = getChatFallback(text, activeCompany);
      }

      if (reply) {
        const aiMsg: CopilotMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error("Chat message failed:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const renderActiveTabContent = () => {
    if (isLoading) {
      return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-indigo-950/45 rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-slate-500">
            Formulating corporate intelligence matrix & auditing balance sheets...
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <Homepage 
            onNavigate={setActiveTab} 
            onLoadDemo={handleLoadDemoReport} 
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            activeCompany={activeCompany} 
            onSelectCompany={handleSelectCompanyDirectly}
            savedReportsCount={savedReports.length}
          />
        );
      case 'analyzer':
        return (
          <Analyzer 
            activeCompany={activeCompany} 
            onNavigate={setActiveTab} 
          />
        );
      case 'sentiment':
        return (
          <Sentiment 
            activeCompany={activeCompany} 
            onNavigate={setActiveTab} 
          />
        );
      case 'competitors':
        return (
          <Competitors 
            activeCompany={activeCompany} 
            onNavigate={setActiveTab} 
          />
        );
      case 'simulator':
        return (
          <Simulator 
            activeCompany={activeCompany} 
            onNavigate={setActiveTab} 
          />
        );
      case 'copilot':
        return (
          <Copilot 
            activeCompany={activeCompany}
            messages={messages}
            setMessages={setMessages}
            isSending={isSending}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
          />
        );
      case 'reports':
        return (
          <Reports 
            savedReports={savedReports} 
            onSelectReport={handleSelectSavedReport} 
            activeCompany={activeCompany} 
          />
        );
      case 'settings':
        return (
          <Settings 
            hasApiKey={hasApiKey} 
            onRefreshStatus={handleRefreshStatus} 
            isChecking={isChecking} 
          />
        );
      default:
        return (
          <Homepage 
            onNavigate={setActiveTab} 
            onLoadDemo={handleLoadDemoReport} 
          />
        );
    }
  };

  return (
    <div id="app-root" className="flex h-screen bg-[#050508] text-slate-200 overflow-hidden font-sans antialiased relative">
      {/* 1. Sleek Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        hasApiKey={hasApiKey}
      />

      {/* 2. Main Terminal Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#050508]">
        {/* Universal Header */}
        <Header 
          onSearch={handleAnalyzeCompany}
          activeTab={activeTab}
          activeCompany={activeCompany ? { name: activeCompany.companyName, ticker: activeCompany.ticker } : null}
          hasApiKey={hasApiKey}
        />

        {/* Dynamic View Viewport */}
        <main className="flex-1 overflow-hidden">
          {renderActiveTabContent()}
        </main>
      </div>
    </div>
  );
}

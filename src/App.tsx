/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import IntelligenceDashboard from './components/IntelligenceDashboard';
import PortfolioHealth from './components/PortfolioHealth';
import OracleTerminal from './components/OracleTerminal';
import EsgIntelligence from './components/EsgIntelligence';
import OpportunityScanner from './components/OpportunityScanner';
import RiskRadar from './components/RiskRadar';
import ToastNotification, { Toast } from './components/ToastNotification';
import Homepage from './components/Homepage';

import { 
  initialMarketIndices, 
  initialPortfolio, 
  stressScenarios, 
  opportunityAnomalies, 
  esgFactors, 
  riskAlerts 
} from './data';
import { MarketIndex, PortfolioAsset, StressScenario, OpportunityAnomaly, EsgFactor, RiskAlert } from './types';

// Real-time High-Priority Institutional Risk Pool
const mockAlertPool: Omit<RiskAlert, 'id' | 'timestamp'>[] = [
  {
    title: 'Middle East Maritime Supply Lane Redirection',
    category: 'Geopolitical',
    severity: 'Critical',
    description: 'Escalated regional tensions require oil tankers and dry-bulk carriers to redirect around the Cape of Good Hope, adding 10-14 days to European trade cycles.',
    probability: 45,
    impactTimeframe: 'Immediate',
    hedgingStrategy: 'Accumulate oil transport logistics and maritime shippers, hedge energy exposure using Brent crude calls.',
  },
  {
    title: 'Sovereign Debt Downgrade Shockwave',
    category: 'Macroeconomic',
    severity: 'High',
    description: 'A major global rating agency adjusts credit outlooks for key Eurozone sovereign bonds, prompting large-scale capital flows into liquid USD cash equivalents.',
    probability: 60,
    impactTimeframe: '1-2 Weeks',
    hedgingStrategy: 'Increase allocations to high-grade US short-term Treasuries (SHY/BIL) and pare back levered emerging market corporate debt.',
  },
  {
    title: 'EPA Methane Auditing Crackdown',
    category: 'Regulatory',
    severity: 'High',
    description: 'Strict newly certified emission audits go into effect for North American natural gas pipelines, risking immediate supply suspensions and heavy non-compliance penalties.',
    probability: 80,
    impactTimeframe: '1-3 Months',
    hedgingStrategy: 'Overweight carbon auditing compliance leaders, shift short-term gas long positions to diversified utility networks.',
  },
  {
    title: 'Nordic Grid Cybersecurity Outage',
    category: 'Geopolitical',
    severity: 'Critical',
    description: 'Unidentified coordinated distributed denial-of-service (DDoS) networks temporarily suspend power transmission across key Nordic server corridors, affecting hyperscaler uptime.',
    probability: 25,
    impactTimeframe: 'Immediate',
    hedgingStrategy: 'Diversify backup cloud servers, acquire short-term cyber liability security hedges.',
  },
  {
    title: 'VIX Volatility Expansion Cycle',
    category: 'Macroeconomic',
    severity: 'High',
    description: 'A surprise contraction in regional purchasing manager indices (PMI) triggers an immediate 35% surge in the VIX index, pushing baseline margins higher.',
    probability: 65,
    impactTimeframe: 'Immediate',
    hedgingStrategy: 'Purchase near-the-money VIX calls, scale down high-multiplier consumer discretionary holdings.',
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Data States
  const [marketIndices, setMarketIndices] = useState<MarketIndex[]>(initialMarketIndices);
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>(initialPortfolio);
  const [scenarios] = useState<StressScenario[]>(stressScenarios);
  const [opportunities, setOpportunities] = useState<OpportunityAnomaly[]>(opportunityAnomalies);
  const [esgData, setEsgData] = useState<EsgFactor[]>(esgFactors);
  const [alerts, setAlerts] = useState<RiskAlert[]>(riskAlerts);
  
  // Lifted Risk Checklist State
  const [riskChecklist, setRiskChecklist] = useState<{ [id: string]: boolean }>({
    'risk-1': false,
    'risk-2': true, // Simulated as completed hedging
    'risk-3': false,
  });

  // Action States
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Toast notifications & Badge indicators
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [unreadAlertIds, setUnreadAlertIds] = useState<string[]>([]);
  const [notificationPermission, setNotificationPermission] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  const mockIndexRef = useRef<number>(0);

  // Ask for browser-native push notifications authorization
  const handleRequestNotificationPermission = () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission === 'granted') {
          // Trigger instant feedback push
          new Notification('🔔 FinSight Risk Radar Connected', {
            body: 'Real-time high-priority risk indicators will now be active on this browser.',
          });
        }
      });
    }
  };

  // Synchronize browser native status
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const toggleHedgingAction = (id: string) => {
    setRiskChecklist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Clear unread badge when going to risk radar tab
  useEffect(() => {
    if (activeTab === 'risks') {
      setUnreadAlertIds([]);
    }
  }, [activeTab]);

  const triggerMockAlert = () => {
    // Pick the next alert sequentially from pool
    const baseAlert = mockAlertPool[mockIndexRef.current % mockAlertPool.length];
    mockIndexRef.current += 1;

    const id = `risk-${Date.now()}`;
    const newAlert: RiskAlert = {
      ...baseAlert,
      id,
      timestamp: 'Just Now'
    };

    // Add alert to list
    setAlerts(prev => [newAlert, ...prev]);

    // Show toast notification globally
    const newToast: Toast = {
      id,
      title: newAlert.title,
      description: newAlert.description,
      severity: newAlert.severity,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setToasts(prev => [newToast, ...prev]);

    // If on a different tab, append to unread indicators
    if (activeTab !== 'risks') {
      setUnreadAlertIds(prev => [...prev, id]);
    }

    // Auto-dismiss in-app toast after 8 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 8000);

    // HTML5 Web Browser Notification
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification(`⚠️ CRITICAL RISK TRIGGERED`, {
            body: `${newAlert.title}: ${newAlert.description}`,
            tag: id,
          });
        } catch (e) {
          console.error('Error triggering push notification:', e);
        }
      }
    }
  };

  // Close toast manually
  const handleCloseToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Switch to risk radar on clicking dynamic toast CTA
  const handleViewAlert = (id: string) => {
    setActiveTab('risks');
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Real-Time Risk Simulation: Every 60 seconds trigger a background event
  useEffect(() => {
    const interval = setInterval(() => {
      triggerMockAlert();
    }, 60000);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Simulated Synchronize feeds
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate small market ticks on refresh to show immediate live feedback!
      setMarketIndices(prev => 
        prev.map(ind => {
          const tickPct = (Math.random() - 0.5) * 0.4; // up or down up to 0.2%
          const updatedPrice = parseFloat((ind.price * (1 + tickPct / 100)).toFixed(2));
          const updatedChange = parseFloat((ind.change + (updatedPrice - ind.price)).toFixed(2));
          const updatedChangePercent = (updatedChange / (updatedPrice - updatedChange)) * 100;
          return {
            ...ind,
            price: updatedPrice,
            change: updatedChange,
            changePercent: updatedChangePercent,
            chartData: [...ind.chartData.slice(1), { 
              time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
              value: updatedPrice 
            }]
          };
        })
      );
      
      setIsRefreshing(false);
    }, 1200);
  };

  const handleGlobalSearch = (query: string) => {
    if (query) {
      setActiveTab('opportunities');
    }
  };

  const handleAddSimulatedAsset = (symbol: string, name: string, price: number, sector: string) => {
    if (portfolio.some(a => a.symbol === symbol)) {
      // Create an alert toast that it already exists
      const id = `exist-${Date.now()}`;
      const existingToast: Toast = {
        id,
        title: `${symbol} Already Simulating`,
        description: `${name} (${symbol}) is already configured inside your active portfolio optimization pool.`,
        severity: 'Medium',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setToasts(prev => [existingToast, ...prev]);
      return;
    }

    const newAsset: PortfolioAsset = {
      symbol,
      name,
      shares: 150, // Standard starting block
      avgPrice: price,
      currentPrice: price,
      value: 150 * price,
      allocation: 0,
      dailyChange: 0,
      dailyChangePercent: 0,
      beta: symbol === 'TSM' ? 1.45 : symbol === 'GOOGL' ? 1.15 : symbol === 'MRK' ? 0.60 : 0.85,
      sector,
      esgScore: symbol === 'TSM' ? 84 : symbol === 'GOOGL' ? 78 : symbol === 'MRK' ? 82 : 72,
      esgGrade: symbol === 'TSM' ? 'AA' : symbol === 'GOOGL' ? 'A' : 'AA'
    };

    setPortfolio(prev => [...prev, newAsset]);

    // Push premium notification
    const id = `add-${Date.now()}`;
    const newToast: Toast = {
      id,
      title: `${symbol} Added to Simulation`,
      description: `150 initial shares of ${name} have been injected into your testing portfolio. Switch to Portfolio Health to run stress-tests and allocate weight.`,
      severity: 'Low',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setToasts(prev => [newToast, ...prev]);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <Homepage onNavigate={setActiveTab} unreadAlertsCount={unreadAlertIds.length} />;
      case 'markets':
        return <IntelligenceDashboard indices={marketIndices} onRefresh={handleRefresh} />;
      case 'portfolio':
        return <PortfolioHealth portfolio={portfolio} scenarios={scenarios} />;
      case 'oracle':
        return <OracleTerminal />;
      case 'esg':
        return <EsgIntelligence esgData={esgData} />;
      case 'opportunities':
        return <OpportunityScanner opportunities={opportunities} onAddAsset={handleAddSimulatedAsset} />;
      case 'risks':
        return (
          <RiskRadar 
            alerts={alerts} 
            riskChecklist={riskChecklist} 
            toggleHedgingAction={toggleHedgingAction}
            onRequestNotificationPermission={handleRequestNotificationPermission}
            notificationPermissionStatus={notificationPermission}
          />
        );
      default:
        return <Homepage onNavigate={setActiveTab} unreadAlertsCount={unreadAlertIds.length} />;
    }
  };

  return (
    <div id="app-root" className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans antialiased relative">
      {/* 1. Sleek Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadAlertsCount={unreadAlertIds.length} 
      />

      {/* 2. Main Terminal Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Status bar header */}
        <Header 
          indices={marketIndices} 
          onRefresh={handleRefresh} 
          isRefreshing={isRefreshing} 
          onSearch={handleGlobalSearch}
          activeTab={activeTab}
          unreadAlertsCount={unreadAlertIds.length}
          onTriggerMockAlert={triggerMockAlert}
          onViewRisks={() => setActiveTab('risks')}
        />

        {/* View viewport */}
        <main className="flex-1 overflow-hidden p-6 bg-slate-950/20">
          {renderActiveTabContent()}
        </main>
      </div>

      {/* Global Real-Time Toast Container */}
      <ToastNotification 
        toasts={toasts} 
        onClose={handleCloseToast} 
        onViewAlert={handleViewAlert} 
      />
    </div>
  );
}

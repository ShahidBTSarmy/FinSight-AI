import { MarketIndex, PortfolioAsset, StressScenario, OpportunityAnomaly, EsgFactor, RiskAlert } from './types';

// Generate some simple chart data
const generateChartData = (startValue: number, volatility: number, points: number = 30) => {
  const data = [];
  let currentValue = startValue;
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const change = (Math.random() - 0.48) * startValue * (volatility / 100);
    currentValue = parseFloat((currentValue + change).toFixed(2));
    data.push({ time: dateStr, value: currentValue });
  }
  return data;
};

export const initialMarketIndices: MarketIndex[] = [
  {
    symbol: 'SPX',
    name: 'S&P 500 Index',
    price: 5432.25,
    change: 32.40,
    changePercent: 0.60,
    sentiment: 'Bullish',
    sentimentScore: 74,
    volume: '2.45B',
    peRatio: 24.8,
    volatility: 13.2,
    chartData: generateChartData(5400, 1.2)
  },
  {
    symbol: 'IXIC',
    name: 'NASDAQ Composite',
    price: 18120.50,
    change: 145.20,
    changePercent: 0.81,
    sentiment: 'Bullish',
    sentimentScore: 81,
    volume: '4.82B',
    peRatio: 31.4,
    volatility: 16.5,
    chartData: generateChartData(18000, 1.8)
  },
  {
    symbol: 'DJI',
    name: 'Dow Jones Industrial',
    price: 39150.10,
    change: -45.60,
    changePercent: -0.12,
    sentiment: 'Neutral',
    sentimentScore: 52,
    volume: '1.10B',
    peRatio: 18.2,
    volatility: 11.4,
    chartData: generateChartData(39200, 0.8)
  },
  {
    symbol: 'UKX',
    name: 'FTSE 100 Index',
    price: 8240.40,
    change: 18.90,
    changePercent: 0.23,
    sentiment: 'Neutral',
    sentimentScore: 48,
    volume: '750M',
    peRatio: 14.5,
    volatility: 12.1,
    chartData: generateChartData(8220, 1.0)
  },
  {
    symbol: 'N225',
    name: 'Nikkei 225 Index',
    price: 38650.00,
    change: -320.50,
    changePercent: -0.82,
    sentiment: 'Bearish',
    sentimentScore: 32,
    volume: '1.80B',
    peRatio: 16.8,
    volatility: 18.2,
    chartData: generateChartData(39000, 1.5)
  }
];

export const initialPortfolio: PortfolioAsset[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    shares: 420,
    avgPrice: 95.00,
    currentPrice: 124.50,
    value: 52290.00,
    allocation: 23.2,
    dailyChange: 4.20,
    dailyChangePercent: 3.49,
    beta: 1.85,
    sector: 'Semiconductors',
    esgScore: 84,
    esgGrade: 'AA'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 110,
    avgPrice: 380.00,
    currentPrice: 421.20,
    value: 46332.00,
    allocation: 20.6,
    dailyChange: 1.80,
    dailyChangePercent: 0.43,
    beta: 1.15,
    sector: 'Software & Cloud',
    esgScore: 92,
    esgGrade: 'AAA'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 210,
    avgPrice: 175.00,
    currentPrice: 189.30,
    value: 39753.00,
    allocation: 17.7,
    dailyChange: -0.90,
    dailyChangePercent: -0.47,
    beta: 1.10,
    sector: 'Consumer Electronics',
    esgScore: 89,
    esgGrade: 'AA'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    shares: 220,
    avgPrice: 155.00,
    currentPrice: 181.80,
    value: 39996.00,
    allocation: 17.8,
    dailyChange: 2.10,
    dailyChangePercent: 1.17,
    beta: 1.30,
    sector: 'E-commerce & Cloud',
    esgScore: 74,
    esgGrade: 'A'
  },
  {
    symbol: 'TLT',
    name: 'iShares 20+ Yr Treasury Bond ETF',
    shares: 310,
    avgPrice: 94.50,
    currentPrice: 91.20,
    value: 28272.00,
    allocation: 12.6,
    dailyChange: -0.30,
    dailyChangePercent: -0.33,
    beta: -0.15,
    sector: 'Government Bonds',
    esgScore: 95,
    esgGrade: 'AAA'
  },
  {
    symbol: 'GLD',
    name: 'SPDR Gold Shares',
    shares: 80,
    avgPrice: 202.00,
    currentPrice: 221.50,
    value: 17720.00,
    allocation: 7.9,
    dailyChange: 1.45,
    dailyChangePercent: 0.66,
    beta: -0.05,
    sector: 'Commodities',
    esgScore: 68,
    esgGrade: 'BBB'
  }
];

export const stressScenarios: StressScenario[] = [
  {
    id: 'stagflation',
    name: '1970s-Style Stagflation',
    description: 'A structural supply shock (energy prices surge 80%), sending inflation to 9.5% and causing a severe economic slowdown. Fed raises interest rates aggressively to 7.5%, choking corporate CAPEX and consumer spending.',
    gdpImpact: -3.8,
    inflationImpact: 6.2,
    interestRateImpact: 250,
    marketImpact: -25.0,
    assetImpacts: {
      'NVDA': -35.0,
      'MSFT': -22.0,
      'AAPL': -24.0,
      'AMZN': -28.0,
      'TLT': -18.0,
      'GLD': 28.0
    },
    probability: 15
  },
  {
    id: 'ai-bubble',
    name: 'AI Valuations Correct',
    description: 'A dramatic repricing of enterprise AI technology where monetization lags expectations. CapEx projects are slashed across the board. Tech-heavy indices suffer severe correction, while defensive assets and value sectors remain stable.',
    gdpImpact: -1.2,
    inflationImpact: -0.8,
    interestRateImpact: -50,
    marketImpact: -18.5,
    assetImpacts: {
      'NVDA': -55.0,
      'MSFT': -18.0,
      'AAPL': -12.0,
      'AMZN': -15.0,
      'TLT': 8.0,
      'GLD': 2.0
    },
    probability: 25
  },
  {
    id: 'rate-cuts',
    name: 'Aggressive Rate Cuts (Soft Landing)',
    description: 'Inflation cools cleanly to the Fed\'s 2.0% target. The central bank executes 150bps of synchronized rate cuts. Liquidity surges, driving a major high-beta equities rally while bond yields fall, lifting treasuries.',
    gdpImpact: 2.8,
    inflationImpact: -0.5,
    interestRateImpact: -150,
    marketImpact: 18.0,
    assetImpacts: {
      'NVDA': 32.0,
      'MSFT': 16.0,
      'AAPL': 14.0,
      'AMZN': 22.0,
      'TLT': 12.0,
      'GLD': -2.0
    },
    probability: 40
  },
  {
    id: 'sovereign-debt',
    name: 'Sovereign Debt Liquidity Squeeze',
    description: 'Fiscal deficits drive sudden yield spikes in long-term sovereign debt. High interest costs trigger a localized credit crunch, forcing financial institutions to de-lever. Equity multiples compress due to high discount rates.',
    gdpImpact: -2.5,
    inflationImpact: 1.5,
    interestRateImpact: 180,
    marketImpact: -15.0,
    assetImpacts: {
      'NVDA': -22.0,
      'MSFT': -12.0,
      'AAPL': -14.0,
      'AMZN': -18.0,
      'TLT': -15.0,
      'GLD': 15.0
    },
    probability: 12
  }
];

export const opportunityAnomalies: OpportunityAnomaly[] = [
  {
    symbol: 'TSM',
    name: 'Taiwan Semiconductor Mfg.',
    sector: 'Semiconductors',
    price: 154.20,
    peRatio: 21.2,
    sentimentScore: 88,
    valuationScore: 85,
    rsi: 48,
    recommendation: 'STRONG BUY',
    catalyst: 'Unprecedented demand for advanced nodes (3nm/2nm) outpaces industry macro concerns. Institutional positioning remains underweight.'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Software & Search',
    price: 173.10,
    peRatio: 20.8,
    sentimentScore: 78,
    valuationScore: 76,
    rsi: 52,
    recommendation: 'ACCUMULATE',
    catalyst: 'Cloud revenue acceleration and YouTube programmatic monetization offsets regulatory scrutiny in core search services.'
  },
  {
    symbol: 'MRK',
    name: 'Merck & Co., Inc.',
    sector: 'Healthcare',
    price: 118.50,
    peRatio: 14.8,
    sentimentScore: 68,
    valuationScore: 82,
    rsi: 41,
    recommendation: 'STRONG BUY',
    catalyst: 'Keytruda pipeline expansion approvals combined with defensive cash flows make it highly resilient to tariff-related risk cycles.'
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    sector: 'Energy',
    price: 111.40,
    peRatio: 12.4,
    sentimentScore: 42,
    valuationScore: 90,
    rsi: 36,
    recommendation: 'ACCUMULATE',
    catalyst: 'Significant cash-flow generation and stock buybacks provide a high safety margin, trading at a 30% discount to peers.'
  }
];

export const esgFactors: EsgFactor[] = [
  {
    company: 'Microsoft Corp.',
    symbol: 'MSFT',
    environmentalScore: 94,
    socialScore: 88,
    governanceScore: 94,
    totalScore: 92,
    grade: 'AAA',
    carbonIntensity: 12.4,
    boardDiversity: 44,
    complianceRating: 'Optimal',
    highlights: [
      'Carbon negative commitment by 2030 across direct and supply chain emissions.',
      'Industry-leading privacy standards and ethical AI development frameworks.',
      'Strong independent board with robust audit and risk committees.'
    ]
  },
  {
    company: 'Apple Inc.',
    symbol: 'AAPL',
    environmentalScore: 91,
    socialScore: 84,
    governanceScore: 92,
    totalScore: 89,
    grade: 'AA',
    carbonIntensity: 18.2,
    boardDiversity: 38,
    complianceRating: 'High',
    highlights: [
      '100% carbon-neutral operations reached; planning neutral supply chain by 2030.',
      'Exceptional cybersecurity mechanisms protecting client-side data.',
      'Rigorous supplier responsibility auditing program across global supply hubs.'
    ]
  },
  {
    company: 'NVIDIA Corp.',
    symbol: 'NVDA',
    environmentalScore: 82,
    socialScore: 86,
    governanceScore: 84,
    totalScore: 84,
    grade: 'AA',
    carbonIntensity: 28.5,
    boardDiversity: 31,
    complianceRating: 'High',
    highlights: [
      'Active focus on computing energy efficiency (high Performance-per-Watt architectures).',
      'Strong culture of employee retention, diversity, and internal promotion.',
      'Rigorous intellectual property risk mitigation protocols.'
    ]
  },
  {
    company: 'Amazon.com Inc.',
    symbol: 'AMZN',
    environmentalScore: 68,
    socialScore: 72,
    governanceScore: 82,
    totalScore: 74,
    grade: 'A',
    carbonIntensity: 52.8,
    boardDiversity: 42,
    complianceRating: 'Medium',
    highlights: [
      'Large investments in solar and wind; aims for 100% renewable power by 2025.',
      'Ongoing regulatory investigations and labor union relations affect social rankings.',
      'Strong risk management systems across vast global logistics hubs.'
    ]
  }
];

export const riskAlerts: RiskAlert[] = [
  {
    id: 'risk-1',
    title: 'Geopolitical Semiconductor Escalation',
    category: 'Geopolitical',
    severity: 'Critical',
    description: 'Potential maritime cargo inspection delays in key East Asian trade channels threaten supply continuity of sub-5nm advanced silicon wafers.',
    probability: 30,
    impactTimeframe: '1-3 Months',
    hedgingStrategy: 'Shift tactical capital to hardware designers with regional manufacturing diversification (e.g., TSM expansion sites in US/Europe).',
    timestamp: 'Just Now'
  },
  {
    id: 'risk-2',
    title: 'Yield Curve Inversion Acceleration',
    category: 'Macroeconomic',
    severity: 'High',
    description: 'The 10-Year to 2-Year US Treasury spread widens further, signifying extreme bond-market expectations of long-term economic deceleration.',
    probability: 70,
    impactTimeframe: 'Immediate',
    hedgingStrategy: 'Increase duration buffers using TLT and scale down high-multiplier small cap equity exposures.',
    timestamp: '2 Hours Ago'
  },
  {
    id: 'risk-3',
    title: 'EU AI Act Enforcement Phase 2',
    category: 'Regulatory',
    severity: 'Medium',
    description: 'New model transparency audit requirements go into effect, exposing large software companies to massive compliance audits and potential structural changes.',
    probability: 85,
    impactTimeframe: '6-12 Months',
    hedgingStrategy: 'Verify that platform companies (MSFT, GOOGL) have pre-allocated compliance budgets and structured model disclosure structures.',
    timestamp: '1 Day Ago'
  }
];

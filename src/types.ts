export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
  sentimentScore: number; // 0 - 100
  volume: string;
  peRatio: number;
  volatility: number; // VIX or implied volatility %
  chartData: { time: string; value: number }[];
}

export interface PortfolioAsset {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  allocation: number; // percentage
  dailyChange: number;
  dailyChangePercent: number;
  beta: number; // market sensitivity
  sector: string;
  esgScore: number; // 0 - 100
  esgGrade: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC';
}

export interface StressScenario {
  id: string;
  name: string;
  description: string;
  gdpImpact: number; // % change
  inflationImpact: number; // % change
  interestRateImpact: number; // basis points change
  marketImpact: number; // index change
  assetImpacts: { [symbol: string]: number }; // percentage change for each asset
  probability: number; // %
}

export interface OpportunityAnomaly {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  peRatio: number;
  sentimentScore: number; // AI Sentiment Score 0-100
  valuationScore: number; // 0-100 (higher is more undervalued)
  rsi: number;
  recommendation: 'STRONG BUY' | 'ACCUMULATE' | 'HOLD' | 'REDUCE';
  catalyst: string;
}

export interface EsgFactor {
  company: string;
  symbol: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  totalScore: number;
  grade: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B';
  carbonIntensity: number; // tCO2e / $M revenue
  boardDiversity: number; // %
  complianceRating: string;
  highlights: string[];
}

export interface RiskAlert {
  id: string;
  title: string;
  category: 'Geopolitical' | 'Macroeconomic' | 'Regulatory' | 'Liquidity' | 'Operational';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  probability: number; // %
  impactTimeframe: string;
  hedgingStrategy: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
  suggestions?: string[];
}

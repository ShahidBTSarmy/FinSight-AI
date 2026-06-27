export interface Competitor {
  name: string;
  revenue: string;
  profitability: string;
  risk: string;
  growth: string;
  advantages: string[];
}

export interface CompanyScores {
  growth: number;
  financialHealth: number;
  risk: number; // 0 - 100, where higher is more risk
  competitiveStrength: number;
  valuation: number;
}

export interface NewsSentiment {
  bullish: number; // 0 - 100
  bearish: number; // 0 - 100
  neutral: number; // 0 - 100
  summary: string;
}

export interface EconomicImpact {
  inflation: number; // projected % change in performance under +2% inflation
  interestRate: number; // projected % change under +1.5% interest rate hike
  currency: number; // projected % change under +5% currency strengthening
  oil: number; // projected % change under +20% oil price shock
  gdp: number; // projected % change under +1% GDP growth rate
}

export interface CompanyReport {
  companyName: string;
  ticker: string;
  investmentScore: number; // 0 - 100
  scores: CompanyScores;
  summary: string;
  sentiment: NewsSentiment;
  financials: {
    revenue: string;
    profitability: string;
    debt: string;
  };
  competitors: Competitor[];
  economicImpact: EconomicImpact;
  economicImpactExplanations: {
    inflation: string;
    interestRate: string;
    currency: string;
    oil: string;
    gdp: string;
  };
  keyTakeaways: string[];
  note?: string;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

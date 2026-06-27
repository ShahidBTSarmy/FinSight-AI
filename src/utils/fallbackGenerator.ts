// Client-side fallback database and report generator for offline/serverless/Vercel environments.
// Matches the structure and logic of server.ts exactly.

export interface CompanyReport {
  companyName: string;
  ticker: string;
  investmentScore: number;
  scores: {
    growth: number;
    financialHealth: number;
    risk: number;
    competitiveStrength: number;
    valuation: number;
  };
  summary: string;
  sentiment: {
    bullish: number;
    bearish: number;
    neutral: number;
    summary: string;
  };
  financials: {
    revenue: string;
    profitability: string;
    debt: string;
  };
  competitors: Array<{
    name: string;
    revenue: string;
    profitability: string;
    risk: string;
    growth: string;
    advantages: string[];
  }>;
  economicImpact: {
    inflation: number;
    interestRate: number;
    currency: number;
    oil: number;
    gdp: number;
  };
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

export const mockCompanyDatabase: Record<string, CompanyReport> = {
  "apple": {
    companyName: "Apple Inc.",
    ticker: "AAPL",
    investmentScore: 88,
    scores: {
      growth: 82,
      financialHealth: 96,
      risk: 24,
      competitiveStrength: 98,
      valuation: 68
    },
    summary: "Apple Inc. represents a blue-chip consumer technology anchor with premium ecosystem lock-in, pristine cash flow generation, and structural expansion in services. The launch of Apple Intelligence serves as a key hardware refresh catalyst.",
    sentiment: {
      bullish: 74,
      bearish: 11,
      neutral: 15,
      summary: "Institutional sentiment remains highly constructive. Heavy expectations rest on high services gross margins (74%+) and consumer retention cycles. Minor headwinds exist from European antitrust rulings and global hardware saturation."
    },
    financials: {
      revenue: "$391.04B (YoY +6.2%)",
      profitability: "Gross Margin 46.2%, Net Income $93.74B",
      debt: "Total Debt $102B vs Cash & Liquidity of $156B (AAA Tier Profile)"
    },
    competitors: [
      {
        name: "Microsoft (MSFT)",
        revenue: "$245.10B",
        profitability: "Operating Margin 43.1%",
        risk: "Heavy capital expenditure on cloud data centers",
        growth: "YoY +15.2%",
        advantages: ["Enterprise cloud leadership", "Exclusive OpenAI commercial integrations"]
      },
      {
        name: "Samsung Electronics",
        revenue: "$220.40B",
        profitability: "Operating Margin 11.4%",
        risk: "High cyclicality in memory and consumer electronics",
        growth: "YoY +3.1%",
        advantages: ["Highly verticalized semiconductor fabrication", "Strong display panel supply monopoly"]
      }
    ],
    economicImpact: {
      inflation: -3.2,
      interestRate: -0.8,
      currency: -4.5,
      oil: -1.2,
      gdp: -5.0
    },
    economicImpactExplanations: {
      inflation: "Premium pricing power and ecosystem loyalty largely shield Apple, though rising component costs compress consumer hardware margins slightly.",
      interestRate: "Virtually immune to interest rate hikes due to its monumental $156B cash pile yielding high interest income.",
      currency: "Substantial international footprint (55%+ revenue outside USA) triggers negative foreign exchange translation when USD strengthens.",
      oil: "Increases global freight and shipping costs marginally, but has negligible impact on digital service margins or core chip production.",
      gdp: "Moderate consumer elasticity; during prolonged GDP drops, users delay hardware upgrades from 3 to 4.5 years, while services stay stable."
    },
    keyTakeaways: [
      "The ecosystem's active installed base exceeding 2.2 billion devices guarantees recurring services revenue.",
      "High margins in iCloud, App Store, Apple Pay, and Subscriptions drive organic valuation multiple expansion.",
      "Requires aggressive AI features to justify its premium valuation multiple relative to historical averages."
    ]
  },
  "tesla": {
    companyName: "Tesla Inc.",
    ticker: "TSLA",
    investmentScore: 74,
    scores: {
      growth: 86,
      financialHealth: 88,
      risk: 45,
      competitiveStrength: 92,
      valuation: 42
    },
    summary: "Tesla is a high-growth disruptor transitioning from a pure-play EV automaker into an AI, robotics, and energy storage conglomerate. It possesses industry-leading margins in energy storage but faces intense margin compression in legacy EV markets.",
    sentiment: {
      bullish: 62,
      bearish: 26,
      neutral: 12,
      summary: "Highly polarized market sentiment. Bulls focus on Full Self-Driving (FSD) autonomy beta milestones, Megapack energy expansion, and the Optimus robot pipeline. Bears focus on global EV price warfare and high executive key-man risk."
    },
    financials: {
      revenue: "$96.77B (YoY +3.5%)",
      profitability: "Gross Margin 18.2%, Net Income $14.97B",
      debt: "Total Debt $9.5B vs Cash & Equivalents of $29.1B (Highly Liquid)"
    },
    competitors: [
      {
        name: "BYD Auto (1211.HK)",
        revenue: "$84.20B",
        profitability: "Operating Margin 6.3%",
        risk: "Low geographic exposure to the US market due to tariffs",
        growth: "YoY +28.1%",
        advantages: ["Complete in-house battery cell manufacturing", "Low-cost model hierarchy dominance"]
      },
      {
        name: "Toyota Motor (TM)",
        revenue: "$298.50B",
        profitability: "Operating Margin 10.1%",
        risk: "Delayed transition to pure battery electric powertrains",
        growth: "YoY +8.4%",
        advantages: ["Global hybrid market monopoly", "Pristine manufacturing quality reputation"]
      }
    ],
    economicImpact: {
      inflation: -6.4,
      interestRate: -8.5,
      currency: -2.1,
      oil: 8.2,
      gdp: -10.5
    },
    economicImpactExplanations: {
      inflation: "Increases battery raw material prices (lithium, cobalt) and dampens high-ticket vehicle purchases.",
      interestRate: "High rates are extremely toxic; over 80% of vehicle purchases depend on financing, making monthly payments significantly higher.",
      currency: "Partially insulated by local manufacturing sites (Shanghai, Berlin, Texas), minimizing direct cross-border tariff and FX friction.",
      oil: "Positive catalyst. Surging oil prices act as a direct psychological driver pushing consumers to substitute ICE cars for EVs.",
      gdp: "High beta vehicle stock; highly cyclical. Consumer discretionary spending contractions severely impact Tesla's high-tier vehicle lines."
    },
    keyTakeaways: [
      "Auto gross margins (ex-credits) have stabilized, but recovery depends on next-generation low-cost vehicle architectures.",
      "The Energy Storage division (Megapack) is growing at >100% YoY, acting as a massive secondary high-margin business line.",
      "Premium valuation relies heavily on AI autonomy solving, making it an exceptionally high-beta risk/reward vehicle."
    ]
  },
  "infosys": {
    companyName: "Infosys Limited",
    ticker: "INFY",
    investmentScore: 81,
    scores: {
      growth: 72,
      financialHealth: 94,
      risk: 18,
      competitiveStrength: 85,
      valuation: 70
    },
    summary: "Infosys is a global IT consulting and digital transformation heavyweight. Known for pristine corporate governance, robust free cash flow yields, and extensive exposure to Western enterprise cloud-migration budgets.",
    sentiment: {
      bullish: 68,
      bearish: 12,
      neutral: 20,
      summary: "Cautiously optimistic sentiment. Analysts highlight strong large-deal wins and AI-driven efficiency gains. Minor headwinds center on slower discretionary cloud consulting spend in North America and Europe."
    },
    financials: {
      revenue: "$18.60B (YoY +4.1%)",
      profitability: "Operating Margin 20.8%, Net Income $3.15B",
      debt: "Virtually Debt-Free (D/E ratio of <0.05) with $3.8B Cash reserves"
    },
    competitors: [
      {
        name: "Accenture (ACN)",
        revenue: "$64.10B",
        profitability: "Operating Margin 15.5%",
        risk: "Premium pricing makes them vulnerable to low-cost outsourcing",
        growth: "YoY +5.2%",
        advantages: ["Extensive global systems integrator relationships", "Premium strategy advisory dominance"]
      },
      {
        name: "Tata Consultancy Services (TCS)",
        revenue: "$29.10B",
        profitability: "Operating Margin 24.3%",
        risk: "High employee count leading to salary inflation friction",
        growth: "YoY +6.8%",
        advantages: ["Massive institutional client stickiness", "High localized execution model"]
      }
    ],
    economicImpact: {
      inflation: -2.5,
      interestRate: -4.0,
      currency: 5.5,
      oil: -0.5,
      gdp: -6.2
    },
    economicImpactExplanations: {
      inflation: "Wages inflation in India pressures operating margins, but offshore arbitrage remains highly competitive.",
      interestRate: "High interest rates in Western markets cause clients to curtail discretionary IT spend and delay long-term tech cycles.",
      currency: "Strong positive driver. Since Infosys earns primarily in USD/EUR and spends in INR, a strengthening USD significantly expands operating margins.",
      oil: "Minimal impact on remote service delivery models; negligible logistics exposure.",
      gdp: "Highly linked to global corporate capital expenditure; economic recessions delay software modernization contracts."
    },
    keyTakeaways: [
      "Its debt-free balance sheet and steady dividend payout ratio (70%+) represent a fortress-like defensive choice during volatile climates.",
      "The Infosys Topaz AI suite is successfully capturing cognitive enterprise consulting market share.",
      "Relies on Western corporate banking and retail sectors recovering their discretionary tech-modernization budgets."
    ]
  },
  "reliance": {
    companyName: "Reliance Industries Limited",
    ticker: "RELIANCE.NS",
    investmentScore: 84,
    scores: {
      growth: 78,
      financialHealth: 86,
      risk: 28,
      competitiveStrength: 95,
      valuation: 72
    },
    summary: "Reliance Industries is India's premier conglomerate, successfully bridging oil refining and petrochemicals with high-growth digital infrastructure (Jio), retail, and green energy initiatives. It acts as a primary proxy for Indian GDP expansion.",
    sentiment: {
      bullish: 78,
      bearish: 8,
      neutral: 14,
      summary: "Highly constructive sentiment. Analysts favor the pricing power of Jio telecom tariffs and strong physical footprint expansion in retail. The upcoming IPOs of Jio and Retail subsidiaries represent massive unlocking catalysts."
    },
    financials: {
      revenue: "₹10,00,120 Cr (YoY +8.2%)",
      profitability: "EBITDA Margin 17.5%, Net Profit ₹79,020 Cr",
      debt: "Net Debt ₹1.15 Lakh Cr vs capital asset base of ₹15 Lakh Cr"
    },
    competitors: [
      {
        name: "Adani Enterprises (ADANIENT)",
        revenue: "₹96,420 Cr",
        profitability: "EBITDA Margin 11.2%",
        risk: "High capital leverage and regulatory auditing scrutiny",
        growth: "YoY +18.4%",
        advantages: ["Dominance in Indian national infrastructure", "Strong port and airport monopoly concessions"]
      },
      {
        name: "Bharti Airtel (BHARTIDIRT)",
        revenue: "₹1,50,000 Cr",
        profitability: "EBITDA Margin 51.5%",
        risk: "High industry capital expenditure for 5G spectrum",
        growth: "YoY +11.2%",
        advantages: ["Premium ARPU market segmentation", "Extensive African telecom operations coverage"]
      }
    ],
    economicImpact: {
      inflation: -4.0,
      interestRate: -3.5,
      currency: -1.8,
      oil: 6.8,
      gdp: 9.5
    },
    economicImpactExplanations: {
      inflation: "Consumer retail margins feel transient pressure, though price adjustments in telecoms and grocery retail act as inflation hedges.",
      interestRate: "High interest rates increase finance costs on capital expenditure programs in green hydrogen and 5G.",
      currency: "Weakening INR benefits crude oil refining exports but increases crude import raw material costs.",
      oil: "Positive tailwinds. Strong refining spreads (GRMs) benefit Reliance's massive Jamnagar refining complex during high global energy prices.",
      gdp: "Highly linked to domestic consumption. Indian middle-class wealth expansion directly fuels Jio digital services, data usage, and consumer retail."
    },
    keyTakeaways: [
      "Jio is the dominant digital gateway of India with over 480 million subscribers, laying the groundwork for monetization of 5G, cloud, and AI.",
      "The massive retail division represents an unassailable physical moat with over 18,000 physical stores.",
      "Unlocking value through the standalone listing of telecom and retail arms is the primary medium-term catalyst."
    ]
  },
  "tcs": {
    companyName: "Tata Consultancy Services",
    ticker: "TCS.NS",
    investmentScore: 83,
    scores: {
      growth: 70,
      financialHealth: 98,
      risk: 15,
      competitiveStrength: 94,
      valuation: 65
    },
    summary: "TCS is India's largest IT exporter and the crown jewel of the Tata Group. Features industry-leading operating margins, unmatched client retention, and robust multi-year order books across defense, aviation, and financial services globally.",
    sentiment: {
      bullish: 70,
      bearish: 10,
      neutral: 20,
      summary: "Broadly positive and steady. TCS is viewed as a highly stable defensive asset. Analysts focus on its superior margin profile and successful penetration of AI-driven operating model upgrades."
    },
    financials: {
      revenue: "₹2,40,890 Cr (YoY +6.8%)",
      profitability: "Operating Margin 24.3%, Net Profit ₹46,100 Cr",
      debt: "Completely Debt-Free with ₹48,000 Cr in liquid treasury reserves"
    },
    competitors: [
      {
        name: "Infosys (INFY)",
        revenue: "₹1,53,670 Cr",
        profitability: "Operating Margin 20.8%",
        risk: "Slightly higher management attrition volatility",
        growth: "YoY +4.1%",
        advantages: ["High-speed agile transformation reputation", "Aggressive digital-first advisory portfolio"]
      },
      {
        name: "Wipro (WIPRO)",
        revenue: "₹89,760 Cr",
        profitability: "Operating Margin 16.1%",
        risk: "Undergoing extensive internal executive reorganization",
        growth: "YoY +1.2%",
        advantages: ["Strong engineering design outsource capability", "High focus on healthcare consulting vertical"]
      }
    ],
    economicImpact: {
      inflation: -1.8,
      interestRate: -3.0,
      currency: 4.8,
      oil: -0.2,
      gdp: -4.5
    },
    economicImpactExplanations: {
      inflation: "Salary inflation remains manageable due to TCS's industry-leading campus-to-corporate talent supply chain.",
      interestRate: "High interest rates depress US financial services (BFSI) consulting spend, which constitutes over 30% of TCS business.",
      currency: "Every 1% deprecation of INR against the USD expands TCS's operating margin by roughly 25-30 basis points.",
      oil: "Negligible direct exposure. Minor positive influence from IT contracts with Middle Eastern energy conglomerates.",
      gdp: "Moderate elasticity. Enterprise tech budgets face cuts during hard recessions, but outsourcing budgets often swell to cut structural costs."
    },
    keyTakeaways: [
      "The absolute gold standard for capital allocation, returning nearly 100% of free cash flow via massive buybacks and dividends.",
      "The Tata brand halo offers immense recruitment leverage and enterprise credibility across government and global defense.",
      "Requires recovery of capital expenditure cycles in the US banking sector to re-accelerate high-growth services."
    ]
  },
  "hdfc": {
    companyName: "HDFC Bank Limited",
    ticker: "HDFCBANK.NS",
    investmentScore: 86,
    scores: {
      growth: 76,
      financialHealth: 92,
      risk: 20,
      competitiveStrength: 96,
      valuation: 74
    },
    summary: "HDFC Bank is India's largest private sector bank, post its historic merger with parent HDFC Corp. It is the dominant engine of retail credit, featuring highly conservative underwriting standards and strong low-cost deposits (CASA).",
    sentiment: {
      bullish: 75,
      bearish: 11,
      neutral: 14,
      summary: "Constructive. Analysts are focusing on post-merger synergy execution and the stabilization of net interest margins (NIM). Substantial upside is seen as credit demand in urban and rural India remains secularly robust."
    },
    financials: {
      revenue: "₹2,86,500 Cr (Gross Income, YoY +12.4%)",
      profitability: "Net Interest Margin (NIM) 3.6%, Net Profit ₹64,060 Cr",
      debt: "Capital Adequacy Ratio (CAR) of 18.8% (Well above statutory limits)"
    },
    competitors: [
      {
        name: "ICICI Bank (ICICIBANK)",
        revenue: "₹1,86,000 Cr",
        profitability: "Net Interest Margin (NIM) 4.1%",
        risk: "Slightly higher risk weight on unsecured personal loans",
        growth: "YoY +14.2%",
        advantages: ["Superior digital bank app architecture", "Strong corporate and SME lending momentum"]
      },
      {
        name: "State Bank of India (SBI)",
        revenue: "₹3,90,000 Cr",
        profitability: "Net Interest Margin (NIM) 3.1%",
        risk: "Lower capital efficiency and public sector overhead",
        growth: "YoY +9.8%",
        advantages: ["Unmatched national brand awareness and rural network", "Sovereign deposits and credit backing guarantee"]
      }
    ],
    economicImpact: {
      inflation: -4.5,
      interestRate: 6.2,
      currency: -1.0,
      oil: -3.4,
      gdp: 8.8
    },
    economicImpactExplanations: {
      inflation: "Persistent inflation impacts middle-class repayment capacity and raises retail NPA (non-performing assets) slightly.",
      interestRate: "Positive driver. High interest rates allow banks to repric loan portfolios faster than savings deposit rates, expanding NIM.",
      currency: "Negligible direct exposure. Minor foreign currency loan portfolio is fully hedged.",
      oil: "High oil prices stoke domestic inflation, forcing the central bank (RBI) to keep rates elevated and slowing consumer loans.",
      gdp: "Directly synchronized with the Indian economy. Expanding GDP accelerates corporate CAPEX loans and retail vehicle/housing credit."
    },
    keyTakeaways: [
      "Moated by a massive physical network of over 8,500 branches and deep corporate retail salary account locking.",
      "Undisputed credit underwriting safety record with Gross NPAs maintaining a pristine <1.3% level through economic cycles.",
      "Sustained margin stabilization post-merger represents the main catalyst for multiple re-rating."
    ]
  }
};

// Generates dynamic high-fidelity report on the fly
export function generateDynamicMockReport(companyName: string): CompanyReport {
  const normalized = companyName.trim().replace(/\s+/g, ' ');
  const cleanName = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  
  // Hash calculation to keep results consistent for the same inputs
  let hash = 0;
  for (let i = 0; i < cleanName.length; i++) {
    hash = (hash << 5) - hash + cleanName.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const ticker = cleanName.substring(0, 4).toUpperCase();
  const growth = 60 + (absHash % 32);
  const finHealth = 65 + ((absHash >> 2) % 31);
  const risk = 15 + ((absHash >> 4) % 36); // 15 - 51
  const compStrength = 60 + ((absHash >> 6) % 35);
  const valuation = 40 + ((absHash >> 8) % 45);

  const scoreSum = Math.round((growth + finHealth + compStrength + (100 - risk) + valuation) / 5);

  const bullish = 50 + (absHash % 31); // 50 - 80
  const bearish = 10 + ((absHash >> 1) % 21); // 10 - 30
  const neutral = 100 - bullish - bearish;

  return {
    companyName: `${cleanName} Corp`,
    ticker: ticker,
    investmentScore: scoreSum,
    scores: {
      growth: growth,
      financialHealth: finHealth,
      risk: risk,
      competitiveStrength: compStrength,
      valuation: valuation
    },
    summary: `${cleanName} Corp is analyzed as a notable participant in its industry segment. Features a balanced leverage profile, localized brand moats, and emerging capability in software automation. Medium-term catalysts include structural adjustments to lower operating expenditure and expansion into APAC markets.`,
    sentiment: {
      bullish: bullish,
      bearish: bearish,
      neutral: neutral,
      summary: `Market sentiment surrounding ${cleanName} is moderately optimistic. Buy-side interest is fueled by resilient operating cash flows and steady balance sheet cleaning. Sell-side caution centers on competitive commoditization and capital allocations towards non-core R&D.`
    },
    financials: {
      revenue: `$${((absHash % 150) + 10).toFixed(2)}B (YoY +${(3 + (absHash % 12)).toFixed(1)}%)`,
      profitability: `Operating Margin ${(12 + (absHash % 15)).toFixed(1)}%, Net Margin ${(8 + (absHash % 10)).toFixed(1)}%`,
      debt: `Leverage Ratio (D/E) of ${(0.2 + (absHash % 12) * 0.1).toFixed(2)}x, covered extensively by core receivables`
    },
    competitors: [
      {
        name: "Enterprise Benchmark A",
        revenue: `$${((absHash % 180) + 20).toFixed(2)}B`,
        profitability: `Operating Margin 15.2%`,
        risk: "Slight market share consolidation issues",
        growth: "YoY +5.4%",
        advantages: ["High scale cost efficiency", "Wider logistics distribution moat"]
      },
      {
        name: "Inorganic Competitor B",
        revenue: `$${((absHash % 90) + 5).toFixed(2)}B`,
        profitability: `Operating Margin 8.8%`,
        risk: "Vulnerable to specialized premium products",
        growth: "YoY +12.0%",
        advantages: ["Niche customer segments target retention", "High speed execution framework"]
      }
    ],
    economicImpact: {
      inflation: parseFloat((-1.5 - (absHash % 5) * 0.8).toFixed(1)),
      interestRate: parseFloat((-2.0 - (absHash % 6) * 1.1).toFixed(1)),
      currency: parseFloat((-0.5 - (absHash % 4) * 0.9).toFixed(1)),
      oil: parseFloat((-1.0 + ((absHash >> 2) % 6) * 1.5).toFixed(1)),
      gdp: parseFloat((4.5 + (absHash % 6) * 1.2).toFixed(1))
    },
    economicImpactExplanations: {
      inflation: "Rising wage and material prices raise operations costs; partial cost-transfer capabilities limits margins drops.",
      interestRate: "Higher cost of capital triggers downward multiple compression and tightens capital budgeting margins.",
      currency: "Domestic production assets offset mild currency swings, but overseas client acquisition slows during FX volatility.",
      oil: "Indirect impact through shipping costs and utility expenses, fully hedged through structural purchase contracts.",
      gdp: "Directly synchronized with sector health; industrial index rebounds fuel wider technology and equipment contract wins."
    },
    keyTakeaways: [
      `Maintains solid competitive resilience across its core footprint under standard corporate assessments.`,
      `Stable liquidity buffer enables steady pivot towards cloud-native system integrations.`,
      `Requires consistent structural efficiency improvements to preserve long-term profitability multiples.`
    ],
    note: "Using FinSight Client-Side Emulation Engine due to static deployment/Vercel network limitations."
  };
}

// Client-side smart Chat bot responses matching server.ts exactly
export function getChatFallback(latestUserMsg: string, companyContext: any): string {
  let answer = "";
  const cleanMsg = latestUserMsg.toLowerCase();
  
  const companyName = companyContext?.companyName || "Tesla Inc.";
  const ticker = companyContext?.ticker || "TSLA";
  const score = companyContext?.investmentScore || 74;

  if (cleanMsg.includes('should i invest') || cleanMsg.includes('attractive') || cleanMsg.includes('buy or sell')) {
    answer = `### Investment Suitability Diagnostic for **${companyName} (${ticker})**

Based on our FinSight Intelligence Score of **${score}/100**, here is our tactical suitability assessment:

1. **Strategic Thesis:** ${companyContext?.summary || 'The company holds a strong position, but is exposed to cyclical trends and margin pressures.'}
2. **Key Strengths:**
   * **Moat Rating:** High competitive resilience scoring **${companyContext?.scores?.competitiveStrength || 80}/100**.
   * **Financial Pillar:** Liquidity and sheet health score of **${companyContext?.scores?.financialHealth || 85}/100**.
3. **Allocation Verdict:**
   * **For Aggressive Growth Allocators:** Suitable for a core tech satellite allocation (up to 3.5% weight).
   * **For Value/Dividend Allocators:** Recommend holding off or seeking defensive alternatives until valuations compress further.

*Would you like me to detail its biggest risk metrics or compare it directly against its competitors?*`;
  } else if (cleanMsg.includes('risk') || cleanMsg.includes('danger') || cleanMsg.includes('threat')) {
    answer = `### Primary Risk Exposure & Red Flags for **${companyName} (${ticker})**

Our system rates the structural risk of ${companyName} at **${companyContext?.scores?.risk || 35}/100** (where lower represents a safer asset). 

**Critical Vulnerability Factors to Monitor:**
*   **Competitor Threat Vectors:** Market saturation and price competitive actions could restrict pricing expansion.
*   **Macro Economic Headwind:** Sensitivity of -${companyContext?.economicImpact?.interestRate || '4.5'}% to interest rate cycles increases cost variables on corporate debt.
*   **Key Execution Risks:** ${companyContext?.keyTakeaways?.[2] || 'High reliance on product refresh cycle success and continuous operational cash flow optimization.'}

*We advise maintaining a tight trailing stop-loss or implementing protective options collars if trading short-term.*`;
  } else if (cleanMsg.includes('inflation') || cleanMsg.includes('interest rate') || cleanMsg.includes('macro') || cleanMsg.includes('economy')) {
    answer = `### Macro-Economic Sensitivity Audit: **${companyName} (${ticker})**

Here is how key macroeconomic shifts impact ${companyName}'s operational performance:

*   **Inflation Surge (+2.0%):** Projected impact of **${companyContext?.economicImpact?.inflation || -3.0}%**. ${companyContext?.economicImpactExplanations?.inflation || 'Rising raw components and logistics fees squeeze direct product margins.'}
*   **Interest Rate Hike (+1.5%):** Projected impact of **${companyContext?.economicImpact?.interestRate || -2.5}%**. ${companyContext?.economicImpactExplanations?.interestRate || 'Increases borrowing costs and dampens consumer access to finance.'}
*   **GDP Contraction (-1.0%):** Projected impact of **-${companyContext?.economicImpact?.gdp || 5.0}%**. Corporate capital deployment cycles tighten immediately.

*Would you like to simulate other custom macro parameters like oil price shock or FX headwinds?*`;
  } else {
    answer = `### FinSight Copilot Response: **${companyName} (${ticker})**

Thank you for your question on **${companyName}**. 

*   **Financial Summary:** ${companyContext?.summary || 'Stable market positioning with favorable risk-adjusted scores.'}
*   **Earnings Power:** Revenue of ${companyContext?.financials?.revenue || 'resilient'} paired with solid margins.
*   **Strategic Stance:** Rated **${score}/100** overall inside our AI Analyzer.

Please feel free to ask questions like:
1. *"What are the key risk factors for ${ticker}?"*
2. *"Is ${ticker} a buy at current valuation scores?"*
3. *"How does interest rate hikes affect their balance sheet?"*`;
  }

  answer += `\n\n*(Note: Running on FinSight Client-Side Emulation due to Vercel/Static server limitations).*`;
  return answer;
}

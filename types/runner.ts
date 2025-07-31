export interface Runner {
    name: string;
    engagement: {
      score: number;
      status: 'positive' | 'negative';
    };
    mentions: string[];
    tiktokVideos: number;
    hashtagReach: string;
    tokensGenerated?: number;
  }

  // types.ts

export interface RunnerFilters {
  engagement_score: number;
  min_followers: number;
  min_market_cap: number;
  max_market_cap?: number | string; // optional if user leaves it empty
  buy_ratio: number;
  sell_ratio: number;
  minimum_holders: number;
  account_age: number;
  startDate: string; // e.g., '2025-06-01'
  endDate: string;   // e.g., '2025-06-28'
  liquidity_locked: number;
}


export interface RunnerReport {
  tiktokVideos: number;
  tokenAddress: string;
  tokenName: string;
  liquidityLocked: number;
  marketCap: number;
  tokenHolder: number | null;
  buynsellRatio: number;
  rugCheck: string;
  mentions: string;
  currentPrice: number;
  volume24h: number;
  engagementScore: number;
  hashtagReach: string;
  tweetId: string;
}

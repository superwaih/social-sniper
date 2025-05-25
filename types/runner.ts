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
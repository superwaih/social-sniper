export type Token = {
  tokenAddress: string;
  tokenName: string;
  liquidityLocked: number;
  marketCap: number;
  tokenHolder: number | null;
  buynsellRatio: number | null;
  rugCheck: string;
  mentions: string;
  currentPrice: number;
};

export interface AutoBuyTarget {
  _id: string;
  userId: string;
  twitterUsername: string;
  mentionHour: number;
  followers: string;
  lastActivity: number;
  autoBuy: boolean;
  buyAmount: number;
  stopLoss: number;
  takeProfit: number;
  status: "active" | "inactive" | string;
  createdAt: string;
  __v: number;
}

export interface ITargetTableProps {
  data: AutoBuyTarget[];
  isLoading: boolean;
}

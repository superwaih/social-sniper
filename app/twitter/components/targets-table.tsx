"use client";

import { EllipsisVertical } from "lucide-react";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
import { DataTable } from "@/components/shared/data-table";
import StatusIndicator from "@/components/shared/status-indicator";

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
  followers: string; // you may want to change this to number if it’s always numeric
  lastActivity: number;
  autoBuy: boolean;
  buyAmount: number;
  stopLoss: number;
  takeProfit: number;
  status: 'active' | 'inactive' | string; // adjust as needed based on your enum values
  createdAt: string; // or `Date` if you parse it
  __v: number;
}
interface ITargetTableProps {
  data: AutoBuyTarget[];
  isLoading: boolean;
}

export default function TargetsTable({ data, isLoading }: ITargetTableProps) {
 
  const columns = [
    {
      header: "ACCOUNT",
      accessor: (token: AutoBuyTarget) => (
        <span className="font-semibold  text-white">{token.twitterUsername}</span>
      ),
      className: "text-white font-pixel",
    },
    {
      header: "MENTIONS 24H",
      accessor: (token: AutoBuyTarget) => (
        <span className="text-white">{token.mentionHour}</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "FOLLOWERS",
      accessor: (token: AutoBuyTarget) => (
        <span className="text-white">${token.followers}</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "LAST ACTIVITY",
      accessor: (token: AutoBuyTarget) => (
        <span className="text-white">
          {token.lastActivity}
        </span>
      ),
      className: "text-white font-grok" ,
    },
    {
      header: "AUTO BUY",
      accessor: (token: AutoBuyTarget) => (
        <span className="text-white">{token.autoBuy ?  "✅ ON" : "❌ OFF" }</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "STATUS",
      accessor: (token: AutoBuyTarget) => (
        <StatusIndicator status={token.status === "active" ?  "Active" : "Idle"} />
      ),
      className: "text-white",
    },
    {
      header: "▼",
      accessor: () => (
        <div className="border-[#779CBF6B] border rounded-[4px] p-2 flex justify-center">
          <EllipsisVertical className="size-3" />
        </div>
      ),
      className: "text-white text-center",
    },
  ];

  return (
    <div className="">
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyText="No target account yet! Add new target"
        onRowClick={(token) => {
          // setSelectedToken(token);
          // setIsModalOpen(true);
          console.log(token)
        }}
      />
      {/* <TokenDetail open={isModalOpen} setOpen={setIsModalOpen} data={selectedToken} /> */}
    </div>
  );
}

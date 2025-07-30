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

interface ITargetTableProps {
  data: Token[];
  isLoading: boolean;
}

export default function TargetsTable({ data, isLoading }: ITargetTableProps) {
  // const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: "TOKEN NAME",
      accessor: (token: Token) => (
        <span className="font-semibold  text-white">{token.tokenName}</span>
      ),
      className: "text-white font-pixel",
    },
    {
      header: "PRICE",
      accessor: (token: Token) => (
        <span className="text-white">${token.currentPrice.toFixed(6)}</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "MARKET CAP",
      accessor: (token: Token) => (
        <span className="text-white">${token.marketCap.toLocaleString()}</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "LIQUIDITY",
      accessor: (token: Token) => (
        <span className="text-white">
          ${token.liquidityLocked.toLocaleString()}
        </span>
      ),
      className: "text-white font-grok" ,
    },
    {
      header: "HOLDERS",
      accessor: (token: Token) => (
        <span className="text-white">{token.tokenHolder ?? "N/A"}</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "STATUS",
      accessor: (token: Token) => (
        <StatusIndicator status={token.currentPrice > 0 ? "Active" : "Idle"} />
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

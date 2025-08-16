// Runner.tsx
"use client"
import React, { useState } from "react";
import { Icons } from "@/components/shared/icons";
import RunnerTable from "./components/runner-table";
import TokenFilterSheet from "../components/sheets/token-filter-sheet";
import { useGetRunners } from "@/service/runner";
import { useWallet } from "@solana/wallet-adapter-react";
import { RunnerFilters } from "@/types/runner";

const defaultFilters: RunnerFilters = {
  engagement_score: 0,
  min_followers: 100,
  min_market_cap: 100,
  max_market_cap: "",
  buy_ratio: 10,
  sell_ratio: 10,
  minimum_holders: 30,
  account_age: 1,
  startDate: "2025-01-01",
  endDate: "2025-12-31",
  liquidity_locked: 0,
};

const Runner = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<RunnerFilters>(defaultFilters);
  const { publicKey } = useWallet();

  const { data, isLoading } = useGetRunners(publicKey?.toBase58(), filters);
console.log(data, 'data')
  return (
    <section className="flex flex-col space-y-4">
      <h2 className="text-[40.41px] -leading-[1%] text-[#FFFFFFBF]">RUNNER REPORTS</h2>

      <div className="bg-[#091820] p-[14px] flex justify-between items-center">
        <p className="flex gap-2 text-[#FFFFFF94] items-center">
          <span className="text-lg">NEW RUNNERS</span>
          <Icons.refresh className="text-[#FFFFFF94]" />
        </p>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowFilters(true)}
            className="border-[#779CBF6B] flex gap-3 items-center border p-3 rounded-[4px]"
        >
            <Icons.filterIcon className="text-[#FFFFFF8A] text-sm" />
            <p className="text-[#FFFFFF8A] text-sm">RUNNER FILTERS</p>
          </button>
        </div>
      </div>

      <RunnerTable isLoading={isLoading} data={data?.result ?? []} />

      <TokenFilterSheet
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </section>
  );
};

export default Runner;

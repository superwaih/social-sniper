// Runner.tsx
"use client"
import React, { useState, useEffect } from "react";
import { Icons } from "@/components/shared/icons";
import RunnerTable from "./components/runner-table";
import TokenFilterSheet from "../components/sheets/token-filter-sheet";
import { useGetRunners } from "@/service/runner";
import { useWallet } from "@solana/wallet-adapter-react";
import { RunnerFilters } from "@/types/runner";

const defaultFilters: RunnerFilters = {
  engagement_score: 0,
  min_followers: 1404,
  min_market_cap: 1000,
  max_market_cap: "",
  buy_ratio: 45,
  sell_ratio: 100,
  minimum_holders: 300,
  account_age: 2,
  startDate: "2025-06-01",
  endDate: "2025-08-28",
  liquidity_locked: 0,
};


const blueChipFilters: Partial<RunnerFilters> = {
    engagement_score: 0,
  min_followers: 1404,
  min_market_cap: 1000,
  max_market_cap: "",
  buy_ratio: 45,
  sell_ratio: 100,
  minimum_holders: 300,
  account_age: 2,
  startDate: "2025-06-01",
  endDate: "2025-08-28",
  liquidity_locked: 0,
};

const degenFilters: Partial<RunnerFilters> = {
  engagement_score: 65,
  min_followers: 10000,
  min_market_cap: 250000,
  max_market_cap: "1000000",
  buy_ratio: 45,
  sell_ratio: 100,
  minimum_holders: 2500,
  account_age: 2,
  startDate: "2025-06-01",
  endDate: "2025-08-28",
  liquidity_locked: 25000,
};

const nanocapGambleFilters: Partial<RunnerFilters> = {
  engagement_score: 30,
  min_followers: 0,
  min_market_cap: 25000,
  max_market_cap: "250000",
  buy_ratio: 40,
  sell_ratio: 100,
  minimum_holders: 500,
  account_age: 2,
  startDate: "2025-06-01",
  endDate: "2025-08-28",
  liquidity_locked: 15000,
};

const FILTER_PRESETS: Record<string, Partial<RunnerFilters>> = {
  default: defaultFilters,
  "blue-chip": blueChipFilters,
  "degen-play": degenFilters,
  "nanocap-gamble": nanocapGambleFilters,
};

const Runner = () => {
  const [showFilters, setShowFilters] = useState(false);
  // selected preset key controls which preset is currently active on the page.
  // Change this initial value to pick a different preset on load (e.g. "blue-chip").
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof FILTER_PRESETS>(
    "default"
  );

  const [filters, setFilters] = useState<RunnerFilters>(() => {
    // merge with defaultFilters to ensure all required fields exist
    return { ...(defaultFilters as RunnerFilters), ...(FILTER_PRESETS["default"] as Partial<RunnerFilters>) } as RunnerFilters;
  });

  // update filters whenever the selected preset changes
  useEffect(() => {
    setFilters({ ...(defaultFilters as RunnerFilters), ...(FILTER_PRESETS[selectedPreset] as Partial<RunnerFilters>) } as RunnerFilters);
  }, [selectedPreset]);
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
  onPresetSelect={(key: keyof typeof FILTER_PRESETS) => setSelectedPreset(key)}
      />
    </section>
  );
};

export default Runner;

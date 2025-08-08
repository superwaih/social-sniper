// TokenFilterSheet.tsx
"use client";

import { useState } from "react";
import { CustomFilterSection } from "@/components/filters/token-filter/custom-filter";
import { FilterSection } from "@/components/filters/token-filter/custom-filters-components/filter-options";
import { MarketDetailsSection } from "@/components/filters/token-filter/custom-filters-components/market-detail-filter";
import { MemePlaySection } from "@/components/filters/token-filter/custom-filters-components/meme-play";
import { PresetOptionsSection } from "@/components/filters/token-filter/custom-filters-components/preset-options";
import { FilterMeaningSection } from "@/components/filters/token-filter/filter-meaning";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { RunnerFilters } from "@/types/runner";

const presets: Record<string, Partial<RunnerFilters>> = {
  "blue-chip": {
    engagement_score: 80,
    min_followers: 100000, // 100K+ followers
    min_market_cap: 1000000, // $1M+
    max_market_cap: "",
    buy_ratio: 55, // 55%+ buys
    sell_ratio: 100,
    minimum_holders: 10000, // Minimum 10,000 holders
    account_age: 7, // 7+ days trending
    startDate: "2025-06-01",
    endDate: "2025-08-28",
    liquidity_locked: 50000, // $50K+
  },
  "degen-play": {
    engagement_score: 65,
    min_followers: 100000, // 100K+ followers (at least 1 verified)
    min_market_cap: 250000, // $250K
    max_market_cap: "1000000", // - $1M
    buy_ratio: 45, // 45%+ buys
    sell_ratio: 100,
    minimum_holders: 2500, // Minimum 2,500 holders
    account_age: 2, // 2-7 days trending
    startDate: "2025-06-01",
    endDate: "2025-08-28",
    liquidity_locked: 25000, // $25K+
  },
  "nanocap-gamble": {
    engagement_score: 50,
    min_followers: 0, // Not required
    min_market_cap: 25000, // $25K
    max_market_cap: "250000", // - $250K
    buy_ratio: 40, // 40%+ buys
    sell_ratio: 100,
    minimum_holders: 500, // Minimum 500 holders
    account_age: 0, // 0-2 days trending
    startDate: "2025-06-01",
    endDate: "2025-08-28",
    liquidity_locked: 15000, // $15K+
  },
};
interface TokenFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: RunnerFilters;
  onFiltersChange: (filters: RunnerFilters) => void;
}

export default function TokenFilterSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
}: TokenFilterSheetProps) {
  const [currentTab, setCurrentTab] = useState("preset");
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof presets | null>("blue-chip");
  
  const handlePresetSelect = (presetKey: keyof typeof presets) => {
    setSelectedPreset(presetKey);
    const newFilters = { ...filters, ...presets[presetKey] };
    onFiltersChange(newFilters);
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal>
      <SheetTitle />
      <SheetContent
        style={{ width: "648px", background: "#05121a" }}
        side="right"
        className="text-white gap-6 py-12 px-11 bg-[#05121a]  border-2 border-solid border-transparent"
      >
        <section className="flex flex-col space-y-5 overflow-y-scroll no-scrollbar w-full relative z-20">
          {/* Radial Gradient */}
          <div className="absolute top-[-235px] left-[43px] opacity-[0.11] w-[546px] h-[546px] rounded-full z-[-1] bg-gradient-to-r from-orange-500/80 to-transparent pointer-events-none" />
          <div className="absolute top-[463px] -left-40 opacity-[0.13] w-[546px] h-[546px] rounded-full z-[-1] bg-gradient-to-r from-orange-500/80 to-transparent pointer-events-none" />

          <MemePlaySection currentTab={currentTab} setCurrentTab={setCurrentTab} />

          {currentTab === "preset" && (
            <div>
              <MarketDetailsSection 
                isSelected={selectedPreset === "blue-chip"}
                onSelect={() => handlePresetSelect("blue-chip")}
              
              />
              <PresetOptionsSection 
                              isSelected={selectedPreset === "degen-play"}
                onSelect={() => handlePresetSelect("degen-play")}

              
              />
              <FilterSection 
                isSelected={selectedPreset === "nanocap-gamble"}
                onSelect={() => {
                  console.log('clicked')
                  handlePresetSelect("nanocap-gamble")
                }}
              />
            </div>
          )}

          {currentTab === "custom-filter" && (
            <CustomFilterSection  />
          )}

          {currentTab === "filter-meaning" && (
            <FilterMeaningSection />
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
}

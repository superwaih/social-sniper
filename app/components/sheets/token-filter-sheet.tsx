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
    min_followers: 10000, // 100K+ followers
    min_market_cap: 1000000, // $1M+
    max_market_cap: "",
    buy_ratio: 55, // 55%+ buys
    sell_ratio: 100,
    minimum_holders: 10000, // Minimum 10,000 holders
    account_age: 2, 
    startDate: "2025-06-01",
    endDate: "2025-08-28",
    liquidity_locked: 50000, // $50K+
  },
  "degen-play": {
    engagement_score: 65,
    min_followers: 10000, 
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
    engagement_score: 30,
    min_followers: 0, 
    min_market_cap: 25000, // $25K
    max_market_cap: "250000", // - $250K
    buy_ratio: 40, // 40%+ buys
    sell_ratio: 100,
    minimum_holders: 500, 
    account_age: 2, 
    startDate: "2025-06-01",
    endDate: "2025-08-28",
    liquidity_locked: 15000, 
  },
};
interface TokenFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: RunnerFilters;
  onFiltersChange: (filters: RunnerFilters) => void;
  // optional callback to inform a parent which preset key was selected
  onPresetSelect?: (presetKey: keyof typeof presets | string) => void;
}

export default function TokenFilterSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onPresetSelect,
}: TokenFilterSheetProps) {
  const [currentTab, setCurrentTab] = useState("preset");
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof presets | null>("blue-chip");
  
  const handlePresetSelect = (presetKey: keyof typeof presets) => {
    setSelectedPreset(presetKey);
    const newFilters = { ...filters, ...presets[presetKey] };
    onFiltersChange(newFilters);
    if (typeof onPresetSelect === "function") {
      onPresetSelect(presetKey);
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal>
      <SheetTitle />
      <SheetContent
      style={{
          width: "540px",
          border: "1px solid",
          borderImageSource:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(153, 153, 153, 0.08) 100%)",
          borderImageSlice: 1,
          background:  "#05121A",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        side="right"
  className="text-white bg-[#05121a] m border-2 border-solid border-transparent flex h-full flex-col"
      >
        <div
              className="w-[648px] h-[648px] top-[-349px] right-[-200px] rounded-[324px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-30"
            />
            <div
              className="w-[648px] h-[648px] bottom-[-349px] left-[-200px] rounded-[324px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-30"
            />
          
  <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-6">
  <section className="flex flex-col space-y-5 w-full relative z-20">
       
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
            <CustomFilterSection 
              setFilters={(updatedValues: Record<string, unknown>) => {
                // Only update keys present in updatedValues
                const newFilters = { ...filters };
                Object.keys(updatedValues).forEach((key) => {
                  // Only update if the key exists in newFilters
                  if (key in newFilters) {
                    (newFilters as Record<string, unknown>)[key] = updatedValues[key];
                  }
                });
                onFiltersChange(newFilters);
              }}
            />
          )}

          {currentTab === "filter-meaning" && (
            <FilterMeaningSection />
          )}
  </section>
  </div>
      </SheetContent>
    </Sheet>
  );
}

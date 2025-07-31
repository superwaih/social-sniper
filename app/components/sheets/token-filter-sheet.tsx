// TokenFilterSheet.tsx
"use client";

import { useState } from "react";
import { CustomFilterSection } from "@/components/filters/token-filter/custom-filter";
import { FilterSection } from "@/components/filters/token-filter/custom-filters-components/filter-options";
import { MarketDetailsSection } from "@/components/filters/token-filter/custom-filters-components/market-detail-filter";
import { MemePlaySection } from "@/components/filters/token-filter/custom-filters-components/meme-play";
import { PresetOptionsSection } from "@/components/filters/token-filter/custom-filters-components/preset-options";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { RunnerFilters } from "@/types/runner";

const presets: Record<string, Partial<RunnerFilters>> = {
  "blue-chip": {
   engagement_score: 0,
  min_followers: 1404,
  min_market_cap: 1000,
  max_market_cap: "",
  buy_ratio: 45,
  sell_ratio: 100,
  minimum_holders: 300,
  account_age: 2,
  startDate: "2025-06-01",
  endDate: "2025-06-28",
  liquidity_locked: 0,
  },
  "degenerate": {
    engagement_score: 0,
  min_followers: 1404,
  min_market_cap: 1000,
  max_market_cap: "",
  buy_ratio: 45,
  sell_ratio: 100,
  minimum_holders: 300,
  account_age: 2,
  startDate: "2025-06-01",
  endDate: "2025-06-28",
  liquidity_locked: 0,
  },
  "nanocap": {
    engagement_score: 0,
  min_followers: 1404,
  min_market_cap: 1000,
  max_market_cap: "",
  buy_ratio: 45,
  sell_ratio: 100,
  minimum_holders: 300,
  account_age: 2,
  startDate: "2025-06-01",
  endDate: "2025-06-28",
  liquidity_locked: 0,
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
        className="text-white gap-6 py-12 px-11 bg-[#05121a] overflow-hidden border-2 border-solid border-transparent"
      >
        <section className="flex flex-col space-y-5 w-full relative z-10">
          {/* Radial Gradient */}
          <div className="absolute top-[-235px] left-[43px] opacity-[0.11] w-[546px] h-[546px] rounded-full z-0 bg-gradient-to-r from-orange-500/80 to-transparent" />
          <div className="absolute top-[463px] -left-40 opacity-[0.13] w-[546px] h-[546px] rounded-full z-0 bg-gradient-to-r from-orange-500/80 to-transparent" />

          <MemePlaySection currentTab={currentTab} setCurrentTab={setCurrentTab} />

          {currentTab === "preset" && (
            <div>
              <MarketDetailsSection 
                isSelected={selectedPreset === "blue-chip"}
                onSelect={() => handlePresetSelect("blue-chip")}
              
              />
              <PresetOptionsSection 
                              isSelected={selectedPreset === "degenerate"}
                onSelect={() => handlePresetSelect("degenerate")}

              
              />
              <FilterSection 
                              isSelected={selectedPreset === "nanocap"}
                onSelect={() => handlePresetSelect("nanocap")}
              />
            </div>
          )}

          {currentTab === "custom-filter" && (
            <CustomFilterSection  />
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
}

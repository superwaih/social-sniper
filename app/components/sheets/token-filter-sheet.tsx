"use client";

import { CustomFilterSection } from "@/components/filters/token-filter/custom-filter";
import { FilterSection } from "@/components/filters/token-filter/custom-filters-components/filter-options";
import { MarketDetailsSection } from "@/components/filters/token-filter/custom-filters-components/market-detail-filter";
import { MemePlaySection } from "@/components/filters/token-filter/custom-filters-components/meme-play";
import { PresetOptionsSection } from "@/components/filters/token-filter/custom-filters-components/preset-options";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

export default function TokenFilterSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentTab, setCurrentTab] = useState("preset");
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal>
      <SheetTitle></SheetTitle>
      <SheetContent
        style={{
          width: "648px",
          //   border: "1px solid",
          background: "#05121a",
        }}
        side="right"
        className="text-white gap-6 py-12 px-11  bg-[#05121a] overflow-hidden border-2 border-solid border-transparent"
      >
        <section className="flex flex-col space-y-5 w-full relative  z-10">
          {/*Overlaid Gradient  */}
          <div className="absolute top-[-235px] left-[43px] opacity-[0.11] w-[546px] h-[546px] rounded-full z-0 [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)]" />
          <div className="absolute top-[463px] -left-40 opacity-[0.13] w-[546px] h-[546px] rounded-full z-0 [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)]" />
          <MemePlaySection
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          {currentTab === "preset" && (
            <div>
              <MarketDetailsSection />
              <PresetOptionsSection />
              <FilterSection />
            </div>
          )}
          {currentTab === "custom-filter" && <CustomFilterSection />}
        </section>
      </SheetContent>
    </Sheet>
  );
}

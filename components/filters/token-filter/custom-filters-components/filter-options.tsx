import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon } from "lucide-react";
import React from "react";

export const FilterSection = ({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) => {
  // Filter criteria data for mapping
  const filterCriteria = [
    "LIQUIDITY LOCKED: $15K+",
    "MARKET CAP: $25K - $250K",
    "ENGAGEMENT SCORE: 50+/100",
    "BIG ACCOUNTS MENTIONED: NOT REQUIRED (BUT WILL HIGHLIGHT IF ANY EXIST)",
    "BUY/SELL RATIO: 40%+ BUYS",
    "TREND MATURITY: ULTRA-EARLY (0-2 DAYS TRENDING)",
    "MINIMUM 500 HOLDERS",
  ];

  return (
    <section className="flex flex-col w-full items-start gap-[18px] pt-[13px] pb-[23px] border-b border-[#ffffff36] relative z-10">
      <div className="flex flex-col items-start gap-2">
        <div 
          className="inline-flex items-center gap-2 cursor-pointer relative z-20" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Nanocap clicked');
            onSelect();
          }}
        >
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            id="nanocap-gamble"
            className="w-5 h-5 rounded-[5.34px] border-[1.5px] border-[#ffffff96] relative z-30"
          />
          <label
            htmlFor="nanocap-gamble"
            className="w-fit mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] font-normal text-white text-lg cursor-pointer relative z-30"
          >
            NANOCAP GAMBLE
          </label>
        </div>

        <p className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[#838383] text-sm tracking-[-0.14px]">
          FOR TRADERS HUNTING TINY-CAP PLAYS WITH POTENTIAL MOONSHOTS
        </p>
      </div>

      <div className="flex flex-col items-start gap-[6.31px] w-full">
        {filterCriteria.map((criterion, index) => (
          <div key={index} className="flex items-center gap-[12.62px] w-full">
            <div className="relative w-[17.12px] h-[17.12px] bg-[#ffffff33] rounded-[8.56px] flex items-center justify-center">
              <CheckIcon className="w-[9px] h-1.5 text-white" />
            </div>
            <span className="[font-family:'Space_Grotesk',Helvetica] text-xs font-normal text-[#838383]">
              {criterion}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

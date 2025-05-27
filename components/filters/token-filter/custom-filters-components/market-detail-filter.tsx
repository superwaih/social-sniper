import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon } from "lucide-react";
import React from "react";

export const MarketDetailsSection = () => {
  // Market details data for mapping
  const marketCriteria = [
    { id: 1, text: "Liquidity locked: $50K*" },
    { id: 2, text: "Market cap: $1M+" },
    { id: 3, text: "Engagement score: 80+/100" },
    {
      id: 4,
      text: "Big accounts mentioned: At least 2 verified / 100K+ followers",
    },
    { id: 5, text: "Buy/sell ratio: 55%+ buys" },
    { id: 6, text: "Trend maturity: Established (<7 days trending)" },
    { id: 7, text: "Minimum 10,000 holders" },
  ];

  return (
    <div className="flex flex-col w-full items-start gap-[18px] pt-[13px] pb-[23px] px-0 border-b border-[#ffffff36]">
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-2">
          <Checkbox className="w-5 h-5 rounded-[5.34px] border-[1.5px] border-[#ffffff96]" />
          <div className="[font-family:'Space_Grotesk',Helvetica] font-normal text-white text-lg">
            BLUE-CHIP
          </div>
        </div>

        <div className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[#838383] text-sm tracking-[-0.14px]">
          For traders who want high confidence meme plays
        </div>
      </div>

      <div className="flex flex-col items-start gap-[6.31px] w-full">
        {marketCriteria.map((criterion) => (
          <div
            key={criterion.id}
            className="flex items-center gap-[12.62px] w-full"
          >
            <div className="relative w-[17.12px] h-[17.12px] bg-[#ffffff33] rounded-[8.56px] flex items-center justify-center">
              <CheckIcon className="w-[9px] h-1.5 text-white" />
            </div>
            <div className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[#838383] text-xs">
              {criterion.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

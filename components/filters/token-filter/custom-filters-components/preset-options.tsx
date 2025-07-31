import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon } from "lucide-react";
import React from "react";

export const PresetOptionsSection = ({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) => {
  // Data for the criteria list
  const criteriaList = [
    "Liquidity locked: $30K*",
    "Market cap: $10k+",
    "Engagement score: 50+/100",
    "Big accounts mentioned: At least 2 verified / 100K+ followers",
    "Buy/sell ratio: 10%+ buys",
    "Trend maturity: Established (<7 days trending)",
    "Minimum 1,000 holders",
  ];

  return (
    <section className="flex flex-col w-full items-start gap-[18px] pt-[13px] pb-[23px] border-b border-[#ffffff36]">
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-2">
          <Checkbox
            id="degen-play"
            checked={isSelected}
            onCheckedChange={onSelect}

            className="w-5 h-5 rounded-[5.34px] border-[1.5px] border-[#ffffff96]"
          />
          <label
            htmlFor="degen-play"
            className="font-['Space_Grotesk',Helvetica] font-normal text-white text-lg"
          >
            DEGEN PLAY
          </label>
        </div>

        <p className="font-['Space_Grotesk',Helvetica] font-normal text-[#838383] text-sm tracking-[-0.14px]">
          For traders who want high confidence meme plays
        </p>
      </div>

      <ul className="flex flex-col items-start gap-[6.31px] w-full">
        {criteriaList.map((criterion, index) => (
          <li key={index} className="flex items-center gap-[12.62px] w-full">
            <div className="relative w-[17.12px] h-[17.12px] bg-[#ffffff33] rounded-[8.56px] flex items-center justify-center">
              <CheckIcon className="w-[9px] h-1.5 text-white" />
            </div>
            <span className="font-['Space_Grotesk',Helvetica] text-xs font-normal text-[#838383]">
              {criterion}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

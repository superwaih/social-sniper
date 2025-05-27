import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";



const sliderSections = [
  { id: 1, title: "ENGAGEMENT SCORE", value: 275, max: 493 },
  { id: 2, title: "BIG ACCOUNTS MENTIONED", value: 121, max: 493 },
  { id: 3, title: "FOLLOWERS COUNT OF BIG ACCOUNTS", value: 416, max: 493 },
  { id: 4, title: "HASHTAG REACH", value: 272, max: 493 },
  { id: 5, title: "HASHTAG REACH", value: 102, max: 493 },
];

export const CustomFilterSection = () => {
  const [sliderValues, setSliderValues] = useState(
    sliderSections.map((section) => [section.value])
  );

  const handleSliderChange = (index: number, newValue: number[]) => {
    const updatedValues = [...sliderValues];
    updatedValues[index] = newValue;
    setSliderValues(updatedValues);
  };

  return (
    <section>
      {sliderSections.map((section, index) => (
        <div
          key={section.id}
          className="flex flex-col w-[536px] items-start gap-[7px] pt-7 pb-[17px] px-0 relative flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#ffffff2e]"
        >
          <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center gap-[11px] relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Space_Grotesk',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal]">
                {section.title}
              </div>
            </div>

            <div className="flex flex-col items-start justify-end gap-[5.41px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex h-[44.83px] items-center px-[10.05px] py-[8.5px] relative self-stretch w-full rounded-md border-[0.77px] border-solid border-[#ffffff26]">
                <Slider
                  value={sliderValues[index]}
                  onValueChange={(newValue) =>
                    handleSliderChange(index, newValue)
                  }
                  max={section.max}
                  min={0}
                  step={1}
                  className="w-full bg-[#202c33] text-[#ff4c02]"
                  style={{ height: "7px" }}
                />
              </div>

              <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative w-fit mt-[-0.77px] [font-family:'DM_Mono',Helvetica] font-normal text-[#838383] text-[10.8px] tracking-[0] leading-[normal]">
                  MIN
                </div>
                <div className="relative w-fit mt-[-0.77px] [font-family:'DM_Mono',Helvetica] font-normal text-[#838383] text-[10.8px] tracking-[0] leading-[normal]">
                  MAX
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

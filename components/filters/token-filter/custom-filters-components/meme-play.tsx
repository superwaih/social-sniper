import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
interface IMemePlay {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}
const filterOptions = [
  {
    id: "preset",
    label: "PRESET",
    icon: Icons.presetFilter,
    
  },
  {
    id: "custom-filter",
    label: "CUSTOM FILTER",
    icon: Icons.customfilter,
  },
  {
    id: "filter-meaning",
    label: "FILTER MEANING",
    icon: Icons.meaning,
  },
];

export const MemePlaySection = ({currentTab, setCurrentTab}: IMemePlay) => {
  console.log("currentTab", currentTab);
  return (
    <nav className="flex z-50 items-center justify-between w-full">
      <div className="flex items-center gap-[22px]">
        {filterOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            onClick={() => {
              console.log("Clicked", option.id);
              setCurrentTab(option.id);
            }}
            className={`h-[38px] px-[15px] py-[17px] cursor-pointer rounded-md flex items-center justify-center gap-2 
              ${
                currentTab === option.id
                  ? "border-[#ff4c02] bg-gradient-to-r from-[rgba(255,76,2,0.5)] to-[rgba(35,20,15,0.67)]"
                  : "border-[#779cbf6b] bg-transparent"
              }`}
          >
            <option.icon className="w-[24px] h-[24px] text-[#ffffff8a]" />
            <span className="font-['Space_Grotesk',Helvetica] font-normal text-[#ffffff8a] text-[12.7px]">
              {option.label}
            </span>
          </Button>
        ))}
      </div>

      <Button variant="ghost" size="icon" className="w-6 h-6 p-0">
        <Icons.refresh className="w-[24px] h-[24px]" />
      </Button>
    </nav>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Icons } from "@/components/shared/icons"

const filterSections = [
  {
    id: "meme-social",
    title: "MEME & SOCIAL ANALYSIS FILTERS",
    isOpen: true,
    filters: [
      {
        id: "engagement",
        title: "ENGAGEMENT SCORE",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "big-accounts",
        title: "BIG ACCOUNTS MENTIONED",
        type: "slider",
        value: [100],
        max: 1200,
        hasIndicator: true,
      },
      {
        id: "follower-count",
        title: "FOLLOWER COUNT OF BIG ACCOUNTS",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "social-mentions",
        title: "SOCIAL MENTIONS IN LAST 24H",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "hashtag-reach",
        title: "HASHTAG REACH",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "trend-maturity",
        title: "TREND MATURITY",
        type: "dropdown",
        value: "0-2 DAYS",
        hasIndicator: true,
      },
    ],
  },
  {
    id: "contract-liquidity",
    title: "CONTRACT & LIQUIDITY ANALYSIS",
    isOpen: false,
    filters: [
      {
        id: "market-cap",
        title: "MARKET CAP RANGE",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "liquidity-locked",
        title: "LIQUIDITY LOCKED MINIMUM",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "buy-sell-ratio",
        title: "BUY/SELL RATIO (BUYS %)",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "whale-control",
        title: "WHALE CONTROL (MAX % ANY WALLET HOLDS)",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "minimum-holders",
        title: "MINIMUM HOLDERS",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "token-age",
        title: "TOKEN AGE (DAYS SINCE LAUNCH)",
        type: "slider",
        value: [100],
        max: 1200,
        hasIndicator: true,
      },
      {
        id: "rugcheck-score",
        title: "RUGCHECK SCORE",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "exclude-tokens",
        title: "EXCLUDE TOKENS WITH NO BIG ACCOUNT MENTIONS",
        type: "dual-input",
        minValue: "",
        maxValue: "",
        hasIndicator: true,
      },
      {
        id: "dex-boosted",
        title: "DEX BOOSTED",
        type: "toggle",
        value: false,
        hasIndicator: true,
      },
      {
        id: "sol-trending",
        title: "SOL TRENDING",
        type: "toggle",
        value: false,
        hasIndicator: true,
      },
      {
        id: "ads-active",
        title: "ADS ACTIVE",
        type: "toggle",
        value: false,
        hasIndicator: true,
      },
      {
        id: "dex-updates",
        title: "DEX TOKEN UPDATES PAID",
        type: "toggle",
        value: false,
        hasIndicator: true,
      },
    ],
  },
]

export const CustomFilterSection = () => {
  const [sections, setSections] = useState(filterSections)
  const [filterValues, setFilterValues] = useState<Record<string, any>>({})

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) => (section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section)),
    )
  }

  const updateFilterValue = (filterId: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterId]: value,
    }))
  }

  const renderFilter = (filter: any) => {
    switch (filter.type) {
      case "dual-input":
        return (
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1">
              <Input
                placeholder="MIN FOLLOWERS"
                className="text-[#838383] text-xs h-12 placeholder:text-[#FFFFFF4D] placeholder:text-xs"
                value={filterValues[`${filter.id}-min`] || ""}
                onChange={(e) => updateFilterValue(`${filter.id}-min`, e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="MAX FOLLOWERS"
                className="text-[#838383] text-xs h-12 placeholder:text-[#838383] placeholder:text-xs"
                value={filterValues[`${filter.id}-max`] || ""}
                onChange={(e) => updateFilterValue(`${filter.id}-max`, e.target.value)}
              />
            </div>
          </div>
        )

      case "slider":
        return (
          <div className="mt-3">
            <div className=" rounded-lg border border-[#FFFFFF26]  px-3 py-6 mb-2">
              <Slider
                value={filterValues[filter.id] || filter.value}
                onValueChange={(value) => updateFilterValue(filter.id, value)}
                max={filter.max}
                min={0}
                step={1}
                className="w-full bg-[#263036]" 
              />
            </div>
            <div className="flex justify-between text-[#838383] text-[10px] font-mono">
              <span>MIN: 100</span>
              <span>MAX: 1200</span>
            </div>
          </div>
        )

      case "dropdown":
        return (
          <div className="mt-3">
            <Button
              variant="outline"
              className="w-full justify-between bg-[#1a2332] border-[#ffffff26] text-[#838383] text-xs h-8 hover:bg-[#1a2332]"
            >
              {filter.value}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        )

      case "toggle":
        return (
          <div className="mt-3">
            <Switch
              checked={filterValues[filter.id] || filter.value}
              onCheckedChange={(checked) => updateFilterValue(filter.id, checked)}
              className="data-[state=checked]:bg-[#263036]"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full  text-white">
   

      {/* Filter Sections */}
      <div className="space-y-0">
        {sections.map((section) => (
          <Collapsible key={section.id} open={section.isOpen} onOpenChange={() => toggleSection(section.id)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left border-b border-[#ffffff2e] hover:bg-[#ffffff05]">
              <span className="text-[17-5px] font-grok  text-white">{section.title}</span>
              {section.isOpen ? (
                <ChevronUp className="h-4 w-4 text-[#838383]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#838383]" />
              )}
            </CollapsibleTrigger>

            <CollapsibleContent className="pb-4">
              <div className="space-y-6 pt-4">
                {section.filters.map((filter) => (
                  <div key={filter.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-normal text-white font-['Space_Grotesk']">{filter.title}</span>
                      {filter.hasIndicator && <Icons.newTooltip />}
                    </div>
                    {renderFilter(filter)}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <div className="mt-8">
        <Button onClick={ () => console.log(filterValues)} className="w-full bg-[#FF4C02] hover:bg-[#ff4c02]/90 text-white font-medium py-4 font-grok rounded-md">
           GET NEW RUNNERS
        </Button>
      </div>
    </div>
  )
}

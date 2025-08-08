import React from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface TwitterFilterMeaningSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TwitterFilterMeaningSheet = ({
  open,
  onOpenChange,
}: TwitterFilterMeaningSheetProps) => {
  const filterMeanings = [
    {
      icon: "📊",
      title: "MINIMUM FOLLOWERS",
      description: "FILTERS ACCOUNTS BASED ON A SET MINIMUM FOLLOWER COUNT TO TRACK ONLY INFLUENTIAL PROFILES."
    },
    {
      icon: "✔",
      title: "VERIFICATION STATUS",
      description: "LIMITS TRACKING TO SPECIFIC ACCOUNT VERIFICATION TYPES, SUCH AS BLUE, GOLD, OR LEGACY VERIFIED."
    },
    {
      icon: "📅",
      title: "ACCOUNT AGE FILTER",
      description: "EXCLUDES OR HIGHLIGHTS ACCOUNTS BASED ON HOW RECENTLY THEY WERE CREATED TO AVOID TRACKING NEW SPAM ACCOUNTS."
    },
    {
      icon: "📢",
      title: "TWEET ENGAGEMENT THRESHOLD",
      description: "MONITORS CONTRACT ADDRESS DROPS ONLY FROM TWEETS THAT REACH A CERTAIN ENGAGEMENT LEVEL (LIKES, RETWEETS, OR REPLIES)."
    },
    {
      icon: "📈",
      title: "FOLLOWER GROWTH RATE",
      description: "FLAGS ACCOUNTS EXPERIENCING RAPID FOLLOWER INCREASES, OFTEN INDICATING EMERGING INFLUENCERS OR VIRAL MOMENTS."
    },
    {
      icon: "🚀",
      title: "TWEET FREQUENCY (LAST 24H)",
      description: "PRIORITIZES ACCOUNTS THAT POST FREQUENTLY, ENSURING ONLY ACTIVELY ENGAGED PROFILES ARE TRACKED."
    },
    {
      icon: "⚡",
      title: "MULTIPLE CA POSTS",
      description: "FLAGS ACCOUNTS THAT HAVE POSTED MULTIPLE CONTRACT ADDRESSES IN A SHORT PERIOD, SIGNALING POSSIBLE LAUNCH SPAM."
    },
    {
      icon: "📢",
      title: "HASHTAG & TOKEN MENTIONS",
      description: "DETECTS ACCOUNTS USING TRENDING MEME COIN HASHTAGS, HELPING TRACK EMERGING TOKENS."
    },
    {
      icon: "🎯",
      title: "EARLY CA SPOTTERS",
      description: "IDENTIFIES THE FIRST ACCOUNTS TO TWEET ABOUT A NEW CONTRACT ADDRESS, CATCHING LAUNCHES AT THE EARLIEST STAGE."
    },
    {
      icon: "🚨",
      title: "NO TWITTER NAME CHANGES",
      description: "FLAGS ACCOUNTS THAT HAVE CHANGED THEIR HANDLE BEFORE POSTING A CONTRACT ADDRESS, A COMMON SCAM TACTIC."
    },
    {
      icon: "🔒",
      title: "EXCLUDE PRIVATE ACCOUNTS",
      description: "IGNORES CONTRACT ADDRESSES POSTED BY PRIVATE ACCOUNTS, ENSURING ONLY PUBLICLY VISIBLE POSTS ARE TRACKED."
    },
    {
      icon: "📊",
      title: "POSTING HISTORY ANALYSIS",
      description: "CHECKS IF AN ACCOUNT ONLY POSTS CONTRACT ADDRESSES WITHOUT ENGAGING IN ANY OTHER SOCIAL ACTIVITY, REDUCING NOISE."
    }
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal>
      <SheetTitle />
      <SheetContent
        style={{ width: "648px", background: "#05121a" }}
        side="right"
        className="text-white gap-6 py-12 px-11 bg-[#05121a] border-2 border-solid border-transparent"
      >
        <section className="flex flex-col space-y-5 overflow-y-scroll no-scrollbar w-full relative z-20">
          {/* Radial Gradient */}
          <div className="absolute top-[-235px] left-[43px] opacity-[0.11] w-[546px] h-[546px] rounded-full z-[-1] bg-gradient-to-r from-orange-500/80 to-transparent pointer-events-none" />
          <div className="absolute top-[463px] -left-40 opacity-[0.13] w-[546px] h-[546px] rounded-full z-[-1] bg-gradient-to-r from-orange-500/80 to-transparent pointer-events-none" />

          {/* Section Title */}
          <div className="flex flex-col items-start gap-3 relative z-10">
            <h2 className="[font-family:'Space_Grotesk',Helvetica] font-semibold text-white text-2xl">
              📌 TWITTER TARGET FILTERS
            </h2>
            <p className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[#838383] text-sm">
              Understanding what each Twitter target filter means and how it affects your account tracking
            </p>
          </div>

          {/* Filter Meanings List */}
          <div className="flex flex-col items-start gap-4 w-full relative z-10">
            {filterMeanings.map((filter, index) => (
              <div key={index} className="flex flex-col items-start gap-3 w-full p-4 rounded-lg bg-[#ffffff08] border border-[#ffffff1a] hover:bg-[#ffffff0f] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{filter.icon}</span>
                  <h4 className="[font-family:'Space_Grotesk',Helvetica] font-medium text-white text-sm">
                    {filter.title}
                  </h4>
                </div>
                <p className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[#838383] text-xs leading-relaxed ml-7">
                  {filter.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="flex items-start gap-2 w-full p-3 rounded-lg bg-[#ff4c020f] border border-[#ff4c0230] relative z-10">
            <span className="text-sm">💡</span>
            <p className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[#ff9966] text-xs leading-relaxed">
              These filters help you identify high-quality Twitter accounts while avoiding spam, bots, and scam accounts that could mislead your trading decisions.
            </p>
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};

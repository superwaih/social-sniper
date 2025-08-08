import React from "react";

export const FilterMeaningSection = () => {
  const filterMeanings = [
    {
      icon: "📊",
      title: "ENGAGEMENT SCORE",
      description: "MEASURES OVERALL HYPE BY ANALYZING INTERACTIONS LIKE LIKES, RETWEETS, SHARES, AND COMMENTS."
    },
    {
      icon: "🔹",
      title: "BIG ACCOUNTS MENTIONED",
      description: "FILTERS TOKENS BASED ON THE NUMBER OF HIGH-PROFILE ACCOUNTS ENGAGING WITH THE TREND."
    },
    {
      icon: "📢",
      title: "FOLLOWER COUNT OF BIG ACCOUNTS",
      description: "SETS A MINIMUM FOLLOWER COUNT FOR BIG ACCOUNTS MENTIONING THE TREND, ENSURING REAL INFLUENCE."
    },
    {
      icon: "📈",
      title: "SOCIAL MENTIONS IN LAST 24H",
      description: "TRACKS HOW FREQUENTLY A MEME OR TOKEN HAS BEEN DISCUSSED ACROSS DIFFERENT PLATFORMS."
    },
    {
      icon: "🏷",
      title: "HASHTAG REACH",
      description: "ANALYZES THE TOTAL IMPRESSIONS OF TRENDING HASHTAGS ACROSS SOCIAL MEDIA NETWORKS."
    },
    {
      icon: "📆",
      title: "TREND MATURITY",
      description: "CATEGORIZES TRENDS BASED ON HOW LONG THEY'VE BEEN GAINING TRACTION, FROM NEWLY EMERGING TO ESTABLISHED."
    },
    {
      icon: "🎥",
      title: "MINIMUM TIKTOK VIDEOS CREATED",
      description: "ENSURES THAT A MEME HAS SIGNIFICANT VIRAL TRACTION BY TRACKING THE NUMBER OF TIKTOK VIDEOS CREATED ABOUT IT."
    }
  ];

  return (
    <section className="flex flex-col w-full overflow-y-scroll no-scrollbar items-start gap-6 pt-6 pb-6 relative z-10">
      {/* Section Title */}
      <div className="flex flex-col items-start gap-2">
        <h3 className="[font-family:'Space_Grotesk',Helvetica] font-semibold text-white text-xl">
          SOCIAL ANALYSIS FILTERS
        </h3>
        <p className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[#838383] text-sm">
          Understanding what each filter means and how it affects your token selection
        </p>
      </div>

      {/* Filter Meanings List */}
      <div className="flex flex-col items-start gap-4 w-full">
        {filterMeanings.map((filter, index) => (
          <div key={index} className="flex flex-col items-start gap-2 w-full p-4 rounded-lg bg-[#ffffff08] border border-[#ffffff1a]">
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
    </section>
  );
};

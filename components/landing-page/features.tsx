import React from 'react'
import { Icons } from '../shared/icons';

const FeaturesData = [
  { id: 1, text: "AI-Powered Meme and Tweet Detection", Icon: Icons.powered },
  {
    id: 2,
    text: "Real-Time Alerts from Twitter Influencers",
    Icon: Icons.alert,
  },

  {
    id: 3,
    text: "Engagement, Liquidity & Holder Analytics",
    Icon: Icons.liquidity,
  },
  {
    id: 4,
    text: "One-Click Snipe & Auto-Buy Setup",
    Icon: Icons.click,
  },
  {
    id: 5,
    text: "Rugcheck & Red Flag Detection",
    Icon: Icons.rugcheck,
  },
  {
    id: 6,
    text: "Telegram & Browser Notifications",
    Icon: Icons.send,
  },
];
const Features = () => {
  return (
    <section className="relative min-h-[50vh] overflow-hidden pb-20 bg-[#00090F]" id="features">
      <div className=" mx-auto w-[90%] md:w-[70%] ">
        <div className="flex  justify-center my-20  items-center ">
          <h1 className="text-[23.58px] md:text-4xl gradient-text max-w-[528px] font-medium text-center">
            Live Features That Give You the Edge
          </h1>
        </div>
        <div className="flex md:flex-row flex-col gap-6 justify-between">
          <div className="flex w-full max-w-[750px]  flex-col space-y-3">
            {FeaturesData.map((feature) => (
              <div
                className="bg-[#060F1580] flex gap-3 items-center p-3 rounded-md "
                key={feature.id}
              >
                <div className="bg-[#CB846638] p-2 rounded-md">
                  <feature.Icon />
                </div>
                <p className="text-[#FFFFFF8F] md:text-[16px] text-sm grok">{feature.text}</p>
              </div>
            ))}
          </div>
          <div
            className="max-w-[512px]  w-full h-[511px] opacity-[95%]
           bg-[#060F15] rounded-2xl"
          ></div>
        </div>
      </div>
      <div className="absolute w-[300px]  md:w-[400px] h-[200px] md:h-[371px]  bottom-0 -left-52 rounded-[335.5px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-[0.29]" />
    </section>
  );
}

export default Features
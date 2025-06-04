import React from "react";
import { Button } from "../ui/button";

export const BottomBanner = () => {
  return (
    <section className="flex flex-col h-[434px] items-center justify-center relative bg-[#00060c] overflow-hidden">
      

      <div className="relative z-10 flex flex-col max-w-[720px] items-center gap-[30px] py-[112px]">
        <div className="flex flex-col items-center gap-4  w-full">
          <h1 className="text-2xl md:text-4xl gradient-text max-w-[528px] font-medium text-center">
      Ready to Front-Run the Timeline?
          </h1>

          <p className=" [font-family:'Space_Grotesk',Helvetica] font-normal text-[#ffffff70] text-xl text-center leading-normal">
          Join thousands of early snipers already securing entries. Your alpha advantage starts now.
          </p>
        </div>

        <div className="flex md:flex-row flex-col gap-[30px]">
          <Button className="px-12 py-3 bg-[#ff4c02] hover:bg-[#e64400] [font-family:'Space_Grotesk',Helvetica] font-normal text-white text-[16.3px] tracking-[-0.65px] rounded">
            Snipe now
          </Button>

          <button
            className="gradient-border  px-8 py-3 [font-family:'Space_Grotesk',Helvetica]  gradient-text font-medium text-[16.3px] "
          >
              Learn more
  
          </button>
        </div>
      </div>

      <div className="w-[648px] h-[648px] top-[-349px] left-[432px] rounded-[324px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-[0.29]" />

      <div className="w-[671px] h-[671px] top-[154px] left-[-42px] rounded-[335.5px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-[0.29]" />
    </section>
  );
};

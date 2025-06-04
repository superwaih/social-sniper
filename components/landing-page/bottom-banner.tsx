import React from "react";
import { Button } from "../ui/button";

export const Frame = () => {
  return (
    <section className="flex flex-col h-[434px] items-center justify-center relative bg-[#00060c] overflow-hidden">
      <img
        className="absolute w-[2386px] h-[1786px] top-[-566px] left-[-437px]"
        alt="Vector"
        src="https://c.animaapp.com/mbi2ko1qrYVTSI/img/vector.svg"
      />

      <div className="relative z-10 flex flex-col w-[720px] items-center gap-[30px] py-[112px]">
        <div className="flex flex-col items-center gap-4 self-stretch w-full">
          <h1 className="self-stretch [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,125,72,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Space_Grotesk',Helvetica] font-medium text-transparent text-[43px] text-center leading-normal">
            Ready to Front-Run the Timeline?
          </h1>

          <p className="self-stretch [font-family:'Space_Grotesk',Helvetica] font-normal text-[#ffffff70] text-xl text-center leading-normal">
            Join thousands of early snipers already securing entries.
            <br />
            Your alpha advantage starts now.
          </p>
        </div>

        <div className="flex items-start gap-[30px]">
          <Button className="w-56 h-[57px] bg-[#ff4c02] hover:bg-[#e64400] [font-family:'Space_Grotesk',Helvetica] font-normal text-white text-[16.3px] tracking-[-0.65px] rounded">
            Snipe now
          </Button>

          <Button
            variant="ghost"
            className="w-56 h-[57px] [font-family:'Space_Grotesk',Helvetica] font-medium text-[16.3px] rounded"
          >
            <span className="[background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,125,72,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent]">
              Learn more
            </span>
          </Button>
        </div>
      </div>

      <div className="w-[648px] h-[648px] top-[-349px] left-[432px] rounded-[324px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-[0.29]" />

      <div className="w-[671px] h-[671px] top-[154px] left-[-42px] rounded-[335.5px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-[0.29]" />
    </section>
  );
};

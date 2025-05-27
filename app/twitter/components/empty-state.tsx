"use client";

import { Button } from "@/components/ui/button";


export default function TargetsEmptyState() {
  return (
    <div className="bg-[#000000] text-white p-6 rounded-lg border-2 border-solid border-transparent">
      <div className="flex justify-between items-center px-4 py-2 bg-[#779cbf6b] text-[#FFFFFFF2] [font-family:'Space_Grotesk',Helvetica] text-sm font-normal uppercase">
        <span>#MEME TREND</span>
        <span>MARKET CAP</span>
        <span>BOUGHT</span>
        <span>BUY PRICE</span>
        <span>SELL PRICE</span>
        <span>P/L</span>
      </div>
      <div className="flex flex-col items-center justify-center h-[400px]">
        <h2 className="[font-family:'Space_Grotesk',Helvetica] text-2xl font-bold">
          NO TARGET ACCOUNT YET!
        </h2>
        <Button
          variant="outline"
          className="mt-4 text-[#FFFFFF8A] [font-family:'DM_Mono',Helvetica] border-[#ffffff40] hover:text-white hover:[background:linear-gradient(90deg,rgba(255,76,2,0.5)_0%,rgba(35,20,15,0.67)_100%)] bg-transparent"
        >
          ADD NEW TARGET
        </Button>
      </div>
    </div>
  );
}

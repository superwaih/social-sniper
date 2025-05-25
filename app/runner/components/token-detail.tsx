// components/KekimaxDialog.tsx
"use client";

import { Icons } from "@/components/shared/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { BadgeCheck, AlertTriangle, Eye, ShoppingCart } from "lucide-react";
import { FC } from "react";

interface KekimaxDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const dummyTokenData = {
  name: "$KEKIMAX",
  symbol: "CKEKIUS RUGIMUS",
  contractAddress: "0xDE...G456",
  liquidity: "No liquidity lock",
  volume: "$120K",
  rugRisk: "Warning",
  buySellRatio: {
    buys: "20%",
    sells: "80%",
  },
  rugCheckStatus: "Warning",
};

export const TokenDetail: FC<KekimaxDialogProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        style={{
          borderRadius: "20px",
          borderImageSource:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(153, 153, 153, 0.08) 100%)",
          borderImageSlice: 1,
        }}
        className="max-w-[623px] backdrop-blur-lg bg-[#020C12]/60 overflow-hidden text-white rounded-[20px]  p-8"
      >
        <div className="bg-[#0A141A]/60 p-3 rounded-[12px]">
          <DialogHeader>
            <DialogTitle className="text-[#FFFFFFD4] font-mono text-lg border-b py-3 border-brandgray">
              {dummyTokenData.name}{" "}
              <span className="">({dummyTokenData.symbol})</span>
            </DialogTitle>
          </DialogHeader>
          <div
            className=" w-full my-2  backdrop-blur-lg 
        grid grid-cols-3 gap-4  text-sm"
          >
            {tokenInfoData.map((token) => (
              <div
                key={token.name}
                className="flex  w-full bg-[#0D1920] flex-col gap-2 px-3 py-3 rounded-[6px]"
              >
                <span className="text-[#FFFFFFD4]  uppercase text-xs w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {token.name}
                </span>
                <p className="font-mono text-[#FFFFFF5C] text-md break-all">
                  {token.value}
                </p>
              </div>
            ))}
            <div className="flex  w-full bg-[#0D1920] flex-col gap-2 px-3 py-3 rounded-[6px]">
              <span className="text-[#FFFFFFD4]  uppercase text-xs w-full whitespace-nowrap overflow-hidden text-ellipsis">
                RUG CHECK
              </span>
              <div className="bg-[#FF000021] flex max-w-[120px] gap-3 text-[#FFFFFF73] border border-[#FF0000] p-2 rounded-[10px]">
                <Icons.warningIcon className="size-[20px] text-[#FF0000] " />
                <p className="text-[#FFFFFF73]">Warning</p>
              </div>
            </div>
            <div className="flex  w-full bg-[#0D1920] flex-col gap-2 px-3 py-3 rounded-[6px]">
              <span className="text-[#FFFFFFD4]  uppercase text-xs w-full whitespace-nowrap overflow-hidden text-ellipsis">
                BUY/SELL RATIO:
              </span>
              <div className="font-mono justify-between flex items-center  text-[13px] w-full  text-[#FFFFFF5C] text-md ">
                <p className="text-green-400 w-full">20% BUYS / 80% SELLS</p>
              </div>
            </div>
            <div className="flex  w-full bg-[#0D1920] flex-col gap-2 px-3 py-3 rounded-[6px]">
              <span className="text-[#FFFFFFD4]  uppercase text-xs w-full whitespace-nowrap overflow-hidden text-ellipsis">
                BUY/SELL RATIO:
              </span>
              <div className="bg-[#FFBA0021] flex max-w-[120px] gap-3 text-[#FFFFFF73] border border-[#FFBA00] p-2 rounded-[10px]">
                <Icons.warningIcon className="size-[20px] text-[#FFBA00] " />
                Warning
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-brandgray my-3 "></div>
          <div className="flex justify-between items-center">
            <div className="flex font-mono text-sm text-white  gap-2">
              <ChevronDown />
              <p>VIEW DETAILS</p>
            </div>
            <div className="flex gap-4 ">
              <button className="flex gap-3 items-center border p-2 rounded-md border-[#779CBF6B]">
                <Icons.trackicon />
                TRACK TOKEN
              </button>
              <button className="flex bg-[#FF4C02] text-[#FFFFFFD4] gap-3 items-center border p-2 rounded-md border-[#779CBF6B]">
                <Icons.autobuy />
                SET AUTO BUY
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#0A141A]/60 p-3 rounded-[12px]">
          <DialogHeader>
            <DialogTitle className="text-[#FFFFFFD4] font-mono text-lg border-b py-3 border-brandgray">
              {dummyTokenData.name}{" "}
              <span className="">({dummyTokenData.symbol})</span>
            </DialogTitle>
          </DialogHeader>
          <div
            className=" w-full my-2  backdrop-blur-lg 
        grid grid-cols-3 gap-4  text-sm"
          >
            {tokenInfoData.map((token) => (
              <div
                key={token.name}
                className="flex  w-full bg-[#0D1920] flex-col gap-2 px-3 py-3 rounded-[6px]"
              >
                <span className="text-[#FFFFFFD4]  uppercase text-xs w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {token.name}
                </span>
                <p className="font-mono text-[#FFFFFF5C] text-md break-all">
                  {token.value}
                </p>
              </div>
            ))}
            <div className="flex  w-full bg-[#0D1920] flex-col gap-2 px-3 py-3 rounded-[6px]">
              <span className="text-[#FFFFFFD4]  uppercase text-xs w-full whitespace-nowrap overflow-hidden text-ellipsis">
                RUG CHECK
              </span>
              <div className="bg-[#FF000021] flex max-w-[120px] gap-3 text-[#FFFFFF73] border border-[#FF0000] p-2 rounded-[10px]">
                <Icons.warningIcon className="size-[20px] text-[#FF0000] " />
                <p className="text-[#FFFFFF73]">Warning</p>
              </div>
            </div>
            <div className="flex  w-full bg-[#0D1920] flex-col gap-2 px-3 py-3 rounded-[6px]">
              <span className="text-[#FFFFFFD4]  uppercase text-xs w-full whitespace-nowrap overflow-hidden text-ellipsis">
                BUY/SELL RATIO:
              </span>
              <div className="font-mono justify-between flex items-center  text-[13px] w-full  text-[#FFFFFF5C] text-md ">
                <p className="text-green-400 w-full">20% BUYS / 80% SELLS</p>
              </div>
            </div>
            <div className="flex  w-full bg-[#0D1920] flex-col gap-2 px-3 py-3 rounded-[6px]">
              <span className="text-[#FFFFFFD4]  uppercase text-xs w-full whitespace-nowrap overflow-hidden text-ellipsis">
                BUY/SELL RATIO:
              </span>
              <div className="bg-[#FFBA0021] flex max-w-[120px] gap-3 text-[#FFFFFF73] border border-[#FFBA00] p-2 rounded-[10px]">
                <Icons.warningIcon className="size-[20px] text-[#FFBA00] " />
                Warning
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-brandgray my-3 "></div>
          <div className="flex justify-between items-center">
            <div className="flex font-mono text-sm text-white  gap-2">
              <ChevronDown />
              <p>VIEW DETAILS</p>
            </div>
            <div className="flex gap-4 ">
              <button className="flex gap-3 font-mono items-center border p-2 rounded-md border-[#779CBF6B]">
                <Icons.trackicon />
                TRACK TOKEN
              </button>
              <button className="flex font-mono bg-[#FF4C02] text-[#FFFFFFD4] gap-3 items-center border p-2 rounded-md border-[#779CBF6B]">
                <Icons.autobuy />
                SET AUTO BUY
              </button>
            </div>
          </div>
        </div>

        
      </DialogContent>
    </Dialog>
  );
};

const tokenInfoData = [
  {
    name: "Contract Address",
    value: "0x123...ABCD",
  },
  {
    name: "Liquidity Locked",
    value: "$120,000",
  },
  {
    name: "24H Volume",
    value: "$350,000",
  },
//   {
//     name: "Rug Risk",
//     value: "High",
//   },
//   {
//     name: "Buy/Sell Ratio",
//     value: "45 Buys / 30 Sells",
//   },
//   {
//     name: "Rugcheck Status",
//     value: "Verified",
//   },
];
  
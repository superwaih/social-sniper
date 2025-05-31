"use client";

import { Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";

type Target = {
  id: number;
  trend: string;
  mcap: string;
  bought: "Yes" | "No";
  buyPrice: number;
  sellPrice: number;
  pl: number;
};

const targetData: Target[] = [
  {
    id: 1,
    trend: "$kekius maximus",
    mcap: "250M",
    bought: "Yes",
    buyPrice: 0.00025,
    sellPrice: 0.0003,
    pl: 305,
  },
  {
    id: 2,
    trend: "MemeStorm",
    mcap: "120M",
    bought: "No",
    buyPrice: 0,
    sellPrice: 0,
    pl: 0,
  },
  {
    id: 3,
    trend: "PepeClone",
    mcap: "98M",
    bought: "Yes",
    buyPrice: 0.00012,
    sellPrice: 0.00022,
    pl: 500,
  },
  {
    id: 4,
    trend: "ShibV2",
    mcap: "400M",
    bought: "No",
    buyPrice: 0,
    sellPrice: 0,
    pl: 0,
  },
  {
    id: 5,
    trend: "FlokiRage",
    mcap: "75M",
    bought: "Yes",
    buyPrice: 0.00003,
    sellPrice: 0.000035,
    pl: 150,
  },
  {
    id: 6,
    trend: "Dogeth Wave",
    mcap: "310M",
    bought: "Yes",
    buyPrice: 0.0004,
    sellPrice: 0.0005,
    pl: 250,
  },
  {
    id: 7,
    trend: "Smol Inu",
    mcap: "42M",
    bought: "No",
    buyPrice: 0,
    sellPrice: 0,
    pl: 0,
  },
  {
    id: 8,
    trend: "Wojak DAO",
    mcap: "180M",
    bought: "Yes",
    buyPrice: 0.00019,
    sellPrice: 0.00025,
    pl: 400,
  },
];

export default function TargetsTable() {
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: "MEME TREND",
      accessor: (target: Target) => target.trend,
      className: " font-pixelify text-[#FFFFFFF2]",
    },
    {
      header: "MARKET CAP",
      accessor: (target: Target) => (
        <span className="font-mono text-[#FFFFFFF2]">{target.mcap}</span>
      ),
      className: "font-mono text-[#FFFFFFF2]",
    },
    {
      header: "BOUGHT",
      accessor: (target: Target) => (
        <span
          className={cn(
            "text-sm font-medium flex items-center gap-1",
            target.bought === "Yes" ? "text-green-400" : "text-red-400"
          )}
        >
          {target.bought === "Yes" ? "✅ Yes" : "❌ No"}
        </span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "Buy Price",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFF2]">${target.buyPrice.toFixed(5)}</span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "Sell Price",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFF2]">${target.sellPrice.toFixed(5)}</span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "P/L",
      accessor: (target: Target) => (
        <span
          className={cn(
            "text-[#FFFFFFF2] w-full",
            target.pl >= 0 ? "text-green-500" : "text-red-500"
          )}
        >
          ${target.pl}
        </span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "▼",
      accessor: (target: Target) => (
        <Button
          variant="outline"
          size="sm"
          className="text-xs text-[#FFFFFF8A] py-4 font-mono border-gray-700 flex gap-3 items-center hover:text-white hover:border-white hover:bg-[#FF4C02]  bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTarget(target);
            setIsModalOpen(true);
          }}
        >
          <Info className="w-4 h-4" />
          DETAILS
        </Button>
      ),
      className:
        "text-[#FFFFFFF2] text-center font-mono flex justify-center items-center",
    },
  ];
console.log(selectedTarget)
console.log(isModalOpen)
  return (
    <div className="">
      <DataTable
        data={targetData}
        columns={columns}
        onRowClick={(target) => {
          setSelectedTarget(target);
          setIsModalOpen(true);
        }}
      />
      {/* <TargetDetail open={isModalOpen} setOpen={setIsModalOpen} /> */}
    </div>
  );
}

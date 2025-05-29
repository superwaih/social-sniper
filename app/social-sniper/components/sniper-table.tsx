"use client";

import { Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";

type Target = {
  id: number;
  memeTrigger: string;
  tweetSource: string;
  timeAgo: string;
  engagementScore: number;
  mentionsSpike: number;
  tokenDrop: string;
};

const targetData: Target[] = [
  {
    id: 1,
    memeTrigger: "$Blaze Meme",
    tweetSource: "@CryptoWhale",
    timeAgo: "2 MINS AGO",
    engagementScore: 92,
    mentionsSpike: 640,
    tokenDrop: "Not yet",
  },
  {
    id: 2,
    memeTrigger: "To the Moon",
    tweetSource: "@ElonMusk",
    timeAgo: "6 MINS AGO",
    engagementScore: 83,
    mentionsSpike: 720,
    tokenDrop: "Detected",
  },
  {
    id: 3,
    memeTrigger: "#KEKius",
    tweetSource: "@ShillMaster",
    timeAgo: "1 MIN AGO",
    engagementScore: 80,
    mentionsSpike: 310,
    tokenDrop: "Detected",
  },
  {
    id: 4,
    memeTrigger: "Just Dropped",
    tweetSource: "@PumpKing",
    timeAgo: "4 MINS AGO",
    engagementScore: 85,
    mentionsSpike: 410,
    tokenDrop: "Detected",
  },
];

export default function SniperTable() {
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: "MEME / TRIGGER",
      accessor: (target: Target) => target.memeTrigger,
      className: "w-[180px] font-pixelify text-[#FFFFFFF2]",
    },
    {
      header: "TWEET SOURCE",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFA3]">{target.tweetSource}</span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "TIME",
      accessor: (target: Target) => target.timeAgo,
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "ENGAGEMENT",
      accessor: (target: Target) => (
        <span
          className={cn(
            "font-mono",
            target.engagementScore >= 90 ? "text-green-500" : "text-red-500"
          )}
        >
          {target.engagementScore}/100
        </span>
      ),
      className: "font-mono text-[#FFFFFFF2]",
    },
    {
      header: "MENTIONS SPIKE",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFF2]">+{target.mentionsSpike}%</span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "TOKEN DROP",
      accessor: (target: Target) => (
        <span
          className={cn(
            "text-[#FFFFFFF2]",
            target.tokenDrop === "Not yet" ? "text-red-500" : "text-green-500"
          )}
        >
          {target.tokenDrop}
        </span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "DETAILS",
      accessor: (target: Target) => (
        <Button
          variant="outline"
          size="sm"
          className="text-xs text-[#FFFFFF8A] border-[#ffffff40] flex gap-3 items-center hover:text-white bg-transparent hover:[background:linear-gradient(90deg,rgba(255,76,2,0.5)_0%,rgba(35,20,15,0.67)_100%)]"
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
      className: "",
    },
  ];

  return (
    <div className="bg-[#1A1A1A]">
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

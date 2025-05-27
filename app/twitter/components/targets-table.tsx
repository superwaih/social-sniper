"use client";

import { Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";

type Target = {
  id: number;
  name: string;
  engagementScore: number;
  bigAccountsMentioned: string[];
  hashtagReach: number;
};

const targetData: Target[] = [
  {
    id: 1,
    name: "Trend A",
    engagementScore: 275,
    bigAccountsMentioned: ["@user1", "@user2"],
    hashtagReach: 272,
  },
  {
    id: 2,
    name: "Trend B",
    engagementScore: 121,
    bigAccountsMentioned: ["@user3"],
    hashtagReach: 102,
  },
  {
    id: 3,
    name: "Trend C",
    engagementScore: 416,
    bigAccountsMentioned: ["@user4", "@user5", "@user6"],
    hashtagReach: 200,
  },
  {
    id: 4,
    name: "Trend D",
    engagementScore: 300,
    bigAccountsMentioned: ["@user7"],
    hashtagReach: 350,
  },
];

export default function TargetsTable() {
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
console.log(selectedTarget);
console.log(isModalOpen);
  const columns = [
    {
      header: "TARGET TREND",
      accessor: (target: Target) => target.name,
      className: "w-[180px] font-pixelify text-[#FFFFFFF2]",
    },
    {
      header: "ENGAGEMENT SCORE",
      accessor: (target: Target) => (
        <span
          className={cn(
            "font-mono",
            target.engagementScore >= 250 ? "text-green-500" : "text-red-500"
          )}
        >
          {target.engagementScore}/{493}
        </span>
      ),
      className: "font-mono text-[#FFFFFFF2]",
    },
    {
      header: "BIG ACCOUNTS MENTIONED",
      accessor: (target: Target) => (
        <div className="flex flex-row w-full gap-3 items-center flex-wrap max-w-[300px]">
          {target.bigAccountsMentioned.map((mention, i) => (
            <span
              key={i}
              className=" text-[#FFFFFFA3]"
            >
              {mention}
            </span>
          ))}
        </div>
      ),
      className: " text-[#FFFFFFF2]",
    },
    {
      header: "HASHTAG REACH",
      accessor: (target: Target) => (
        <span className=" text-[#FFFFFFF2]">
          {target.hashtagReach.toLocaleString()}
        </span>
      ),
      className: " text-[#FFFFFFF2]",
    },
    {
      header: "DETAILS",
      accessor: (target: Target) => (
        <Button
          variant="outline"
          size="sm"
          className="text-xs text-[#FFFFFF8A]  border-[#ffffff40] flex gap-3 items-center hover:text-white bg-transparent hover:[background:linear-gradient(90deg,rgba(255,76,2,0.5)_0%,rgba(35,20,15,0.67)_100%)]"
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

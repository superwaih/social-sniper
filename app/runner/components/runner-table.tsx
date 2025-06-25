"use client";

import { DataTable } from "@/components/shared/data-table";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Runner } from "@/types/runner";
import { runnerData } from "@/utils/data";
import { useState } from "react";
import { TokenDetail } from "./token-detail";


export default function RunnerTable() {
    const [selectedRunner, setSelectedRunner] = useState<Runner | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
console.log(selectedRunner)
    const columns = [
      {
        header: "#MEME TREND",
        accessor: (runner: Runner) => runner.name,
        className: "w-[180px] font-pixelify text-[#FFFFFFF2]",
      },
      {
        header: "ENGAGEMENT",
        accessor: (runner: Runner) => (
          <span
            className={cn(
              runner.engagement.score >= 94 ? "text-green-500" : "text-red-500"
            )}
          >
            {runner.engagement.score}/100
          </span>
        ),
      },
      {
        header: "BIG MENTIONS",
        accessor: (runner: Runner) => (
          <div className="flex flex-row w-full gap-3 items-center flex-wrap max-w-[300px]">
            {runner.mentions.map((mention, i) => (
              <span key={i} className="text-[#FFFFFFA3]">
                @{mention}
              </span>
            ))}
          </div>
        ),
      },
      // {
      //   header: "TIKTOK VIDEOS",
      //   accessor: (runner: Runner) => runner.tiktokVideos.toLocaleString(),
      //   className: " text-[#FFFFFFF2]",
      // },
      {
        className: "text-[#FFFFFFF2]",
        header: "HASHTAG REACH",
        accessor: (runner: Runner) => runner.hashtagReach,
      },
      
      {
        header: "TOKENS GENERATED",
        accessor: (runner: Runner) => (
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-[#FFFFFF8A]   border-gray-700 flex gap-3 items-center hover:text-white bg-transparent hover:bg-opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRunner(runner);
              setIsModalOpen(true);
            }}
          >
            <Icons.tooltip />
            DETAILS
          </Button>
        ),
        className: "",
      },
    ];
  return (
    <div className=" overflow-x-auto">
      <DataTable
        data={runnerData}
        columns={columns}
        onRowClick={(runner) => {
          setSelectedRunner(runner);
          setIsModalOpen(true);
        }}
      />
      <TokenDetail 
      open={isModalOpen}
      setOpen={setIsModalOpen}
      />
    </div>
  );
}

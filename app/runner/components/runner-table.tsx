"use client";

import { DataTable } from "@/components/shared/data-table";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {  RunnerReport } from "@/types/runner";
import { useState } from "react";
import { TokenDetail } from "./token-detail";
// import { useGetTargets } from "@/service/target";

interface IRunnerTableProps {
  data: RunnerReport[];
  isLoading: boolean;
}
export default function RunnerTable({data, isLoading}: IRunnerTableProps) {

    const [selectedRunner, setSelectedRunner] = useState<RunnerReport | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(selectedRunner)
    const columns = [
      {
        header: "#MEME TREND",
        accessor: (runner: RunnerReport) => runner.tokenName,
        className: "w-[180px] font-pixelify text-[#FFFFFFF2]",
      },
      {
        header: "ENGAGEMENT",
        accessor: (runner: RunnerReport) => (
          <span
            className={cn(
              runner.engagementScore >= 94 ? "text-green-500" : "text-red-500"
            )}
          >
            {runner.engagementScore}/100
          </span>
        ),
      },
      {
        header: "BIG MENTIONS",
        accessor: (runner: RunnerReport) => (
          <span  className="text-[#FFFFFFA3]">
                @{runner.mentions}
              </span>
        )

       
      },
      // {
      //   header: "TIKTOK VIDEOS",
      //   accessor: (runner: RunnerReport) => runner.tiktokVideos ?? 0,
      //   className: " text-[#FFFFFFF2]",
      // },
      {
        className: "text-[#FFFFFFF2]",
        header: "HASHTAG REACH",
        accessor: (runner: RunnerReport) => runner.hashtagReach
      },
      
      {
        header: "TOKENS GENERATED",
        accessor: (runner: RunnerReport) => (
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
        data={data}
        columns={columns}
      isLoading={isLoading}
        onRowClick={(runner: RunnerReport) => {
          // setSelectedRunner(runner);
          // setIsModalOpen(true);
          console.log(runner)
        }}
        emptyText="We're monitoring the blockchain and social trends — once a potential meme token starts gaining traction, it’ll show up here."
      />
      <TokenDetail 
      open={isModalOpen}
      setOpen={setIsModalOpen}
      />
    </div>
  );
}

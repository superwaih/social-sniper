"use client";

import { DataTable } from "@/components/shared/data-table";
import { cn } from "@/lib/utils";
// import { useState } from "react";

export interface OverviewReport {
  memeTrigger: string;
  snipeSource: string;
  time: string;
  engagement: number;
  mentionsSpike: number;
  tokenDrop: string;
}

interface IOverviewTableProps {
  data: OverviewReport[];
  isLoading: boolean;
}

export default function OverviewTable({ data, isLoading }: IOverviewTableProps) {
//   const [selectedOverview, setSelectedOverview] = useState<OverviewReport | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: "MEME / TRIGGER",
      accessor: (overview: OverviewReport) => overview.memeTrigger,
      className: "w-[180px] font-pixelify text-[#FFFFFFF2]",
      
    },
    {
      header: "SNIPE SOURCE",
      accessor: (overview: OverviewReport) => overview.snipeSource,
      className: "text-[#FFFFFFF2] font-grok",
    },
    {
      header: "TIME",
      accessor: (overview: OverviewReport) => overview.time,
      className: "text-[#FFFFFFF2] font-grok",
    },
    {
      header: "Engagement",
      accessor: (overview: OverviewReport) => (
        <span
          className={cn(
        " font-grok text-[#FFFFFFF2]"
          )}
        >
          {overview.engagement}/100
        </span>
      ),
    },
    {
      header: "MENTIONS SPIKE",
      accessor: (overview: OverviewReport) => (
        <span className="text-[#FFFFFFA3]">
          +{overview.mentionsSpike}%
        </span>
      ),
    },
    {
      header: "TOKEN DROP",
      accessor: (overview: OverviewReport) => (
        <span
          className={cn(
            overview.tokenDrop === "Not yet" ? "text-red-500" : "text-green-500"
          )}
        >
          {overview.tokenDrop}
        </span>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        onRowClick={(overview: OverviewReport) => {
          console.log(overview);
        }}
      />
    </div>
  );
}
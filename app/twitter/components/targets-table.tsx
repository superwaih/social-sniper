"use client";

import { EllipsisVertical} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/shared/data-table";
import StatusIndicator from "@/components/shared/status-indicator";

type Target = {
  id: number;
  account: string;
  mentions24h: number;
  followers: string;
  lastActivity: string;
  autoBuy: "ON" | "OFF";
  status: "Active" | "Inactive" | "Idle";
};

const targetData: Target[] = [
  {
    id: 1,
    account: "@CRYPTOWHALE",
    mentions24h: 18,
    followers: "120K",
    lastActivity: "2HRS AGO",
    autoBuy: "ON",
    status: "Inactive",
  },
  {
    id: 2,
    account: "@ELONMUSK",
    mentions24h: 22,
    followers: "130M",
    lastActivity: "45 MINS AGO",
    autoBuy: "OFF",
    status: "Active",
  },
  {
    id: 3,
    account: "@SHILLMASTER",
    mentions24h: 3,
    followers: "89K",
    lastActivity: "3 DAYS AGO",
    autoBuy: "ON",
    status: "Active",
  },
  {
    id: 4,
    account: "@GHOSTALPHA",
    mentions24h: 0,
    followers: "5K",
    lastActivity: "12 DAYS AGO",
    autoBuy: "OFF",
    status: "Idle",
  },
];

export default function TargetsTable() {
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  

  const columns = [
    {
      header: "ACCOUNT",
      accessor: (target: Target) => (
        <span className="font-pixelify text-[#FFFFFFF2]">{target.account}</span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "MENTIONS 24H",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFF2]">{target.mentions24h}</span>
      ),
      className: "text-[#FFFFFFF2] text-center",
    },
    {
      header: "FOLLOWERS",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFF2]">{target.followers}</span>
      ),
      className: "text-[#FFFFFFF2] ",
    },
    {
      header: "Last Activity",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFF2] text-sm">{target.lastActivity}</span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "AUTO-BUY",
      accessor: (target: Target) => (
        <span
          className={cn(
            "text-sm font-medium flex items-center gap-1",
            target.autoBuy === "ON" ? "text-green-400" : "text-red-400"
          )}
        >
          {target.autoBuy === "ON" ? "✅ ON" : "❌ OFF"}
        </span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "STATUS",
      accessor: (target: Target) => (
        <StatusIndicator status={target.status} />
      ),
      className: "text-[#FFFFFFF2] ",
    },
   {
      header: "▼",
      accessor: () => (
        <div className="border-[#779CBF6B] border rounded-[4px] p-2">
          <EllipsisVertical className="size-3" />
        </div>
      ),
      className: "text-[#FFFFFFF2] text-center flex justify-center items-center",
    },
  ];

  console.log(selectedTarget);
  console.log(isModalOpen);

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
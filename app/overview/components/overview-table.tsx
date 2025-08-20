"use client";
import { EllipsisVertical} from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import StatusIndicator from "@/components/shared/status-indicator";

type Target = {
  id: number;
  memeTrigger: string;
  tweetSource: string;
  time: string;
  engagement: string;
  mentionsSpike: string;
  tokenDrop: "Not yet" | "Detected";
};

const targetData: Target[] = [
  {
    id: 1,
    memeTrigger: "$BLAZE MEME",
    tweetSource: "@CRYPTOWHALE",
    time: "2 MINS AGO",
    engagement: "92/100",
    mentionsSpike: "+640%",
    tokenDrop: "Not yet",
  },
  {
    id: 2,
    memeTrigger: "TO THE MOON",
    tweetSource: "@ELONMUSK",
    time: "6 MINS AGO",
    engagement: "98/100",
    mentionsSpike: "+720%",
    tokenDrop: "Detected",
  },
  {
    id: 3,
    memeTrigger: "#KEKIUS",
    tweetSource: "@SHILLMASTER",
    time: "1 MIN AGO",
    engagement: "80/100",
    mentionsSpike: "+310%",
    tokenDrop: "Detected",
  },
  {
    id: 4,
    memeTrigger: "JUST DROPPED",
    tweetSource: "@PUMPKING",
    time: "4 MINS AGO",
    engagement: "85/100",
    mentionsSpike: "+410%",
    tokenDrop: "Detected",
  },
];

export default function OverviewTable() {
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: "MEME / TRIGGER",
      accessor: (target: Target) => (
        <span className="font-pixelify text-[#FFFFFFF2] font-medium">
          {target.memeTrigger}
        </span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "TWEET SOURCE",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFF2]">{target.tweetSource}</span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "TIME",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFF2] text-sm">{target.time}</span>
      ),
      className: "text-[#FFFFFFF2]",
    },
    {
      header: "Engagement",
      accessor: (target: Target) => (
        <span className="text-[#FFFFFFF2]">{target.engagement}</span>
      ),
      className: "text-[#FFFFFFF2] text-center",
    },
    {
      header: "MENTIONS SPIKE",
      accessor: (target: Target) => (
        <span className="text-green-400 font-medium">{target.mentionsSpike}</span>
      ),
      className: "text-[#FFFFFFF2] text-center",
    },
    {
      header: "TOKEN DROP",
      accessor: (target: Target) => (
       <StatusIndicator status={target.tokenDrop} />
      ),
      className: "text-[#FFFFFFF2] text-center",
    },
   {
      header: "ACTION",
    accessor: () => (
        <div className="border-[#779CBF6B] border rounded-[4px] p-2">
          <EllipsisVertical className="size-3 rotate-90" />
        </div>
      ),
      className: "text-[#FFFFFFF2] text-center flex justify-center items-center",
    },
  ];

  console.log("Target Data:", selectedTarget);
  console.log("Is Modal Open:", isModalOpen);

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
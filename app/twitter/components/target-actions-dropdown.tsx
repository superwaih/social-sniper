"use client";

import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AutoBuyTarget } from "./types";

interface TargetActionsDropdownProps {
  target: AutoBuyTarget;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteClick: (target: AutoBuyTarget) => void;
  onDisableTarget?: (target: AutoBuyTarget) => void;
  onEditAutoBuy?: (target: AutoBuyTarget) => void;
  onEditTokenFilter?: (target: AutoBuyTarget) => void;
  onViewTweets?: (target: AutoBuyTarget) => void;
  onResetFilter?: (target: AutoBuyTarget) => void;
}

export default function TargetActionsDropdown({
  target,
  isOpen,
  onOpenChange,
  onDeleteClick,
  onDisableTarget,
  onEditAutoBuy,
  onEditTokenFilter,
  onViewTweets,
  onResetFilter,
}: TargetActionsDropdownProps) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <div className="border-[#779CBF24] border rounded-[4px] p-2  flex justify-center cursor-pointer">
          <EllipsisVertical className="size-3 text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#061016] p-3 text-white border border-[#779CBF24] font-grok flex flex-col gap-2">
        <DropdownMenuItem onClick={() => onDisableTarget?.(target)}>
          Disable Targets
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditAutoBuy?.(target)}>
          Edit Auto Buy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditTokenFilter?.(target)}>
          Edit Token Filter
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDeleteClick(target)}
          className="text-[#ED1010]"
        >
          Remove Targets
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewTweets?.(target)}>
          View Tweets
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

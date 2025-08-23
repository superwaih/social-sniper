"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AutoBuyTarget } from "./types";
import { Loader2, Trash, XCircleIcon } from "lucide-react";

interface DeleteTargetModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  target: AutoBuyTarget | null;
  onConfirmDelete: () => void;
  isLoading: boolean
}

export default function DeleteTargetModal({
  isOpen,
  onOpenChange,
  target,
  onConfirmDelete,
  isLoading
}: DeleteTargetModalProps) {
    console.log(target)
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#020C12]  text-white rounded-lg">
        <DialogHeader className="p-5">
          <h3 className="text-center font-grok text-lg">
            ARE YOU SURE YOU WANT TO REMOVE THIS TWITTER TARGET?
          </h3>
          <p className="text-[#FFFFFF4D] font-grok text-sm text-center">
            You&apos;ll stop receiving alerts, auto-buy triggers, and mention
            tracking for {target?.twitterUsername || "this account"}.
          </p>
        </DialogHeader>
        <DialogFooter className="flex border-[#08131A] p-5 border-t bg-[#08131A] justify-center items-center w-full gap-3 mt-4">
          <Button
            variant="destructive"
            className="bg-[#ED1010] p-4 min-w-[80px] hover:bg-red-700"
            onClick={onConfirmDelete}
            disabled={isLoading}
          >
          
           {
            isLoading ?

            <Loader2 className="animate-spin" />
            :
            
<div className="flex gap-4 items-center">
   <Trash />
             <span>REMOVE TARGET</span>
</div>
          

           }
           
          </Button>
          <Button
            variant="outline"
            className="bg-[#EDEDED08] border-[#FFFFFF40] hover:text:black p-4 text-white border "
            onClick={() => onOpenChange(false)}
          >
            <XCircleIcon /> CANCEL
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

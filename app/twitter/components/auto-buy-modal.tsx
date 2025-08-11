"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CircleUserRound, Target } from "lucide-react";
import { useState } from "react";

// A reusable component for the labeled input fields shown in the design.
const LabeledInput = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
      {label}
    </label>
    <div className="relative flex items-center">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-white placeholder:text-white/40 pr-12 py-6 rounded-md focus:ring-orange-500 focus:border-orange-500"
      />
      <span className="absolute right-4 text-white/60 text-sm font-mono">
        SOL
      </span>
    </div>
  </div>
);

export default function AddAutoBuyDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [buyAmount, setBuyAmount] = useState("");
  const [takeProfit1, setTakeProfit1] = useState("");
  const [takeProfit2, setTakeProfit2] = useState("");

  const handleConfirm = () => {
    // Logic to handle the confirmed values would go here.
    console.log("Confirmed Values:", { buyAmount, takeProfit1, takeProfit2 });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#0D0D0D] text-white border-2 border-solid border-[#333333] rounded-lg p-0 max-w-[420px] font-sans">
        {/* Dialog Header */}
        <DialogHeader className="flex flex-row items-center p-4 border-b border-[#333333] space-y-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <DialogTitle className="[font-family:'Space_Grotesk',Helvetica] text-lg font-bold uppercase ml-2">
            ADD AUTO BUY
          </DialogTitle>
        </DialogHeader>

        {/* Dialog Body */}
        <div className="p-6">
          <LabeledInput
            label="BUY AMOUNT"
            placeholder="EG. 0.222233"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
          />
          <LabeledInput
            label="TAKE PROFIT"
            placeholder="EG. 0.222233"
            value={takeProfit1}
            onChange={(e) => setTakeProfit1(e.target.value)}
          />
          <LabeledInput
            label="TAKE PROFIT"
            placeholder="EG. 0.222233"
            value={takeProfit2}
            onChange={(e) => setTakeProfit2(e.target.value)}
          />
          <hr className="border-t border-[#333333] mt-2" />
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="p-6 flex flex-col sm:flex-row sm:justify-center gap-4">
          <Button
            onClick={handleConfirm}
            className="w-full bg-[#ff4c02] text-white [font-family:'DM_Mono',Helvetica] rounded-lg px-6 py-5 text-sm font-bold hover:bg-[#e64a00] flex items-center gap-2"
          >
            <Target className="w-5 h-5" />
            CONFIRM TARGET
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full text-white/80 [font-family:'DM_Mono',Helvetica] border-[#333333] bg-black/50 hover:bg-[#1c1c1c] hover:text-white rounded-lg px-6 py-5 text-sm font-bold flex items-center gap-2"
          >
            <CircleUserRound className="w-5 h-5" />
            CANCEL
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

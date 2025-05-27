"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function TargetAddDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  const searchedAccounts = ["@ELONMUSK", "@CRYPTOGOD"].filter((account) =>
    account.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const suggestedAccounts = ["@CRYPTOGOD", "@ELONMUSK", "@ELONMUSK"];

  const handleAddAccount = (account: string) => {
    if (!selectedAccounts.includes(account)) {
      setSelectedAccounts([...selectedAccounts, account]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#05121a] text-white border-2 border-solid border-transparent rounded-lg p-0 max-w-[400px]">
        <DialogHeader className="p-6 border-b border-[#ffffff40]">
          <DialogTitle className="[font-family:'Space_Grotesk',Helvetica] text-xl font-bold uppercase">
            ADD TARGET
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="SEARCH ACCOUNT EG. (@CRYPTOGOD)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1a2a38] text-[#FFFFFFF2] border-[#ffffff26] placeholder-[#779cbf] pl-10 pr-4 py-2 rounded-md"
            />
            <Search className="absolute left-3 top-2.5 text-[#779cbf] w-5 h-5" />
          </div>
          {searchedAccounts.length > 0 && (
            <div className="mb-4">
              {searchedAccounts.map((account) => (
                <div
                  key={account}
                  className="flex items-center justify-between py-2 border-b border-[#ffffff26]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#2a3b4d] rounded-full" />
                    <span className="[font-family:'DM_Mono',Helvetica] text-[#FFFFFFA3]">
                      {account}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddAccount(account)}
                    className="text-[#779cbf] hover:text-[#ff4c02]"
                  >
                    <span className="text-xl">+</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="mb-4">
            <h3 className="[font-family:'Space_Grotesk',Helvetica] text-sm text-[#FFFFFFF2] mb-2">
              SUGGESTED ACCOUNTS
            </h3>
            {suggestedAccounts.map((account) => (
              <div
                key={account}
                className="flex items-center justify-between py-2 border-b border-[#ffffff26]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#2a3b4d] rounded-full" />
                  <span className="[font-family:'DM_Mono',Helvetica] text-[#FFFFFFA3]">
                    {account}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleAddAccount(account)}
                  className="text-[#779cbf] hover:text-[#ff4c02]"
                >
                  <span className="text-xl">+</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="p-6 border-t border-[#ffffff40] flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="text-[#FFFFFFA3] [font-family:'DM_Mono',Helvetica] border-[#ffffff40] bg-transparent hover:bg-[#2a3b4d] rounded-full px-6 py-2"
          >
            CANCEL
          </Button>
          <Button
            onClick={() => {
              // Handle confirm logic here
              setOpen(false);
            }}
            className="bg-[#ff4c02] text-white [font-family:'DM_Mono',Helvetica] rounded-full px-6 py-2 hover:bg-[#e64a00]"
          >
            CONFIRM TARGET
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Plus, Target, CircleUserRound, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AvatarIcon from "@/app/components/icons/avatar-icon";
import { useAddTarget } from "@/service/target";
import { toast } from "sonner";

// A placeholder for avatar icon, styled to match the design
const NewAvatarIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center">
    <AvatarIcon />
  </div>
);

// Mock data for demonstration
const allAccounts = [
  "ELONMUSK",
  "CRYPTOGOD",
  "VITALIK",
  "SBF_FTX",
  "CZ_BINANCE",
];
const suggestedAccounts = ["CRYPTOGOD", "ELONMUSK", "VITALIK", "SBF_FTX", "CZ_BINANCE"];

// Zod schema for form validation
const targetSchema = z.object({
  selectedAccount: z
    .string()
    .min(1, "Please select or enter a target account."),
  buyAmount: z.string().min(1, "Buy amount is required"),
  takeProfit: z.string().min(1, "Take profit is required"),
  stopLoss: z.string().min(1, "Stop loss is required"),
});

// A reusable component for displaying an account item in the list
const AccountItem = ({
  account,
  onAdd,
  isSelected,
}: {
  account: string;
  onAdd: (account: string) => void;
  isSelected: boolean;
}) => (
  <div
    className={`flex items-center justify-between py-3 px-3 rounded-md  transition-colors cursor-pointer ${
      isSelected
        ? "border-[#ff4c02] border bg-white/5"
        : " "
    }`}
    onClick={() => onAdd(account)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onAdd(account);
      }
    }}
  >
    <div className="flex items-center gap-4">
      <NewAvatarIcon />
      <span className="font-mono text-[#FFFFFFA3]">@{account}</span>
    </div>
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        onAdd(account);
      }}
      className="text-[#779cbf] hover:text-[#ff4c02] disabled:text-gray-500"
      disabled={isSelected}
    >
      <Plus className="w-5 h-5" />
    </Button>
  </div>
);

// A reusable component for the labeled input fields
const LabeledInput = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  showError = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showError?: boolean;
}) => {
  // Handle numeric input only
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow only numbers and decimal point
    const numericValue = inputValue.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return; // Don't update if there are multiple decimal points
    }
    
    // Create a new event with the numeric value
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: numericValue,
      },
    };
    
    onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className="w-full bg-[#0A141A] text-white border border-[#333333] placeholder:text-white/40 pr-12 py-6 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
        <span className="absolute right-4 text-white/60 text-sm font-mono">
          SOL
        </span>
      </div>
      {showError && error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default function TargetAddDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1 for target selection, 2 for auto buy settings
  const [showErrors, setShowErrors] = useState(false); // Track when to show errors

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof targetSchema>>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
    selectedAccount: "",
      buyAmount: "",
      takeProfit: "",
      stopLoss: "",
    },
  });

  const selectedAccount = watch("selectedAccount");
  const buyAmount = watch("buyAmount");
  const takeProfit = watch("takeProfit");
  const stopLoss = watch("stopLoss");

  const { mutate: addTarget, isPending } = useAddTarget();

  const searchedAccounts = allAccounts.filter(
    (account) =>
      account.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm
  );

  const handleAddAccount = (account: string) => {
    if (!account) return;
    setValue("selectedAccount", account, { shouldValidate: true });
  };

  const handleNextStep = () => {
    if (!selectedAccount) {
      toast.error('Please select or enter a target');
      return;
    }
    setCurrentStep(2);
    setShowErrors(false); // Reset error display when moving to next step
  };

  const handleBackStep = () => {
    setCurrentStep(1);
    setShowErrors(false); // Reset error display when going back
  };

  const onSubmit = (data: z.infer<typeof targetSchema>) => {
    setShowErrors(true);
    
    console.log("Confirmed Target Data:", data);
    
    addTarget({
      username: data.selectedAccount?.toLowerCase(),
      buyAmount: parseFloat(data.buyAmount) || 1,
      takeProfit: parseFloat(data.takeProfit) || 1,
      stopLoss: parseFloat(data.stopLoss) || 1,
      autoBuy: true
    }, {
      onSuccess: () => {
        toast.success("Target Successfully Added!");
        setOpen(false);
        reset();
        setCurrentStep(1);
        setShowErrors(false);
      },
      onError: () => {
        toast.error('Failed To Add Target');
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setCurrentStep(1);
    setShowErrors(false);
  };

  const gradientSvg = `url("data:image/svg+xml,%3csvg width='470' height='250' viewBox='0 0 470 250' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle opacity='0.13' cx='273' cy='-23.001' r='273' fill='url(%23paint0_radial_1006_4635)'/%3e%3cdefs%3e%3cradialGradient id='paint0_radial_1006_4635' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(273 -23.001) rotate(90) scale(273)'%3e%3cstop stop-color='%23FF4C02'/%3e%3cstop offset='1' stop-color='%23FF4C02' stop-opacity='0'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e")`;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#020C12] text-white border border-[#333333] rounded-lg overflow-hidden">
        {/* Background Gradients */}
        <div
          className="absolute top-0 right-0 pointer-events-none z-0"
          style={{
            width: "470px",
            height: "250px",
            backgroundImage: gradientSvg,
            backgroundRepeat: "no-repeat",
            transform: "translate(35%, -35%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 pointer-events-none z-0"
          style={{
            width: "270px",
            height: "250px",
            backgroundImage: gradientSvg,
            backgroundRepeat: "no-repeat",
            transform: "translate(-35%, 35%) rotate(180deg)",
          }}
        />

        {/* Content Wrapper */}
        <div className="relative z-10 bg-transparent">
          <DialogHeader className="p-6 border-b border-[#C6C6C6] flex flex-row items-center space-y-0">
            {currentStep === 2 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackStep}
                className="text-white/80 hover:text-white hover:bg-white/10 mr-2"
                disabled={isPending}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <DialogTitle className="[font-family:'Space_Grotesk',Helvetica] text-[17.59px] uppercase">
              {currentStep === 1 ? "ADD TARGET" : "ADD AUTO BUY"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6">
              {currentStep === 1 ? (
                // Step 1: Target Selection
                <>
                  <div className="relative mb-4">
                    <Input
                      type="text"
                      placeholder="SEARCH OR ENTER USERNAME EG. (@CRYPTOGOD)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const username = searchTerm.trim().replace(/^@/, '');
                          if (username) handleAddAccount(username);
                        }
                      }}
                      className="w-full bg-[#0A141A] text-white border border-[#333333] placeholder:text-white/40 pl-10 pr-4 py-5 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  </div>

                  {/* Quick add from manual input */}
                  {searchTerm.trim() && (
                    <div className="mb-4">
                      <AccountItem
                        account={searchTerm.trim().replace(/^@/, '')}
                        onAdd={handleAddAccount}
                        isSelected={selectedAccount === searchTerm.trim().replace(/^@/, '')}
                      />
                    </div>
                  )}

                  {/* Searched Accounts */}
                  {searchedAccounts.length > 0 && (
                    <div className="mb-4">
                      {searchedAccounts.map((account) => (
                        <AccountItem
                          key={`search-${account}`}
                          account={account}
                          onAdd={handleAddAccount}
                          isSelected={selectedAccount === account}
                        />
                      ))}
                    </div>
                  )}

                  {/* Suggested Accounts */}
                  <div className="mb-4">
                    <h3 className="[font-family:'Space_Grotesk',Helvetica] text-sm text-[#FFFFFFF2] mb-2 uppercase flex justify-between items-center">
                      SUGGESTED ACCOUNTS
                    </h3>
                    {suggestedAccounts.map((account) => (
                      <AccountItem
                        key={`suggest-${account}`}
                        account={account}
                        onAdd={handleAddAccount}
            isSelected={selectedAccount === account}
                      />
                    ))}
                  </div>
          {errors.selectedAccount && (
                    <p className="text-red-500 text-sm mt-2">
            {errors.selectedAccount.message}
                    </p>
                  )}
                </>
              ) : (
                // Step 2: Auto Buy Settings
                <>
          {selectedAccount && (
                    <div className="mb-6 p-4 bg-[#0A141A] rounded-md border border-[#C6C6C6]">
                      <h3 className="text-sm text-white/70 uppercase mb-2">Selected Target:</h3>
                      <div className="flex items-center gap-3">
                        <NewAvatarIcon />
            <span className="font-mono text-[#FFFFFFA3]">@{selectedAccount}</span>
                      </div>
                    </div>
                  )}

                  <LabeledInput
                    label="BUY AMOUNT"
                    placeholder="EG. 0.222233"
                    value={buyAmount}
                    onChange={(e) => setValue("buyAmount", e.target.value)}
                    error={errors.buyAmount?.message}
                    showError={showErrors}
                  />
                  <LabeledInput
                    label="TAKE PROFIT"
                    placeholder="EG. 0.222233"
                    value={takeProfit}
                    onChange={(e) => setValue("takeProfit", e.target.value)}
                    error={errors.takeProfit?.message}
                    showError={showErrors}
                  />
                  <LabeledInput
                    label="STOP LOSS"
                    placeholder="EG. 0.222233"
                    value={stopLoss}
                    onChange={(e) => setValue("stopLoss", e.target.value)}
                    error={errors.stopLoss?.message}
                    showError={showErrors}
                  />
                  <hr className="border-t border-[#333333] mt-2" />
                </>
              )}
            </div>

            <DialogFooter className="py-5 flex flex-col sm:flex-row justify-end gap-4 border-t border-[#C6C6C6]">
              {currentStep === 1 ? (
                // Step 1 Footer
                <>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-fit bg-[#ff4c02] text-white [font-family:'DM_Mono',Helvetica] rounded-[9.73px] px-4 py-4 text-sm font-bold hover:bg-[#e64a00] flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                    NEXT: AUTO BUY
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="w-fit text-white/80 [font-family:'DM_Mono',Helvetica] border-[#333333] bg-[#EDEDED08] hover:bg-[#2a2a2a] hover:text-white rounded-[9.73px] px-3 py-4 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <CircleUserRound className="w-5 h-5" />
                    CANCEL
                  </Button>
                </>
              ) : (
                // Step 2 Footer
                <>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-fit bg-[#ff4c02] text-white [font-family:'DM_Mono',Helvetica] rounded-[9.73px] px-4 py-4 text-sm font-bold hover:bg-[#e64a00] flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        CREATING...
                      </>
                    ) : (
                      <>
                        <Target className="w-5 h-5" />
                        CONFIRM TARGET
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isPending}
                    onClick={handleClose}
                    className="w-fit text-white/80 [font-family:'DM_Mono',Helvetica] border-[#333333] bg-[#EDEDED08] hover:bg-[#2a2a2a] hover:text-white rounded-[9.73px] px-3 py-4 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <CircleUserRound className="w-5 h-5" />
                    CANCEL
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon, Loader2, Wallet, User, Palette, Target, DollarSign } from "lucide-react";
import AvatarIcon from "@/app/components/icons/avatar-icon";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "@/utils/constants";
import { useGetUserProfile, useUpdateProfile } from "@/service/user";
import { toast } from "sonner";
import { colorThemes } from "@/utils/themes";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Card } from "@/components/ui/card";
import { useWalletBalance } from "@/hooks/useWalletBalance";

// Form schemas
const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  profilePicture: z.string().optional(),
});

const autoBuySchema = z.object({
  buyAmount: z.string().min(1, "Buy amount is required"),
  takeProfit: z.string().min(1, "Take profit is required"),
  stopLoss: z.string().min(1, "Stop loss is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type AutoBuyFormData = z.infer<typeof autoBuySchema>;

export default function SettingsContent() {
  const { publicKey, connect, disconnect, wallet } = useWallet();
  const pubKey = publicKey?.toBase58() ?? "";
  const { data: userprofile } = useGetUserProfile(pubKey);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { selectedTheme, setSelectedTheme } = useAppTheme();
  const { formattedBalance, isLoading: balanceLoading } = useWalletBalance();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for auto buy settings
  const [autoBuySettings, setAutoBuySettings] = useState({
    buyAmount: "0.1",
    takeProfit: "2.0",
    stopLoss: "0.5",
  });

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      profilePicture: "",
    },
  });

  // Auto buy form
  const autoBuyForm = useForm<AutoBuyFormData>({
    resolver: zodResolver(autoBuySchema),
    defaultValues: autoBuySettings,
  });

  const profilePicture = profileForm.watch("profilePicture");

  const initialProfilePictureUrl = useMemo(() => {
    const res = userprofile?.results as unknown;
    if (!res) return "";
    const pic = (res as { profilePicture?: unknown }).profilePicture;
    if (!pic) return "";
    if (typeof pic === "string") return pic;
    if (typeof pic === "object" && pic !== null) return (pic as { url?: string }).url ?? "";
    return "";
  }, [userprofile]);

  // Set default values from userprofile when loaded
  useEffect(() => {
    if (userprofile?.results) {
      profileForm.reset({
        username: userprofile.results.username ?? "",
  profilePicture: initialProfilePictureUrl,
      });
    }
  }, [userprofile, profileForm, initialProfilePictureUrl]);

  // Load saved auto buy settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("autoBuySettings");
    if (saved) {
      const settings = JSON.parse(saved);
      setAutoBuySettings(settings);
      autoBuyForm.reset(settings);
    }
  }, [autoBuyForm]);

  const handleThemeChange = (index: number) => {
    setSelectedTheme(index);
    toast.success("Theme updated successfully");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Accept common image types (png, jpeg, webp, etc.)
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          profileForm.setValue("profilePicture", result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file");
    }
  };

  const onProfileSubmit = (data: ProfileFormData) => {
    if (!publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    updateProfile(
      {
        publicKey: pubKey,
        profilePicture: data.profilePicture || '',
        username: data.username
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Profile updated successfully");
        },
        onError: () => {
          toast.error("Failed to update profile");
        },
      }
    );
  };

  const onAutoBuySubmit = (data: AutoBuyFormData) => {
    // Handle numeric input validation
    const numericData = {
      buyAmount: data.buyAmount.replace(/[^0-9.]/g, ''),
      takeProfit: data.takeProfit.replace(/[^0-9.]/g, ''),
      stopLoss: data.stopLoss.replace(/[^0-9.]/g, ''),
    };

    // Save to localStorage
    localStorage.setItem("autoBuySettings", JSON.stringify(numericData));
    setAutoBuySettings(numericData);
    toast.success("Auto buy settings saved successfully");
  };

  const handleConnectWallet = async () => {
    try {
      await connect();
      toast.success("Wallet connected successfully");
    } catch {
      toast.error("Failed to connect wallet");
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
    } catch {
      toast.error("Failed to disconnect wallet");
    }
  };

  // Handle numeric input for auto buy settings
  const handleNumericInput = (value: string, field: keyof AutoBuyFormData) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const parts = numericValue.split('.');
    if (parts.length > 2) return; // Prevent multiple decimal points
    
    autoBuyForm.setValue(field, numericValue);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-[40.41px] my-6 leading-[1%] text-[#FFFFFFBF]">
        SETTINGS
      </h2>

      {/* Wallet Connection Section */}
      <Card className="bg-[#FFFFFF0F] border-[#FFFFFF1C] p-6">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-5 h-5 text-[#FF4C02]" />
          <h3 className="text-lg font-semibold text-white">Wallet Connection</h3>
        </div>
        
        {publicKey ? (
          <div className="space-y-4">
            {/* Balance Overview Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FFFFFF08] rounded-lg border border-[#FFFFFF1C]">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-[#FF4C02]" />
                  <span className="text-sm text-[#8A8A8A]">Available Balance</span>
                </div>
                <p className="text-2xl font-mono text-white">
                  {balanceLoading ? (
                    <Loader2 className="animate-spin w-6 h-6 inline" />
                  ) : (
                    `${formattedBalance} SOL`
                  )}
                </p>
              </div>
              <div className="p-4 bg-[#FFFFFF08] rounded-lg border border-[#FFFFFF1C]">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-[#FF4C02]" />
                  <span className="text-sm text-[#8A8A8A]">Connected Wallet</span>
                </div>
                <p className="text-lg font-mono text-white">{shortenAddress(pubKey)}</p>
                <p className="text-xs text-[#8A8A8A] mt-1">{wallet?.adapter.name}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleDisconnectWallet}
                variant="outline" 
                className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
              >
                Disconnect Wallet
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-[#FFFFFF08] rounded-lg border border-[#FFFFFF1C]">
            <Wallet className="w-12 h-12 text-[#8A8A8A] mx-auto mb-4" />
            <p className="text-[#8A8A8A] mb-4">Connect your wallet to access all settings</p>
            <Button 
              onClick={handleConnectWallet}
              className="bg-[#FF4C02] hover:bg-[#e64a00] text-white"
            >
              Connect Wallet
            </Button>
          </div>
        )}
      </Card>

      {/* User Profile Section */}
      <Card className="bg-[#FFFFFF0F] border-[#FFFFFF1C] p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-[#FF4C02]" />
          <h3 className="text-lg font-semibold text-white">User Profile</h3>
        </div>

        {publicKey ? (
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex flex-col gap-2">
                <div className="w-16 h-16">
                  {(profilePicture || initialProfilePictureUrl) ? (
                    <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                      <img
                        src={profilePicture || initialProfilePictureUrl}
                        alt="profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <AvatarIcon />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#8A8A8A] text-xs hover:text-white transition-colors"
                >
                  Upload picture
                </button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm text-white mb-2">USERNAME</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                    <Input
                      {...profileForm.register("username")}
                      className="py-3 pl-8 text-white"
                      placeholder="Enter username"
                    />
                    {profileForm.formState.errors.username && (
                      <p className="text-sm text-red-500 mt-1">
                        {profileForm.formState.errors.username.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isUpdating || !publicKey}
                  className="bg-[#FF4C02] hover:bg-[#e64a00] text-white disabled:opacity-50"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center p-8 bg-[#FFFFFF08] rounded-lg border border-[#FFFFFF1C]">
            <User className="w-12 h-12 text-[#8A8A8A] mx-auto mb-4" />
            <p className="text-[#8A8A8A]">Connect your wallet to manage your profile</p>
          </div>
        )}
      </Card>

      {/* Appearance Settings */}
      <Card className="bg-[#FFFFFF0F] border-[#FFFFFF1C] p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-5 h-5 text-[#FF4C02]" />
          <h3 className="text-lg font-semibold text-white">Appearance</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-2">THEME</label>
            <p className="text-sm text-[#8A8A8A] mb-4">
              Choose a preferred theme for background gradient
            </p>
            <div className="flex gap-3 flex-wrap">
              {colorThemes.map((theme, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleThemeChange(index)}
                  className={`w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 ${
                    index === selectedTheme 
                      ? "ring-2 ring-white ring-offset-2 ring-offset-transparent" 
                      : ""
                  }`}
                  style={{ backgroundColor: theme.color }}
                  title={theme.name}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Auto Buy Settings */}
      <Card className="bg-[#FFFFFF0F] border-[#FFFFFF1C] p-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-5 h-5 text-[#FF4C02]" />
          <h3 className="text-lg font-semibold text-white">Auto Buy Settings</h3>
        </div>

        {publicKey ? (
          <form onSubmit={autoBuyForm.handleSubmit(onAutoBuySubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  BUY AMOUNT
                </label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="0.1"
                    value={autoBuyForm.watch("buyAmount")}
                    onChange={(e) => handleNumericInput(e.target.value, "buyAmount")}
                    className="w-full text-white placeholder:text-white/40 pr-12 py-6 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                  <span className="absolute right-4 text-white/60 text-sm font-mono">SOL</span>
                </div>
                {autoBuyForm.formState.errors.buyAmount && (
                  <p className="text-red-500 text-sm mt-2">
                    {autoBuyForm.formState.errors.buyAmount.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  TAKE PROFIT
                </label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="2.0"
                    value={autoBuyForm.watch("takeProfit")}
                    onChange={(e) => handleNumericInput(e.target.value, "takeProfit")}
                    className="w-full text-white placeholder:text-white/40 pr-12 py-6 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                  <span className="absolute right-4 text-white/60 text-sm font-mono">SOL</span>
                </div>
                {autoBuyForm.formState.errors.takeProfit && (
                  <p className="text-red-500 text-sm mt-2">
                    {autoBuyForm.formState.errors.takeProfit.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  STOP LOSS
                </label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="0.5"
                    value={autoBuyForm.watch("stopLoss")}
                    onChange={(e) => handleNumericInput(e.target.value, "stopLoss")}
                    className="w-full text-white placeholder:text-white/40 pr-12 py-6 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                  <span className="absolute right-4 text-white/60 text-sm font-mono">SOL</span>
                </div>
                {autoBuyForm.formState.errors.stopLoss && (
                  <p className="text-red-500 text-sm mt-2">
                    {autoBuyForm.formState.errors.stopLoss.message}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-[#FFFFFF08] p-4 rounded-lg border border-[#FFFFFF1C]">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-[#FF4C02]" />
                <span className="text-sm font-semibold text-white">Current Settings</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-[#8A8A8A]">Buy Amount:</span>
                  <span className="text-white ml-2">{autoBuySettings.buyAmount} SOL</span>
                </div>
                <div>
                  <span className="text-[#8A8A8A]">Take Profit:</span>
                  <span className="text-white ml-2">{autoBuySettings.takeProfit} SOL</span>
                </div>
                <div>
                  <span className="text-[#8A8A8A]">Stop Loss:</span>
                  <span className="text-white ml-2">{autoBuySettings.stopLoss} SOL</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-[#FF4C02] hover:bg-[#e64a00] text-white"
            >
              Save Auto Buy Settings
            </Button>
          </form>
        ) : (
          <div className="text-center p-8 bg-[#FFFFFF08] rounded-lg border border-[#FFFFFF1C]">
            <Target className="w-12 h-12 text-[#8A8A8A] mx-auto mb-4" />
            <p className="text-[#8A8A8A]">Connect your wallet to configure auto buy settings</p>
          </div>
        )}
      </Card>

      {/* Twitter Connection Section */}
      <Card className="bg-[#FFFFFF0F] border-[#FFFFFF1C] p-6">
        <div className="flex items-center gap-3 mb-6">
          <LinkIcon className="w-5 h-5 text-[#FF4C02]" />
          <h3 className="text-lg font-semibold text-white">Social Connections</h3>
        </div>
        
        {publicKey ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">TWITTER ACCOUNT</label>
              <Button 
                className="w-full bg-[#FF4C02] hover:bg-[#e64a00] text-white py-3"
                disabled
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                CONNECT TWITTER (Coming Soon)
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-[#FFFFFF08] rounded-lg border border-[#FFFFFF1C]">
            <LinkIcon className="w-12 h-12 text-[#8A8A8A] mx-auto mb-4" />
            <p className="text-[#8A8A8A]">Connect your wallet to link social accounts</p>
          </div>
        )}
      </Card>
    </div>
  );
}

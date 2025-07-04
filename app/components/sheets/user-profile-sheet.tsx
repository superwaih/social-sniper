/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon } from "lucide-react";
import AvatarIcon from "../icons/avatar-icon";
import { useWallet } from "@solana/wallet-adapter-react";
import { colorThemes, shortenAddress } from "@/utils/constants";
import { useUpdateProfile } from "@/service/user";
import { toast } from "sonner";

interface IUserData {
  publicKey: string;
  username?: string;
  profilePicture?: string;
}

interface ColorTheme {
  color: string;
  gradient: string;
  name: string;
}

export default function UserProfileSidebar() {
  const { publicKey } = useWallet();
  const [selectedTheme, setSelectedTheme] = useState<number>(2);
  const [username, setUsername] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const handleThemeChange = (index: number) => {
    setSelectedTheme(index);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setProfilePicture(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a PNG image");
    }
  };

  const handleUpdateProfile = () => {
    if (!publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    const userData: IUserData = {
      publicKey: publicKey.toBase58(),
      username: username || undefined,
      profilePicture: '',
    };

    updateProfile(userData, {
      onSuccess: (res: { message?: string }) => {
        toast.success(res.message || "Profile updated successfully");
      },
      onError: () => {
        toast.error("Failed to update profile");
      },
    });
  };

  return (
    <Sheet modal>
      <SheetTrigger asChild>
        <div className="ml-4 cursor-pointer text-gray-400 hover:text-white">
          <AvatarIcon />
        </div>
      </SheetTrigger>
      <SheetTitle></SheetTitle>
      <SheetContent
        style={{
          width: "540px",
          border: "1px solid",
          borderImageSource:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(153, 153, 153, 0.08) 100%)",
          borderImageSlice: 1,
          background: colorThemes[selectedTheme].gradient,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        side="right"
        className="text-white"
      >
        <div className="space-y-8">
          <div className="flex gap-4 py-5 border-b border-[#FFFFFF3B] items-center">
            <div className="flex flex-col gap-2">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <AvatarIcon />
              )}
              <input
                type="file"
                accept="image/png"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[#8A8A8A] text-xs hover:text-white"
              >
                Upload picture
              </button>
            </div>
            <div className="text-[29.41px] text-white mt-2">
              {shortenAddress(publicKey?.toBase58() ?? 'Connect Wallet')}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-white">USERNAME</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                @
              </span>
              <Input
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                className="bg-[#FFFFFF1C] !py-3 border-[#000000] border pl-8 text-white"
                placeholder="Enter username"
              />
            </div>
          </div>

          <Button
            onClick={handleUpdateProfile}
            disabled={isUpdating || !publicKey}
            className="w-full py-3 bg-[#FF4C02] hover:bg-[#FF4C02] text-white disabled:opacity-50"
          >
            {isUpdating ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
          
          <div className="space-y-4">
            <label className="text-sm text-white">APPEARANCE</label>
            <div className="text-sm text-[#8A8A8A]">
              Choose a preferred theme for background gradient
            </div>
            <div className="flex gap-3">
              {colorThemes.map((theme: ColorTheme, index: number) => (
                <button
                  key={index}
                  onClick={() => handleThemeChange(index)}
                  className={`w-10 h-10 rounded-full ${theme.color} transition-all duration-200 hover:scale-110 ${
                    index === selectedTheme ? "ring-2 ring-white ring-offset-2 ring-offset-transparent" : ""
                  }`}
                  title={theme.name}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-sm text-gray-400">
              TWITTER ACCOUNT
            </label>
            <Button className="w-full py-3 bg-[#FF4C02] hover:bg-[#FF4C02] text-white">
              <LinkIcon className="mr-2 h-4 w-4" />
              CONNECT TWITTER
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
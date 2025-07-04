"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon } from "lucide-react";
import AvatarIcon from "../icons/avatar-icon";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "@/utils/constants";

const colorThemes = [
  { 
    color: "bg-[#1DA1F2]", 
    gradient: "linear-gradient(135deg, rgba(29, 161, 242, 0.2) 0%, rgba(29, 161, 242, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Twitter Blue"
  },
  { 
    color: "bg-[#FF9500]", 
    gradient: "linear-gradient(135deg, rgba(255, 149, 0, 0.2) 0%, rgba(255, 149, 0, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Orange"
  },
  { 
    color: "bg-[#7C3AED]", 
    gradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(124, 58, 237, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Purple"
  },
  { 
    color: "bg-[#4F46E5]", 
    gradient: "linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(79, 70, 229, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Indigo"
  },
  { 
    color: "bg-[#e05c14]", 
    gradient: "linear-gradient(135deg, rgba(224, 92, 20, 0.2) 0%, rgba(224, 92, 20, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Brand Orange"
  },
];

export default function UserProfileSidebar() {
    const { publicKey } = useWallet();
  const [selectedTheme, setSelectedTheme] = useState(2); // Default to purple theme

  const handleThemeChange = (index: number) => {
    setSelectedTheme(index);
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
              <AvatarIcon />
              <p className="text-[#8A8A8A] text-xs">upload picture</p>
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
                defaultValue=""
                className="bg-[#FFFFFF1C] !py-3 border-[#000000] border pl-8 text-white"
              />
            </div>
          </div>
          
          {/* Appearance */}
          <div className="space-y-4">
            <label className="text-sm text-white">APPEARANCE</label>
            <div className="text-sm text-[#8A8A8A]">
              Choose a preferred theme for background gradient
            </div>
            <div className="flex gap-3">
              {colorThemes.map((theme, index) => (
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
            {/* <div className="text-xs text-[#8A8A8A] mt-2">
              Selected: {colorThemes[selectedTheme].name}
            </div> */}
          </div>
          
          {/* Twitter Account */}
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
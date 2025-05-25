"use client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Link as LinkIcon } from "lucide-react";
import AvatarIcon from "../icons/avatar-icon";

const colorThemes = [
  { color: "bg-[#1DA1F2]" }, // Twitter Blue
  { color: "bg-[#FF9500]" }, // Orange
  { color: "bg-[#7C3AED]" }, // Purple
  { color: "bg-[#4F46E5]" }, // Indigo
  { color: "bg-[#e05c14]" }, // Brand Orange
];

export default function UserProfileSidebar() {
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
          backgroundColor: "rgba(5, 18, 26, 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        side="right"
        className="text-white"

        // className="bg-[#05121A]/60 backdrop-blur-md border border-white/10 shadow-xl"
        // style={{ width: "540px" }}
        // className="bg-[#05121A] border-[rgba(40,107,151,0.47)] after:opacity-50"
        // side="right"
      >
        <div className="space-y-8">
          <div className="flex gap-4 py-5 border-b border-[#FFFFFF3B]    items-center">
            <div className="flex flex-col gap-2">
              <AvatarIcon />
              <p className="text-[#8A8A8A] text-xs">upload picture</p>
            </div>
            <div className="font-mono text-[29.41px] text-white mt-2">
              0XFF98...7890
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white font-mono">USERNAME</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                @
              </span>
              <Input
                defaultValue="JAAMEY_STONE"
                className="bg-[#FFFFFF1C] !py-3 border-[#000000] border pl-8 font-mono text-white"
              />
            </div>
          </div>

          {/* Appearance */}
          <div className="space-y-4">
            <label className="text-sm text-white font-mono">APPEARANCE</label>
            <div className="text-sm text-[#8A8A8A]">
              Choose a preferred theme for
            </div>
            <div className="flex gap-3">
              {colorThemes.map((theme, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-full ${theme.color} ${
                    index === 2 ? "ring-2 ring-white" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Twitter Account */}
          <div className="space-y-4">
            <label className="text-sm text-gray-400 font-mono">
              TWITTER ACCOUNT
            </label>
            <Button className="w-full py-3 bg-[#FF4C02] hover:bg-[#FF4C02] text-white font-mono">
              <LinkIcon className="mr-2 h-4 w-4" />
              CONNECT TWITTER
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

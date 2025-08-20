/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon, Loader2 } from "lucide-react";
import AvatarIcon from "../icons/avatar-icon";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "@/utils/constants";
import { useGetUserProfile, useUpdateProfile } from "@/service/user";
import { toast } from "sonner";
import { colorThemes } from "@/utils/themes";
import { useAppTheme } from "@/hooks/useAppTheme";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  profilePicture: z.string().optional(), // base64 or URL
});

type FormData = z.infer<typeof formSchema>;

export default function UserProfileSidebar() {
  const { publicKey } = useWallet();
  const pubKey = publicKey?.toBase58() ?? "";
  const { data: userprofile } = useGetUserProfile(pubKey);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { selectedTheme, setSelectedTheme, currentTheme } = useAppTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      profilePicture: "",
    },
  });
  const profilePicture = watch("profilePicture");


  const initialProfilePictureUrl = useMemo(() => {
    const res = userprofile?.results as unknown;
    if (!res) return "";
    const pic = (res as { profilePicture?: unknown }).profilePicture;
    if (!pic) return "";
    if (typeof pic === "string") return pic;
    if (typeof pic === "object" && pic !== null) return (pic as { url?: string }).url ?? "";
    return "";
  }, [userprofile]);

  useEffect(() => {
    if (userprofile?.results) {
      reset({
        username: userprofile.results.username ?? "",
        profilePicture: initialProfilePictureUrl,
      });
    }
  }, [userprofile, reset, initialProfilePictureUrl]);

  const handleThemeChange = (index: number) => {
    setSelectedTheme(index);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  // Accept common image types (png, jpeg, webp, etc.)
  if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          setValue("profilePicture", result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file");
    }
  };

  const onSubmit = (data: FormData) => {
    if (!publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    updateProfile(
      {
        publicKey: pubKey,
        profilePicture: data.profilePicture,
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
console.log(profilePicture, 'rpofiel')
  return (
    <Sheet modal>
      <SheetTrigger asChild>
        <div className="ml-4 cursor-pointer text-gray-400 hover:text-white">
          {(profilePicture || initialProfilePictureUrl) ? (
            <img
              src={profilePicture || initialProfilePictureUrl}
              alt="profile"
              className="size-12 rounded-full object-cover"
            />
          ) : (
            <AvatarIcon />
          )}
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
          background: currentTheme.gradient || "#05121A",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        side="right"
        className="text-white  overflow-hidden"
      >
        {/* Background Gradients for Default Theme */}
        {selectedTheme === 0 && (
          <>
            {/* Top Right Gradient */}
            <div
              className="w-[648px] h-[648px] top-[-349px] right-[-200px] rounded-[324px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-30"
            />
            {/* Bottom Left Gradient */}
            <div
              className="w-[648px] h-[648px] bottom-[-349px] left-[-200px] rounded-[324px] absolute [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,76,2,1)_0%,rgba(255,76,2,0)_100%)] opacity-30"
            />
          </>
        )}
        
        {/* Main Content */}
        <div className="relative z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4 py-5 border-b border-[#FFFFFF3B] items-center">
            <div className="flex flex-col gap-2">
              {profilePicture ? (
                <img className="size-[60px] rounded-full object-cover" src={profilePicture} alt="auth image" />
              ) : (
                <AvatarIcon />
              )}
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
                className="text-[#8A8A8A] text-xs hover:text-white"
              >
                Upload picture
              </button>
            </div>
            <div className="text-[29.41px] text-white mt-2">
              {shortenAddress(pubKey || "Connect Wallet")}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white">USERNAME</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                @
              </span>
              <Input
                {...register("username")}
                className="!py-3 pl-8 text-white"
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating || !publicKey}
            className="w-full py-3 flex items-center justify-center  rounded-md bg-[#FF4C02] hover:bg-[#FF4C02] text-white disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" />
            ) : null}
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>

          <div className="space-y-4">
            <label className="text-sm text-white">APPEARANCE</label>
            <div className="text-sm text-[#8A8A8A]">
              Choose a preferred theme for background gradient
            </div>
            <div className="flex gap-3">
              {colorThemes.map((theme, index) => {
                return(
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleThemeChange(index)}
                    className={`w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 ${
                      index === selectedTheme ? "ring-2 ring-white ring-offset-2 ring-offset-transparent" : ""
                    }`}
                    style={{ backgroundColor: theme.color }}
                    title={theme.name}
                  />
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-gray-400">TWITTER ACCOUNT</label>
            <Button className="w-full py-3 bg-[#FF4C02] hover:bg-[#FF4C02] text-white">
              <LinkIcon className="mr-2 h-4 w-4" />
              CONNECT TWITTER
            </Button>
          </div>
        </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { cn } from "@/lib/utils";
import { Icons } from "./icons";

// Define valid status values
type Status = "Active" | "Detected" | "Inactive" | "Not Yet" | "Idle" | "Failed";

interface StatusIndicatorProps {
  status: string; // Keep as string for flexibility, but normalize below
  className?: string;
}

const statusConfig: Record<Status, { icon: React.ComponentType<{ className?: string }>; styles: string }> = {
  Active: {
    icon: Icons.detectedIcon,
    styles: "bg-[#22900036] border-[#229000F2]",
  },
  Detected: {
    icon: Icons.detectedIcon,
    styles: "bg-[#22900036] border-[#229000F2]",
  },
  Inactive: {
    icon: Icons.redwarningIcon,
    styles: "bg-[#FF000021] border-[#FF0000]",
  },
  "Not Yet": {
    icon: Icons.redwarningIcon,
    styles: "bg-[#FF000021] border-[#FF0000]",
  },
  Idle: {
    icon: Icons.idleIcon,
    styles: "bg-[#FFBA0021] border-[#FFBA00]",
  },
  Failed: {
    icon: Icons.redwarningIcon,
    styles: "bg-[#FF000021] border-[#FF0000]",
  },
};

export default function StatusIndicator({ status, className }: StatusIndicatorProps) {
  // Normalize status to match keys in statusConfig (e.g., case-insensitive)
  const normalizedStatus = Object.keys(statusConfig).find(
    (key) => key.toLowerCase() === status.toLowerCase()
  ) as Status | undefined;

  if (!normalizedStatus) {
    // Fallback UI for invalid status
    return (
      <div
        className={cn(
          "flex gap-2 items-center justify-center border rounded-md px-4 py-1 bg-gray-100 text-gray-500",
          className
        )}
      >
        <span>Unknown Status</span>
      </div>
    );
  }

  const config = statusConfig[normalizedStatus];


  const IconComponent = config.icon || (() => <span className="size-4">?</span>);

  return (
    <div
      className={cn(
        "flex gap-2 items-center max-w-[120px] w-full justify-center border rounded-md px-4 py-1",
        config.styles,
        className
      )}
    >
      <IconComponent className="size-4" />
      <span>{normalizedStatus}</span>
    </div>
  );
}
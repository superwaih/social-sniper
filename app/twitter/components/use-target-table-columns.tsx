import StatusIndicator from "@/components/shared/status-indicator";
import { AutoBuyTarget } from "./types";
import TargetActionsDropdown from "./target-actions-dropdown";

interface UseTargetTableColumnsProps {
  dropdownOpen: string | null;
  setDropdownOpen: (open: string | null) => void;
  onDeleteClick: (target: AutoBuyTarget) => void;
  onDisableTarget?: (target: AutoBuyTarget) => void;
  onEditAutoBuy?: (target: AutoBuyTarget) => void;
  onEditTokenFilter?: (target: AutoBuyTarget) => void;
  onViewTweets?: (target: AutoBuyTarget) => void;
  onResetFilter?: (target: AutoBuyTarget) => void;
}

export function useTargetTableColumns({
  dropdownOpen,
  setDropdownOpen,
  onDeleteClick,
  onDisableTarget,
  onEditAutoBuy,
  onEditTokenFilter,
  onViewTweets,
  onResetFilter,
}: UseTargetTableColumnsProps) {
  return [
    {
      header: "ACCOUNT",
      accessor: (token: AutoBuyTarget) => (
        <span className="font-semibold text-white">{token.twitterUsername}</span>
      ),
      className: "text-white font-pixel",
    },
    {
      header: "MENTIONS 24H",
      accessor: (token: AutoBuyTarget) => (
        <span className="text-white">{token.mentionHour}</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "FOLLOWERS",
      accessor: (token: AutoBuyTarget) => (
        <span className="text-white">{token.followers}</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "LAST ACTIVITY",
      accessor: (token: AutoBuyTarget) => (
        <span className="text-white">{token.lastActivity}</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "AUTO BUY",
      accessor: (token: AutoBuyTarget) => (
        <span className="text-white">{token.autoBuy ? "✅ ON" : "❌ OFF"}</span>
      ),
      className: "text-white font-grok",
    },
    {
      header: "STATUS",
      accessor: (token: AutoBuyTarget) => (
        <StatusIndicator
          status={token.status === "active" ? "Active" : "Idle"}
        />
      ),
      className: "text-white",
    },
    {
      header: "ACTIONS",
      accessor: (token: AutoBuyTarget) => (
        <TargetActionsDropdown
          target={token}
          isOpen={dropdownOpen === token._id}
          onOpenChange={(open) => setDropdownOpen(open ? token._id : null)}
          onDeleteClick={onDeleteClick}
          onDisableTarget={onDisableTarget}
          onEditAutoBuy={onEditAutoBuy}
          onEditTokenFilter={onEditTokenFilter}
          onViewTweets={onViewTweets}
          onResetFilter={onResetFilter}
        />
      ),
      className: "text-white text-center",
    },
  ];
}

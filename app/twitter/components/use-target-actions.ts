import { useState } from "react";
import { AutoBuyTarget } from "./types";
import { useDeleteTarget } from "@/service/target";
import { toast } from "sonner";

export function useTargetActions() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<AutoBuyTarget | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const { mutate: deleteTarget, isPending: isDeleting } = useDeleteTarget();

  const handleDeleteClick = (target: AutoBuyTarget) => {
    setSelectedTarget(target);
    setIsDeleteModalOpen(true);
    setDropdownOpen(null); // Close dropdown when modal opens
  };

  const handleConfirmDelete = () => {
    if (selectedTarget) {
      console.log("Deleting target:", selectedTarget);
      // TODO: Replace with actual API call
      deleteTarget(selectedTarget.twitterUsername, {
        onSuccess: () => {
          console.log("Target deleted successfully");
          toast.success("Target deleted successfully");
    handleModalClose(false);

        },
        onError: (error) => {
          console.error("Error deleting target:", error);
          toast.error("Error deleting target");
    handleModalClose(false);

        },
      })
      // await deleteTarget(selectedTarget._id);
    }
  };

  const handleModalClose = (open: boolean) => {
    setIsDeleteModalOpen(open);
    if (!open) {
      setSelectedTarget(null);
      setDropdownOpen(null); // Reset dropdown state when modal closes
    }
  };

  // Placeholder handlers for other actions
  const handleDisableTarget = (target: AutoBuyTarget) => {
    console.log("Disable target:", target);
    setDropdownOpen(null);
    // TODO: Implement disable target logic
  };

  const handleEditAutoBuy = (target: AutoBuyTarget) => {
    console.log("Edit auto buy:", target);
    setDropdownOpen(null);
    // TODO: Implement edit auto buy logic
  };

  const handleEditTokenFilter = (target: AutoBuyTarget) => {
    console.log("Edit token filter:", target);
    setDropdownOpen(null);
    // TODO: Implement edit token filter logic
  };

  const handleViewTweets = (target: AutoBuyTarget) => {
    console.log("View tweets:", target);
    setDropdownOpen(null);
    // TODO: Implement view tweets logic
  };

  const handleResetFilter = (target: AutoBuyTarget) => {
    console.log("Reset filter:", target);
    setDropdownOpen(null);
    // TODO: Implement reset filter logic
  };

  return {
    isDeleteModalOpen,
    selectedTarget,
    dropdownOpen,
    setDropdownOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleModalClose,
    handleDisableTarget,
    handleEditAutoBuy,
    handleEditTokenFilter,
    handleViewTweets,
    handleResetFilter,
    isDeleting
  };
}

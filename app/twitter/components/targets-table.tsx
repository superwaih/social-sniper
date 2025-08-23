"use client";

import { DataTable } from "@/components/shared/data-table";
import { ITargetTableProps } from "./types";
import { useTargetActions } from "./use-target-actions";
import { useTargetTableColumns } from "./use-target-table-columns";
import DeleteTargetModal from "./delete-target-modal";

export default function TargetsTable({ data, isLoading }: ITargetTableProps) {
  const {
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
  } = useTargetActions();

  const columns = useTargetTableColumns({
    dropdownOpen,
    setDropdownOpen,
    onDeleteClick: handleDeleteClick,
    onDisableTarget: handleDisableTarget,
    onEditAutoBuy: handleEditAutoBuy,
    onEditTokenFilter: handleEditTokenFilter,
    onViewTweets: handleViewTweets,
    onResetFilter: handleResetFilter,
  });

  return (
    <div>
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyText="No target account yet! Add new target"
      />

      <DeleteTargetModal
        isOpen={isDeleteModalOpen}
        onOpenChange={handleModalClose}
        target={selectedTarget}
        isLoading={isDeleting}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}

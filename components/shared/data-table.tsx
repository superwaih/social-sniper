import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Skeleton loader
const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-[#1A1F2E] animate-pulse rounded-md", className)} />
);

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
  }[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  emptyText?: string;
  emptyButtonText?: string;
  onEmptyButtonClick?: () => void;
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  onRowClick,
  emptyText,
  emptyButtonText,
  onEmptyButtonClick,
}: DataTableProps<T>) {
  
  const skeletonRows = Array.from({ length: 10 });

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#1F2937] bg-[#0B0E14]">
      <Table className="w-full table-auto text-sm">
        {/* Table Header */}
        <TableHeader className="bg-[#0F1621] border-b border-[#1F2937]">
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  "uppercase text-[11px] font-semibold tracking-wider text-[#779CBF] py-3 px-4 whitespace-nowrap",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {isLoading ? (
            skeletonRows.map((_, rowIndex) => (
              <TableRow key={rowIndex} className="border-b border-[#1F2937]">
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={cn("py-3 px-4 whitespace-nowrap bg-transparent", column.className)}
                  >
                    <Skeleton className="h-4 w-full max-w-[120px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-10 text-[#779CBF]"
              >
                <div className="space-y-2 flex flex-col p-8 items-center justify-center">
                  {emptyText && <p className="text-[#BEBEBE]">{emptyText}</p>}
                  {emptyButtonText && onEmptyButtonClick && (
                    <button
                      onClick={onEmptyButtonClick}
                      className="underline text-sm hover:text-white transition"
                    >
                      {emptyButtonText}
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border border-[#152E3D] hover:bg-[#0A141A] transition-colors cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={cn(
                      "py-3 px-4 whitespace-nowrap text-[#FFFFFF]",
                      column.className
                    )}
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(row)
                      : (row[column.accessor] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

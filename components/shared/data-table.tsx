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

// Optional: Simple Skeleton component
const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-gray-200 animate-pulse rounded-md", className)} />
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
  emptyText?: string; // Optional empty state text
  emptyButtonText?: string; // Optional button label
  onEmptyButtonClick?: () => void; // Optional button click handler
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
    <div className="w-full  overflow-x-auto rounded-[8px] overflow-hidden">
      <Table className="w-full  table-auto">
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  "uppercase text-[13px] tracking-wider text-[#779CBF] whitespace-nowrap",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            skeletonRows.map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={cn("whitespace-nowrap bg-transparent", column.className)}
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
                className="text-center py-10 text-[#779CBF] font-mono tracking-wide"
              >
                <div className="space-y-2 flex flex-col p-8 items-center justify-center">
                  {emptyText && <p  className="text-[#BEBEBE] capitalize">{emptyText}</p>}
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
                className="transition-colors cursor-pointer w-full"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={cn("whitespace-nowrap bg-transparent", column.className)}
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

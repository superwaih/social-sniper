import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
  }[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({ data, columns, onRowClick }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-[8px]  overflow-hidden">
      <Table className="w-full table-auto">
        <TableHeader className="">
          <TableRow >
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  "uppercase text-[15px] !text-[#2F4857] whitespace-nowrap",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
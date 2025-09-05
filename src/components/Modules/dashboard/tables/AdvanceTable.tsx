/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";
import {
  Download,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
  Loader2,
  FileSpreadsheet,
} from "lucide-react";
import * as XLSX from "xlsx";
import { AdvancedTableProps, TableConfig } from "@/lib/types";

// Enhanced interfaces

// Default configuration
const defaultConfig: TableConfig = {
  enableSorting: true,
  enableFiltering: true,
  enablePagination: true,
  enableColumnVisibility: false,
  enableExport: true,
  enableRowSelection: false,
  showTableInfo: true,
  stickyHeader: false,
};

export function AdvancedTable<T extends Record<string, any>>({
  title,
  subtitle,
  columns,
  data,
  loading = false,
  error,
  config = {},
  pageSizeOptions = [5, 10, 20, 50, 100],
  defaultPageSize = 10,
  exportFileName,
  exportSheetName = "Sheet1",
  rowActions,
  bulkActions,
  emptyState,
  loadingState,
  errorState,
  onRowClick,
  onDataChange,
}: AdvancedTableProps<T>) {
  // Merge with default config
  const tableConfig = { ...defaultConfig, ...config };

  // State management
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  // Enhanced columns with actions
  const enhancedColumns = useMemo<ColumnDef<T>[]>(() => {
    const cols = [...columns];

    // Add row selection column if enabled
    if (tableConfig.enableRowSelection) {
      cols.unshift({
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={!!table.getIsAllPageRowsSelected()}
            onChange={(e) =>
              table.toggleAllPageRowsSelected(!!e.target.checked)
            }
            className="rounded border border-input"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={!!row.getIsSelected()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
            className="rounded border border-input"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    // Add actions column if actions are provided
    if (rowActions && rowActions.length > 0) {
      cols.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            {rowActions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant={action.variant || "outline"}
                onClick={() => action.onClick(row.original)}
                disabled={action.disabled?.(row.original)}
                className="h-8 px-2"
              >
                {action.icon && <action.icon className="h-3 w-3 mr-1" />}
                {action.label}
              </Button>
            ))}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    return cols;
  }, [columns, rowActions, tableConfig.enableRowSelection]);

  // Table configuration
  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: tableConfig.enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: tableConfig.enableSorting
      ? getSortedRowModel()
      : undefined,
    getFilteredRowModel: tableConfig.enableFiltering
      ? getFilteredRowModel()
      : undefined,
    globalFilterFn: "includesString",
  });

  // Export functionality
  const exportToExcel = () => {
    const filename =
      exportFileName ||
      `${title.toLowerCase().replace(/\s+/g, "_")}_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

    // Get filtered and sorted data
    const exportData = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, exportSheetName);
    XLSX.writeFile(workbook, filename);
  };

  // Selected rows data
  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);

  // Render loading state
  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          {loadingState || (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading {title.toLowerCase()}...</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card>
        <CardContent className="p-8">
          {errorState || (
            <div className="text-center text-red-600">
              <p>
                Error loading {title.toLowerCase()}: {error}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>

          <div className="flex items-center gap-2">
            {/* Bulk actions */}
            {tableConfig.enableRowSelection &&
              bulkActions &&
              selectedRows.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Actions ({selectedRows.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {bulkActions.map((action, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => action.onClick(selectedRows)}
                      >
                        {action.icon && (
                          <action.icon className="h-4 w-4 mr-2" />
                        )}
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

            {/* Column visibility toggle */}
            {tableConfig.enableColumnVisibility && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuItem
                        key={column.id}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          column.toggleVisibility(!column.getIsVisible());
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={() => {
                            // This will be handled by the parent onClick
                          }}
                          className="mr-2"
                          readOnly
                        />
                        {column.columnDef.header?.toString() || column.id}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Export button */}
            {tableConfig.enableExport && (
              <Button onClick={exportToExcel} variant="outline" size="sm">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search and pagination controls */}
        <div className="flex items-center justify-between">
          {tableConfig.enableFiltering && (
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Search ${title.toLowerCase()}...`}
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          )}

          {tableConfig.enablePagination && (
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Rows per page</p>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Table info */}
        {tableConfig.showTableInfo && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Showing {table.getFilteredRowModel().rows.length} of {data.length}{" "}
              entries
              {tableConfig.enableRowSelection && selectedRows.length > 0 && (
                <span className="ml-2">({selectedRows.length} selected)</span>
              )}
            </div>
            {globalFilter && (
              <Badge variant="secondary">
                Filtered by: &quot;{globalFilter}&quot;
              </Badge>
            )}
          </div>
        )}

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader
              className={
                tableConfig.stickyHeader ? "sticky top-0 bg-background" : ""
              }
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "flex items-center space-x-2 cursor-pointer select-none hover:text-accent-foreground"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {tableConfig.enableSorting &&
                            header.column.getCanSort() && (
                              <div className="ml-2">
                                {header.column.getIsSorted() === "asc" ? (
                                  <ArrowUp className="h-4 w-4" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <ArrowDown className="h-4 w-4" />
                                ) : (
                                  <ArrowUpDown className="h-4 w-4" />
                                )}
                              </div>
                            )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row.original)}
                    className={
                      onRowClick ? "cursor-pointer hover:bg-muted/50" : ""
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={enhancedColumns.length}
                    className="h-24 text-center"
                  >
                    {emptyState || `No ${title.toLowerCase()} found.`}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {tableConfig.enablePagination && (
          <div className="flex items-center justify-between">
            <div className="flex-1 text-sm text-muted-foreground">
              {tableConfig.enableRowSelection && (
                <>
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected
                </>
              )}
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

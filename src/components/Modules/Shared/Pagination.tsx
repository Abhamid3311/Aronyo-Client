"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
  showItemsPerPage?: boolean;
  itemsPerPageOptions?: number[];
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

interface PaginationItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ children, isActive, disabled, onClick, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={isActive ? "default" : "outline"}
        size="sm"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "h-9 w-9 p-0",
          isActive && "bg-primaryGreen text-white",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
PaginationItem.displayName = "PaginationItem";

const PaginationEllipsis = ({ className }: { className?: string }) => (
  <span className={cn("flex h-9 w-9 items-center justify-center", className)}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  className,
  onPageChange,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number, newItemsPerPage?: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    if (newItemsPerPage) {
      params.set("limit", newItemsPerPage.toString());
    }
    return `?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (onPageChange) {
        onPageChange(page);
      } else {
        router.push(createPageURL(page));
      }
    }
  };

  // Generate page numbers with smart truncation
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const delta = 2; // Number of pages to show around current page

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Show ellipsis if current page is far from start
      if (currentPage > delta + 2) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - delta - 1) {
        pages.push("ellipsis");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Pagination controls */}
      <nav
        role="navigation"
        aria-label="pagination"
        className="mx-auto flex w-full justify-center py-5"
      >
        <div className="flex flex-row items-center space-x-1">
          {/* Previous button */}
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="gap-1 pl-2.5 bg-white shadow text-primaryGreen"
          >
            <ChevronLeft className="h-4 w-6" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {pageNumbers.map((page, index) => {
              if (page === "ellipsis") {
                return <PaginationEllipsis key={`ellipsis-${index}`} />;
              }

              return (
                <PaginationItem
                  key={page}
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationItem>
              );
            })}
          </div>

          {/* Next button */}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="gap-1 pr-2.5 bg-white shadow text-primaryGreen"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
export { PaginationItem, PaginationEllipsis };

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PropertyPaginationProps {
  page: number;
  totalPage: number;
}

export default function PropertyPagination({
  page,
  totalPage,
}: PropertyPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPage <= 1) {
    return null;
  }

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Previous */}
      <Button
        variant="outline"
        size="icon"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {Array.from({ length: totalPage }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? "default" : "outline"}
            onClick={() => goToPage(pageNumber)}
            className={
              pageNumber === page
                ? "bg-[#338263] hover:bg-[#286b51]"
                : ""
            }
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        disabled={page === totalPage}
        onClick={() => goToPage(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
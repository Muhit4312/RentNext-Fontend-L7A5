"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface UserPaginationProps {
  page: number;
  totalPage: number;
}

const UserPagination = ({
  page,
  totalPage,
}: UserPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPage <= 1) {
    return null;
  }

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(newPage));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between border-t pt-5">
      <p className="text-sm text-muted-foreground">
        Page <strong>{page}</strong> of{" "}
        <strong>{totalPage}</strong>
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPage}
          onClick={() => goToPage(page + 1)}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserPagination;
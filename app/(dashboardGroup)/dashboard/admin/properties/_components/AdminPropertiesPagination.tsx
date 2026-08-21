import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPage: number;
}

const AdminPropertiesPagination = ({
  page,
  totalPage,
}: Props) => {
  if (totalPage <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPage}
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
        >
          {page > 1 ? (
            <Link
              href={`/dashboard/admin/properties?page=${page - 1}`}
            >
              Previous
            </Link>
          ) : (
            <span>Previous</span>
          )}
        </Button>

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPage}
        >
          {page < totalPage ? (
            <Link
              href={`/dashboard/admin/properties?page=${page + 1}`}
            >
              Next
            </Link>
          ) : (
            <span>Next</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminPropertiesPagination;
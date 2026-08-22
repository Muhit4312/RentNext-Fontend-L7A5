import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
    page: number;
    totalPage: number;
}

const AdminRentalsPagination = ({
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
                {page > 1 ? (
                    <Button variant="outline" size="sm">
                        <Link
                            href={`/dashboard/admin/rentals?page=${page - 1}`}
                        >
                            Previous
                        </Link>
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="sm"
                        disabled
                    >
                        Previous
                    </Button>
                )}

                {/* Next */}
                {page < totalPage ? (
                    <Button variant="outline" size="sm">
                        <Link
                            href={`/dashboard/admin/rentals?page=${page + 1}`}
                        >
                            Next
                        </Link>
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="sm"
                        disabled
                    >
                        Next
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AdminRentalsPagination;
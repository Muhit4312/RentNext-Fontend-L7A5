import { getAdminRentals } from "../_action/get-admin-rentals";
import AdminRentalsPagination from "./_components/AdminRentalsPagination";
import AdminRentalsTable from "./_components/AdminRentalsTable";
import { AdminRental } from "./_types/types";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
  }>;
}

const AdminRentalsPage = async ({
  searchParams,
}: PageProps) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = 10;

  const result = await getAdminRentals({
    page,
    limit,
    searchTerm: params.searchTerm,
  });

  if (!result.success) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
        <h2 className="font-semibold text-destructive">
          Failed to load rental requests
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {result.message}
        </p>
      </div>
    );
  }

  
  const rentals = result.data;
  const meta = result.meta;

  const pendingRequests = rentals.filter(
    (rental: AdminRental) => rental.status === "PENDING"
  ).length;

  const approvedRequests = rentals.filter(
    (rental: AdminRental) => rental.status === "APPROVED"
  ).length;

  const completedRequests = rentals.filter(
    (rental: AdminRental) => rental.status === "COMPLETED"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-primary">
          Admin Management
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Rental Requests
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Monitor rental requests submitted by tenants
          across the RentNest platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {/* Total */}
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Total Requests
          </p>

          <p className="mt-2 text-2xl font-bold">
            {meta?.total ?? 0}
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold">
            {pendingRequests}
          </p>
        </div>

        {/* Approved */}
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Approved
          </p>

          <p className="mt-2 text-2xl font-bold">
            {approvedRequests}
          </p>
        </div>

        {/* Completed */}
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Completed
          </p>

          <p className="mt-2 text-2xl font-bold">
            {completedRequests}
          </p>
        </div>
      </div>

      {/* Table */}
      <AdminRentalsTable rentals={rentals} />

      {/* Pagination */}
      {meta && (
        <AdminRentalsPagination
          page={meta.page}
          totalPage={meta.totalPage}
        />
      )}
    </div>
  );
};

export default AdminRentalsPage;
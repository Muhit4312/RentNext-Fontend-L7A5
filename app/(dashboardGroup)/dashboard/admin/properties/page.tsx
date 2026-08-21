import { getAdminProperties } from "../_action/get-admin-properties";
import AdminPropertiesPagination from "./_components/AdminPropertiesPagination";
import AdminPropertiesTable from "./_components/AdminPropertiesTable";


interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const AdminPropertiesPage = async ({
  searchParams,
}: PageProps) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = 10;

  const result = await getAdminProperties({
    page,
    limit,
  });

  if (!result.success) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
        <h2 className="font-semibold text-destructive">
          Failed to load properties
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {result.message}
        </p>
      </div>
    );
  }

  const properties = result.data ?? [];
  const meta = result.meta;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-primary">
          Admin Management
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Properties
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Monitor and review all rental properties listed
          on RentNest.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Total Properties
          </p>

          <p className="mt-2 text-2xl font-bold">
            {meta?.total ?? 0}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Available
          </p>

          <p className="mt-2 text-2xl font-bold">
            {
              properties.filter(
                (property) => property.isAvailable
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Rental Requests
          </p>

          <p className="mt-2 text-2xl font-bold">
            {properties.reduce(
              (total, property) =>
                total + property.rentalRequest.length,
              0
            )}
          </p>
        </div>
      </div>

      {/* Table */}
      <AdminPropertiesTable
        properties={properties}
      />

      {/* Pagination */}
      {meta && (
        <AdminPropertiesPagination
          page={meta.page}
          totalPage={meta.totalPage}
        />
      )}
    </div>
  );
};

export default AdminPropertiesPage;
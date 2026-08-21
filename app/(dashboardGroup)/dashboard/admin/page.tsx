import { getAdminProperties } from "./_action/get-admin-properties";
import { getAdminRentals } from "./_action/get-admin-rentals";
import { getAdminUsers } from "./_action/get-admin-users";
import AdminOverviewCards from "./_components/AdminOverviewCards";

const AdminDashboardPage = async () => {
  const [usersResult, propertiesResult, rentalsResult] =
    await Promise.all([
      getAdminUsers({
        page: 1,
        limit: 1,
      }),

      getAdminProperties({
        page: 1,
        limit: 1,
      }),

      getAdminRentals({
        page: 1,
        limit: 1,
      }),
    ]);

  // Total Users
  const totalUsers = usersResult.success
    ? usersResult.data?.users?.meta?.total ?? 0
    : 0;

  // Total Properties
  const totalProperties = propertiesResult.success
    ? propertiesResult.meta?.total ?? 0
    : 0;

  // Total Rental Requests
  const totalRentalRequests = rentalsResult.success
    ? rentalsResult.meta?.total ?? 0
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-primary">
          RentNest Admin
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Dashboard Overview
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Monitor users, properties, and rental activity across the
          RentNest platform.
        </p>
      </div>

      {/* Overview Cards */}
      <section>
        <AdminOverviewCards
          totalUsers={totalUsers}
          totalProperties={totalProperties}
          totalRentalRequests={totalRentalRequests}
        />
      </section>
    </div>
  );
};

export default AdminDashboardPage;
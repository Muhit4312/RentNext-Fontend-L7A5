import { getAllLandlordRequests } from "./_action/get-all-rental-requests";
import LandlordRequestsTable from "./_components/LandlordRequestsTable";

export default async function LandlordRequestsPage() {
  const result = await getAllLandlordRequests();

  if (!result.success) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            Failed to load rental requests
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {result.message}
          </p>
        </div>
      </div>
    );
  }

  const requests = result?.data?.rentalRequests ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Rental Requests
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage rental requests for your properties.
        </p>
      </div>

      <LandlordRequestsTable requests={requests} />
    </div>
  );
}
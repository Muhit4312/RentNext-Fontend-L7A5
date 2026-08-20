import { getMe } from "@/service/getMe";

import PropertyCard from "./_components/propertyCard";
import RequestStatus from "./_components/requestStatus";
import StatCard from "./_components/statCard";
import { getLandlordProperties } from "./_action/getLandlordProperties";

export default async function LandlordDashboardPage() {
  const user = await getMe();

  if (!user.success) {
    return null;
  }

  const result = await getLandlordProperties();

  const properties = result?.data?.properties ?? [];

  // -----------------------------
  // Statistics
  // -----------------------------

  const totalProperties = properties.length;

  const availableProperties = properties.filter(
    (property) => property.isAvailable
  ).length;

  const unavailableProperties =
    totalProperties - availableProperties;

  // All rental requests from all properties
  const rentalRequests = properties.flatMap(
    (property) => property.rentalRequest ?? []
  );

  const pendingRequests = rentalRequests.filter(
    (request) => request.status === "PENDING"
  ).length;

  const approvedRequests = rentalRequests.filter(
    (request) => request.status === "APPROVED"
  ).length;

  const rejectedRequests = rentalRequests.filter(
    (request) => request.status === "REJECTED"
  ).length;

  const completedRequests = rentalRequests.filter(
    (request) => request.status === "COMPLETED"
  ).length;

  // -----------------------------
  // Revenue
  // -----------------------------

  const monthlyRevenue = properties.reduce(
    (total, property) => {
      const hasActiveRental = property.rentalRequest?.some(
        (request) =>
          request.status === "APPROVED" ||
          request.status === "COMPLETED"
      );

      if (!hasActiveRental) {
        return total;
      }

      return total + Number(property.rent);
    },
    0
  );

  // -----------------------------
  // Recent Requests
  // -----------------------------

  const recentRequests = [...rentalRequests]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* =====================================
          HEADER
      ===================================== */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, {user.data.user.name}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your properties and rental requests from here.
        </p>
      </div>

      {/* =====================================
          STATISTICS
      ===================================== */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Properties"
          value={totalProperties}
        />

        <StatCard
          title="Available Properties"
          value={availableProperties}
        />

        <StatCard
          title="Pending Requests"
          value={pendingRequests}
        />

        <StatCard
          title="Monthly Revenue"
          value={`৳${monthlyRevenue.toLocaleString()}`}
        />
      </div>

      {/* =====================================
          REQUEST SUMMARY
      ===================================== */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Approved Requests"
          value={approvedRequests}
        />

        <StatCard
          title="Completed Rentals"
          value={completedRequests}
        />

        <StatCard
          title="Rejected Requests"
          value={rejectedRequests}
        />
      </div>

      {/* =====================================
          MY PROPERTIES
      ===================================== */}
      <section>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              My Properties
            </h2>

            <p className="text-sm text-slate-500">
              Properties currently listed on RentNest.
            </p>
          </div>

          <a
            href="/dashboard/landlord/properties/new"
            className="inline-flex items-center justify-center rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51]"
          >
            + Add Property
          </a>
        </div>

        {properties.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
            <h3 className="font-semibold text-slate-900">
              No properties yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Start by adding your first rental property.
            </p>

            <a
              href="/dashboard/landlord/properties/new"
              className="mt-5 inline-flex rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#286b51]"
            >
              Add Your First Property
            </a>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </section>

      {/* =====================================
          RECENT RENTAL REQUESTS
      ===================================== */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Rental Requests
          </h2>

          <p className="text-sm text-slate-500">
            Recent requests submitted by tenants.
          </p>
        </div>

        {recentRequests.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
            <h3 className="font-semibold text-slate-900">
              No rental requests
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              You don't have any rental requests yet.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="divide-y">
              {recentRequests.map((request) => {
                const property = properties.find(
                  (property) =>
                    property.id === request.propertyId
                );

                return (
                  <div
                    key={request.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Request Info */}
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">
                        {property?.title ?? "Unknown Property"}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Move in:{" "}
                        {new Date(
                          request.moveInDate
                        ).toLocaleDateString()}
                      </p>

                      {request.message && (
                        <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                          {request.message}
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    <RequestStatus
                      status={request.status}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View all */}
        {rentalRequests.length > 5 && (
          <div className="mt-4 text-right">
            <a
              href="/dashboard/landlord/requests"
              className="text-sm font-medium text-[#338263] hover:underline"
            >
              View all requests →
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
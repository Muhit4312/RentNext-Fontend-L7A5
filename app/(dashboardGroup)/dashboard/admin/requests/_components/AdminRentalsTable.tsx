import Link from "next/link";
import { AdminRental } from "../_types/types";

interface AdminRentalsTableProps {
  rentals: AdminRental[];
}

const AdminRentalsTable = ({
  rentals,
}: AdminRentalsTableProps) => {
  if (rentals.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-10 text-center">
        <p className="font-medium">
          No rental requests found
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          There are no rental requests to display.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Tenant
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Property
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Move In
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Rent
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Requested
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {rentals.map((rental: AdminRental) => (
              <tr
                key={rental.id}
                className="transition-colors hover:bg-muted/30"
              >
                {/* Tenant */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">
                      {rental.tenant.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {rental.tenant.email}
                    </p>
                  </div>
                </td>

                {/* Property */}
                <td className="px-6 py-4">
                  <Link
                    href={`/properties/${rental.property.id}`}
                    className="font-medium hover:text-primary hover:underline"
                  >
                    {rental.property.title}
                  </Link>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {rental.property.location}
                  </p>
                </td>

                {/* Move In */}
                <td className="px-6 py-4">
                  <p className="text-sm">
                    {new Date(
                      rental.moveInDate
                    ).toLocaleDateString()}
                  </p>
                </td>

                {/* Rent */}
                <td className="px-6 py-4 font-medium">
                  ৳
                  {Number(
                    rental.property.rent
                  ).toLocaleString()}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={
                      rental.status === "PENDING"
                        ? "rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700"
                        : rental.status === "APPROVED"
                          ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                          : rental.status === "COMPLETED"
                            ? "rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                            : "rounded-full bg-muted px-3 py-1 text-xs font-medium"
                    }
                  >
                    {rental.status}
                  </span>
                </td>

                {/* Requested */}
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(
                    rental.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRentalsTable;
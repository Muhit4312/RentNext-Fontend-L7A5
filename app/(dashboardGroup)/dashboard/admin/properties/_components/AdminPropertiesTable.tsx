import Link from "next/link";
import { AdminProperty } from "../_types/types";

interface AdminPropertiesTableProps {
  properties: AdminProperty[];
}

const AdminPropertiesTable = ({
  properties,
}: AdminPropertiesTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Property
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Landlord
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Rent
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Requests
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {properties.map((property) => (
              <tr
                key={property.id}
                className="transition-colors hover:bg-muted/30"
              >
                {/* Property */}
                <td className="px-6 py-4">
                  <div>
                     <Link
                      href={`/properties/${property.id}`}
                      className="font-medium transition-colors hover:text-primary hover:underline"
                    >
                      {property.title}
                    </Link>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {property.location}
                    </p>
                  </div>
                </td>

                {/* Landlord */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">
                      {property.landlord.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {property.landlord.email}
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    {property.category.name}
                  </span>
                </td>

                {/* Rent */}
                <td className="px-6 py-4 font-medium">
                  ৳{Number(property.rent).toLocaleString()}
                </td>

                {/* Availability */}
                <td className="px-6 py-4">
                  <span
                    className={
                      property.isAvailable
                        ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                        : "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                    }
                  >
                    {property.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </td>

                {/* Requests */}
                <td className="px-6 py-4">
                  <span className="font-medium">
                    {property.rentalRequest.length}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPropertiesTable;
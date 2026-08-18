import { Star, MapPin, BedDouble, Bath, MessageSquare } from "lucide-react";
import Link from "next/link";
import { getMyRentals } from "../../_action/rental.action";

export default async function TenantReviewsPage() {
  const result = await getMyRentals();

  const rentals = result?.data?.result ?? [];

  // Only completed rentals are eligible for review
  const completedRentals = rentals.filter(
    (rental: any) => rental.status === "COMPLETED"
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          My Reviews
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Share your experience with properties you have rented.
        </p>
      </div>

      {/* Empty State */}
      {completedRentals.length === 0 ? (
        <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border bg-white p-8 text-center shadow-sm">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-50">
            <MessageSquare className="size-7 text-emerald-600" />
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            No properties to review
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            You can leave a review after your rental has been completed.
          </p>

          <Link
            href="/properties"
            className="mt-5 rounded-lg bg-[#338263] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51]"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {completedRentals.map((rental: any) => {
            const property = rental.property;

            if (!property) return null;

            return (
              <div
                key={rental.id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  {property.img ? (
                    <img
                      src={property.img}
                      alt={property.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-sm text-slate-400">
                        No image available
                      </span>
                    </div>
                  )}

                  {/* Completed badge */}
                  <div className="absolute right-3 top-3">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 p-5">
                  <div>
                    <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">
                      {property.title}
                    </h2>

                    <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="size-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  {/* Rent */}
                  <div>
                    <span className="text-xl font-bold text-[#338263]">
                      ৳{Number(property.rent).toLocaleString()}
                    </span>

                    <span className="ml-1 text-sm text-slate-500">
                      / month
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-5 border-y py-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="size-4" />
                      <span>{property.bedrooms} Beds</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Bath className="size-4" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  </div>

                  {/* Review button */}
                  <Link
                    href={`/dashboard/tenant/reviews/${property.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51]"
                  >
                    <Star className="size-4" />
                    Write a Review
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
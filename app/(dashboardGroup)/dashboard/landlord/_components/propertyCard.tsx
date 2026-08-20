"use client"

export default function PropertyCard({ property }: any) {
  const requests = property.rentalRequest ?? [];

  const pending = requests.filter(
    (request: any) => request.status === "PENDING"
  ).length;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative h-48 bg-slate-100">
        {property.img ? (
          <img
            src={property.img}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image available
          </div>
        )}

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            property.isAvailable
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {property.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <h3 className="font-semibold text-slate-900">
            {property.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {property.location}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#338263]">
            ৳{Number(property.rent).toLocaleString()}
          </span>

          <span className="text-xs text-slate-500">
            {property.bedrooms} Beds · {property.bathrooms} Baths
          </span>
        </div>

        {pending > 0 && (
          <div className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
            {pending} pending request{pending > 1 ? "s" : ""}
          </div>
        )}

        <a
          href={`/properties/${property.id}`}
          className="block rounded-lg border px-4 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Manage Property
        </a>
      </div>
    </div>
  );
}
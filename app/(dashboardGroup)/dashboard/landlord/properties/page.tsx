import Link from "next/link";
import {
  Plus,
  MapPin,
  BedDouble,
  Bath,
  Pencil,
  Trash2,
  Home,
} from "lucide-react";
import { LandlordProperty } from "@/types/lanlord";
import { getLandlordProperties } from "../_action/getLandlordProperties";


export default async function MyPropertiesPage() {
  const result = await getLandlordProperties();

  const properties: LandlordProperty[] =
    result?.data?.properties ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Properties
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all properties listed on RentNest.
          </p>
        </div>

        <Link
          href="/dashboard/landlord/properties/new"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51]"
        >
          <Plus className="size-4" />
          Add Property
        </Link>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Properties
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {properties.length}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Available
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {
              properties.filter(
                (property) => property.isAvailable
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Occupied
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-700">
            {
              properties.filter(
                (property) => !property.isAvailable
              ).length
            }
          </p>
        </div>
      </div>

      {/* Empty State */}
      {properties.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border bg-white p-8 text-center shadow-sm">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-50">
            <Home className="size-7 text-emerald-600" />
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            No properties yet
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            You haven't listed any rental properties yet.
            Add your first property to start receiving rental
            requests.
          </p>

          <Link
            href="/dashboard/landlord/properties/new"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#338263] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51]"
          >
            <Plus className="size-4" />
            Add Property
          </Link>
        </div>
      ) : (
        /* Property Grid */
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
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
                    <div className="text-center">
                      <Home className="mx-auto size-8 text-slate-300" />

                      <p className="mt-2 text-sm text-slate-400">
                        No image available
                      </p>
                    </div>
                  </div>
                )}

                {/* Availability */}
                <div className="absolute right-3 top-3">
                  {property.isAvailable ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      Available
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      Occupied
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 p-5">
                {/* Title & Location */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">
                      {property.title}
                    </h2>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="size-4 shrink-0" />

                    <span className="line-clamp-1">
                      {property.location}
                    </span>
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

                {/* Category */}
                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {property.category?.name ?? "Property"}
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-5 border-y py-3 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="size-4" />

                    <span>
                      {property.bedrooms} Beds
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Bath className="size-4" />

                    <span>
                      {property.bathrooms} Baths
                    </span>
                  </div>
                </div>

                {/* Requests */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Rental Requests
                  </span>

                  <span className="font-semibold text-slate-900">
                    {property.rentalRequest?.length ?? 0}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <Link
                    href={`/dashboard/landlord/properties/${property.id}/edit`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
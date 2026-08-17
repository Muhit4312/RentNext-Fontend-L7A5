import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Home,
  MapPin,
  MessageSquare,
  XCircle,
} from "lucide-react";
import { getPropertyById } from "../../_action/singleProperty.aciton";
import { SinglePropertyResponse } from "@/types/property";



// ==============================
// Types
// ==============================

interface RentalRequest {
  id: string;
  note: string;
  moveInDate: string;
  message: string;
  propertyId: string;
  tenantId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  img: string | null;
  address: string | null;
  city: string | null;
  rent: string;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  landlordId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  rentalRequest: RentalRequest[];
}

interface PropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Property;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// ==============================
// Page
// ==============================

export default async function PropertyDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const result: SinglePropertyResponse = await getPropertyById(id);

  const property = result.data;

  const formattedRent = Number(property.rent).toLocaleString();

  const createdDate = new Date(
    property.createdAt
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#f6faf8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/properties"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#338263]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to properties
        </Link>

        {/* =========================================
            PROPERTY OVERVIEW
        ========================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="grid lg:grid-cols-2">

            {/* ================= IMAGE ================= */}

            <div className="relative min-h-[360px] bg-slate-100 lg:min-h-[560px]">

              {property.img ? (
                <img
                  src={property.img}
                  alt={property.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[360px] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 lg:min-h-[560px]">
                  <div className="text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Home className="h-10 w-10 text-[#338263]" />
                    </div>

                    <p className="mt-4 text-sm font-medium text-slate-500">
                      No property image available
                    </p>

                  </div>
                </div>
              )}

              {/* Availability */}

              <div className="absolute left-5 top-5">
                {property.isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#338263] shadow-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-500 shadow-sm">
                    <XCircle className="h-4 w-4" />
                    Not Available
                  </span>
                )}
              </div>
            </div>

            {/* ================= PROPERTY INFO ================= */}

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">

              {/* Category */}

              <div>
                <span className="rounded-full bg-[#338263]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#338263]">
                  {property.category.name}
                </span>
              </div>

              {/* Title */}

              <h1 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {property.title}
              </h1>

              {/* Location */}

              <div className="mt-4 flex items-center gap-2 text-slate-500">
                <MapPin className="h-5 w-5 text-[#338263]" />

                <span>
                  {property.location}
                  {property.city && `, ${property.city}`}
                </span>
              </div>

              {/* Rent */}

              <div className="mt-8">
                <p className="text-sm font-medium text-slate-500">
                  Monthly rent
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900">
                    ৳{formattedRent}
                  </span>

                  <span className="text-sm text-slate-500">
                    / month
                  </span>
                </div>
              </div>

              {/* Amenities */}

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

                {/* Bedrooms */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <BedDouble className="h-5 w-5 text-[#338263]" />

                  <p className="mt-3 text-xl font-bold text-slate-900">
                    {property.bedrooms}
                  </p>

                  <p className="text-xs text-slate-500">
                    Bedrooms
                  </p>
                </div>

                {/* Bathrooms */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Bath className="h-5 w-5 text-[#338263]" />

                  <p className="mt-3 text-xl font-bold text-slate-900">
                    {property.bathrooms}
                  </p>

                  <p className="text-xs text-slate-500">
                    Bathrooms
                  </p>
                </div>

                {/* Type */}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Home className="h-5 w-5 text-[#338263]" />

                  <p className="mt-3 text-base font-bold text-slate-900">
                    {property.category.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Property type
                  </p>
                </div>

              </div>

              {/* Location */}

              <div className="mt-8 border-t border-slate-200 pt-6">

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#338263]" />

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Property location
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {property.address ||
                        property.city ||
                        property.location}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* =========================================
              DESCRIPTION
          ========================================== */}

          <div className="border-t border-slate-200 p-6 sm:p-8 lg:p-10">

            <div className="max-w-4xl">

              <h2 className="text-xl font-bold text-slate-900">
                About this property
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {property.description}
              </p>

            </div>

            {/* Created date */}

            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4" />

              <span>
                Listed on {createdDate}
              </span>
            </div>

          </div>

        </div>

        {/* =========================================
            RENTAL REQUESTS
        ========================================== */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Header */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#338263]/10">
                <MessageSquare className="h-5 w-5 text-[#338263]" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Rental Requests
                </h2>

                <p className="text-sm text-slate-500">
                  Previous rental requests for this property
                </p>
              </div>

            </div>

            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              {property.rentalRequest.length}{" "}
              {property.rentalRequest.length === 1
                ? "Request"
                : "Requests"}
            </span>

          </div>

          {/* Requests */}

          <div className="mt-6 space-y-4">

            {property.rentalRequest.length === 0 ? (

              /* Empty State */

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">

                <MessageSquare className="mx-auto h-8 w-8 text-slate-400" />

                <p className="mt-3 font-medium text-slate-700">
                  No rental requests yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  This property has not received any rental requests.
                </p>

              </div>

            ) : (

              property.rentalRequest.map((request) => (

                <div
                  key={request.id}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-slate-300 hover:shadow-sm"
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    {/* Request information */}

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`
                            rounded-full px-3 py-1 text-xs font-semibold uppercase
                            ${
                              request.status === "APPROVED"
                                ? "bg-green-50 text-green-600"
                                : request.status === "COMPLETED"
                                ? "bg-blue-50 text-blue-600"
                                : request.status === "REJECTED"
                                ? "bg-red-50 text-red-600"
                                : "bg-amber-50 text-amber-600"
                            }
                          `}
                        >
                          {request.status}
                        </span>

                        <span className="text-xs text-slate-400">
                          Submitted{" "}
                          {new Date(
                            request.createdAt
                          ).toLocaleDateString()}
                        </span>

                      </div>

                      <p className="mt-4 text-sm font-semibold text-slate-900">
                        {request.note}
                      </p>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        {request.message}
                      </p>

                    </div>

                    {/* Move in date */}

                    <div className="shrink-0 rounded-xl bg-[#338263]/5 px-4 py-3">

                      <p className="text-xs text-slate-500">
                        Requested move-in
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {new Date(
                          request.moveInDate
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>

                    </div>

                  </div>

                </div>

              ))
            )}

          </div>
        </section>

      </div>
    </main>
  );
}
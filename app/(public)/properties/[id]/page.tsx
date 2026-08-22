
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
import { getMe } from "@/service/getMe";
import RentalRequestForm from "./_components/RentalRequestForm";


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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const result: SinglePropertyResponse = await getPropertyById(id);

  const property = result.data;


  // let me: {
  //   success: boolean;
  //   data?: {
  //     id: string;
  //     name: string;
  //     email: string;
  //     role: string;
  //   };
  // } = {
  //   success: false,
  // };

  let me;

  try {
    me = await getMe();
  } catch {
    me = {
      success: false,
    };
  }

  const isLoggedIn = me.success;
  const isTenant = me.data?.user.role === "TENANT";

  const formattedRent = Number(property.rent).toLocaleString();

  const createdDate = new Date(
    property.createdAt
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  /*
   * After login user will come back to this exact property page.
   */
  const loginUrl = `/login?redirectTo=/properties/${property.id}`;

  return (
    <main className="min-h-screen bg-[#f6faf8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          href="/properties"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#338263]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to properties
        </Link>

        {/* Property */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">

            {/* Image */}
            <div className="relative min-h-90 bg-slate-100 lg:min-h-140">
              {property.img ? (
                <img
                  src={property.img}
                  alt={property.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-90 items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 lg:min-h-140">
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

            {/* Property Info */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">

              <span className="w-fit rounded-full bg-[#338263]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#338263]">
                {property.category.name}
              </span>

              <h1 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {property.title}
              </h1>

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

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <BedDouble className="h-5 w-5 text-[#338263]" />

                  <p className="mt-3 text-xl font-bold text-slate-900">
                    {property.bedrooms}
                  </p>

                  <p className="text-xs text-slate-500">
                    Bedrooms
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Bath className="h-5 w-5 text-[#338263]" />

                  <p className="mt-3 text-xl font-bold text-slate-900">
                    {property.bathrooms}
                  </p>

                  <p className="text-xs text-slate-500">
                    Bathrooms
                  </p>
                </div>

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

          {/* Description */}
          <div className="border-t border-slate-200 p-6 sm:p-8 lg:p-10">
            <div className="max-w-4xl">
              <h2 className="text-xl font-bold text-slate-900">
                About this property
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {property.description}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4" />

              <span>
                Listed on {createdDate}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================
            RENTAL REQUEST SECTION
        ========================================== */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#338263]/10">
              <MessageSquare className="h-5 w-5 text-[#338263]" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Interested in this property?
              </h2>

              <p className="text-sm text-slate-500">
                Send a rental request to the landlord.
              </p>
            </div>
          </div>

          {/* Not available */}
          {!property.isAvailable && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
              <div className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-5 w-5 text-red-500" />

                <div>
                  <p className="font-semibold text-red-700">
                    This property is currently unavailable
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    You cannot submit a rental request for this
                    property right now.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Available property */}
          {property.isAvailable && (
            <>
              {/* Logged out */}
              {!isLoggedIn && (
                <div className="mt-6 rounded-2xl border border-[#338263]/20 bg-[#338263]/5 p-6 text-center">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Ready to rent this property?
                  </h3>

                  <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                    Please log in with your tenant account to
                    submit a rental request.
                  </p>

                  <Link
                    href={loginUrl}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#338263] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#28694f]"
                  >
                    Login to Request
                  </Link>
                </div>
              )}

              {/* Logged in but not tenant */}
              {isLoggedIn && !isTenant && (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <h3 className="font-semibold text-amber-800">
                    Tenant account required
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-amber-700">
                    Only users with a Tenant account can submit
                    rental requests.
                  </p>
                </div>
              )}

              {/* Tenant */}
              {isLoggedIn && isTenant && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Submit a rental request
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Fill in the information below and send your
                      request to the landlord.
                    </p>
                  </div>

                  <RentalRequestForm
                    propertyId={property.id}
                  />
                </div>
              )}
            </>
          )}
        </section>

        {/* =========================================
            PREVIOUS REQUESTS
        ========================================== */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#338263]/10">
              <MessageSquare className="h-5 w-5 text-[#338263]" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Rental Requests
              </h2>

              <p className="text-sm text-slate-500">
                Previous requests for this property
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {property.rentalRequest.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-slate-400" />

                <p className="mt-3 font-medium text-slate-700">
                  No rental requests yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  This property has not received any rental
                  requests.
                </p>
              </div>
            ) : (
              property.rentalRequest.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${request.status === "APPROVED"
                              ? "bg-green-50 text-green-600"
                              : request.status === "COMPLETED"
                                ? "bg-blue-50 text-blue-600"
                                : request.status === "REJECTED"
                                  ? "bg-red-50 text-red-600"
                                  : "bg-amber-50 text-amber-600"
                            }`}
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


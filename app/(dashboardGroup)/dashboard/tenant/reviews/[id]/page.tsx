import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";

import ReviewForm from "./_components/review-form";
import { getMyRentals } from "../../../_action/rental.action";

interface TenantReviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TenantReviewPage({
  params,
}: TenantReviewPageProps) {
  const { id } = await params;

  // Get current tenant's rentals
  const result = await getMyRentals();

  const rentals = result?.data?.result ?? [];

  // Find completed rental for this property
  const rental = rentals.find(
    (rental: any) =>
      rental.propertyId === id &&
      rental.status === "COMPLETED"
  );

  // Property is not eligible for review
  if (!rental || !rental.property) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50">
            <Star className="size-7 text-red-500" />
          </div>

          <h1 className="mt-4 text-xl font-semibold text-slate-900">
            Review not available
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            You can only review a property after completing your rental.
          </p>

          <Link
            href="/dashboard/tenant/reviews"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51]"
          >
            <ArrowLeft className="size-4" />
            Back to Reviews
          </Link>
        </div>
      </div>
    );
  }

  const property = rental.property;

  return (
    <div className="space-y-8">
      {/* Back */}
      <Link
        href="/dashboard/tenant/reviews"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#338263]"
      >
        <ArrowLeft className="size-4" />
        Back to My Reviews
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Write a Review
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Share your experience with this property.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Property Card */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm lg:col-span-2">
          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-slate-100">
            {property.img ? (
              <Image
                src={property.img}
                alt={property.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-slate-400">
                  No image available
                </span>
              </div>
            )}

            {/* Completed Badge */}
            <div className="absolute right-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="size-3.5" />
                Rental Completed
              </span>
            </div>
          </div>

          {/* Property Info */}
          <div className="space-y-5 p-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {property.title}
              </h2>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="size-4" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Rent */}
            <div>
              <span className="text-2xl font-bold text-[#338263]">
                ৳{Number(property.rent).toLocaleString()}
              </span>

              <span className="ml-1 text-sm text-slate-500">
                / month
              </span>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-6 border-y py-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <BedDouble className="size-4" />
                <span>{property.bedrooms} Beds</span>
              </div>

              <div className="flex items-center gap-2">
                <Bath className="size-4" />
                <span>{property.bathrooms} Baths</span>
              </div>
            </div>

            {/* Review Info */}
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <Star className="size-4 fill-emerald-600 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Your experience matters
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your honest feedback can help other tenants make
                    better rental decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Your Review
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell us about your rental experience.
            </p>
          </div>

          <ReviewForm propertyId={property.id} />
        </div>
      </div>
    </div>
  );
}
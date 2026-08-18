import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";


import { getMyRentals } from "@/app/(dashboardGroup)/dashboard/_action/rental.action";
import PaymentCard from "./_components/payment-card";

interface PaymentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PaymentPage({
  params,
}: PaymentPageProps) {
  const { id } = await params;

  const result = await getMyRentals();

  const rentals = result?.data?.result ?? [];

  const rental = rentals.find(
    (item: any) => item.id === id
  );

  if (!rental) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Rental request not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            We couldn't find this rental request.
          </p>

          <Link
            href="/dashboard/tenant"
            className="mt-5 inline-flex rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (rental.status !== "APPROVED") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Payment unavailable
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This rental request has not been approved for payment yet.
          </p>

          <Link
            href="/dashboard/tenant"
            className="mt-5 inline-flex rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const property = rental.property;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Back */}
      <Link
        href="/dashboard/tenant"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#338263]"
      >
        <ArrowLeft className="size-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Complete Your Payment
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Your rental request has been approved. Complete the payment
          to continue.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Rental Information */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Property
              </p>

              <h2 className="mt-1 text-xl font-semibold text-slate-900">
                {property?.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {property?.location}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <CheckCircle2 className="size-3.5" />
              Approved
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Bedrooms
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {property?.bedrooms}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Bathrooms
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {property?.bathrooms}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <p className="text-sm text-slate-500">
              Monthly Rent
            </p>

            <p className="mt-1 text-3xl font-bold text-[#338263]">
              ৳{Number(property?.rent).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="lg:col-span-2">
          <PaymentCard
            rentalRequestId={rental.id}
            propertyTitle={property?.title}
            amount={Number(property?.rent)}
          />
        </div>
      </div>
    </div>
  );
}
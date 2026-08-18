import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  LayoutDashboard,
  RefreshCcw,
} from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          {/* Header */}
          <div className="px-6 pb-8 pt-10 text-center sm:px-10">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-orange-50">
              <CreditCard className="size-10 text-orange-500" />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Payment Cancelled
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your payment was cancelled before it could be completed.
              No payment has been recorded for this transaction.
            </p>
          </div>

          {/* Notice */}
          <div className="border-y bg-orange-50/50 px-6 py-5 sm:px-10">
            <div className="flex gap-3">
              <CreditCard className="mt-0.5 size-5 shrink-0 text-orange-500" />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Your rental request is still available
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  You can return to your dashboard and try the payment
                  again if your rental request is still approved.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 px-6 py-6 sm:px-10">
            <Link
              href="/dashboard/tenant"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#338263] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#286b51]"
            >
              <LayoutDashboard className="size-4" />
              Go to Dashboard
            </Link>

            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft className="size-4" />
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
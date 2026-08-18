import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Home,
  LayoutDashboard,
} from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          {/* Success Header */}
          <div className="px-6 pb-8 pt-10 text-center sm:px-10">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="size-10 text-emerald-600" />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Payment Successful!
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your payment has been successfully submitted. Thank you
              for choosing RentNest.
            </p>
          </div>

          {/* Info */}
          <div className="border-y bg-slate-50 px-6 py-5 sm:px-10">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  What happens next?
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Your payment is being processed. You can check your
                  payment and rental status from your tenant dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 px-6 py-6 sm:flex-row sm:px-10">
            <Link
              href="/dashboard/tenant"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#338263] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#286b51]"
            >
              <LayoutDashboard className="size-4" />
              Go to Dashboard
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Home className="size-4" />
              Back to Home
            </Link>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Thank you for using RentNest.
        </p>
      </div>
    </main>
  );
}


import {
  Building2,
  Clock3,
  CheckCircle2,
  CreditCard,
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMyRentals } from "../_action/rental.action";
import { getMyPayments } from "../_action/payment.aciton";

export default async function TenantDashboardPage() {
  const [rentalResponse, paymentResponse] = await Promise.all([
    getMyRentals(),
    getMyPayments(),
  ]);

  const rentals = rentalResponse?.data?.result ?? [];
  const payments = paymentResponse?.data ?? [];

  const pendingRequests = rentals.filter(
    (rental: any) => rental.status === "PENDING"
  );

  const approvedRequests = rentals.filter(
    (rental: any) =>
      rental.status === "APPROVED" ||
      rental.status === "ACTIVE"
  );

  const completedPayments = payments.filter(
    (payment: any) => payment.status === "COMPLETED"
  );

  const totalPaid = completedPayments.reduce(
    (total: number, payment: any) =>
      total + Number(payment.amount || 0),
    0
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Tenant Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your rental requests and payment activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Requests */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Requests
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {rentals.length}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  All rental requests
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50">
                <Building2 className="size-5 text-emerald-600" />
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {pendingRequests.length}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Waiting for approval
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50">
                <Clock3 className="size-5 text-amber-600" />
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Approved */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Approved
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {approvedRequests.length}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Approved or active
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50">
                <CheckCircle2 className="size-5 text-blue-600" />
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Payments */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Paid
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  ৳{totalPaid.toLocaleString()}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {completedPayments.length} completed payments
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-purple-50">
                <CreditCard className="size-5 text-purple-600" />
              </div>

            </div>
          </CardContent>
        </Card>

      </div>

      {/* Recent Requests */}
      <Card className="border-0 shadow-sm">

        <CardContent className="p-0">

          <div className="flex items-center justify-between border-b px-6 py-5">

            <div>
              <h2 className="font-semibold text-slate-900">
                Recent Rental Requests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track your latest property requests.
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
            >
              <Link href="/dashboard/tenant/requests">
                View All
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

          </div>

          <div className="divide-y">

            {rentals.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Building2 className="mx-auto size-10 text-slate-300" />

                <p className="mt-3 font-medium text-slate-700">
                  No rental requests yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Browse properties and send your first request.
                </p>

                <Button className="mt-4">
                  <Link href="/properties">
                    Browse Properties
                  </Link>
                </Button>
              </div>
            ) : (
              rentals.slice(0, 5).map((rental: any) => {

                const property = rental.property;

                return (
                  <div
                    key={rental.id}
                    className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
                  >

                    <div className="flex min-w-0 items-center gap-4">

                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <Building2 className="size-5 text-slate-600" />
                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate font-semibold text-slate-900">
                          {property?.title ?? "Property"}
                        </h3>

                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">

                          <span className="flex items-center gap-1">
                            <MapPin className="size-3.5" />
                            {property?.location ?? "N/A"}
                          </span>

                          <span className="flex items-center gap-1">
                            <CalendarDays className="size-3.5" />
                            {new Date(
                              rental.moveInDate
                            ).toLocaleDateString()}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          ৳{Number(
                            property?.rent ?? 0
                          ).toLocaleString()}
                        </p>

                        <p className="text-xs text-slate-500">
                          Monthly rent
                        </p>
                      </div>

                      <StatusBadge status={rental.status} />

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </CardContent>

      </Card>

      {/* Recent Payments */}
      <Card className="border-0 shadow-sm">

        <CardContent className="p-0">

          <div className="flex items-center justify-between border-b px-6 py-5">

            <div>
              <h2 className="font-semibold text-slate-900">
                Recent Payments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest payment transactions.
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
            >
              <Link href="/dashboard/tenant/payments">
                View All
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

          </div>

          <div className="divide-y">

            {payments.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-slate-500">
                No payment history found.
              </div>
            ) : (
              payments.slice(0, 5).map((payment: any) => {

                const property =
                  payment.rentalRequest?.property;

                return (
                  <div
                    key={payment.id}
                    className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div>
                      <h3 className="font-medium text-slate-900">
                        {property?.title ?? "Property"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(
                          payment.paidAt ?? payment.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">

                      <span className="font-semibold text-slate-900">
                        ৳{Number(
                          payment.amount
                        ).toLocaleString()}
                      </span>

                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        {payment.status}
                      </Badge>

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}


/* ---------------- Status Badge ---------------- */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    PENDING:
      "bg-amber-100 text-amber-700 hover:bg-amber-100",

    APPROVED:
      "bg-blue-100 text-blue-700 hover:bg-blue-100",

    REJECTED:
      "bg-red-100 text-red-700 hover:bg-red-100",

    ACTIVE:
      "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",

    COMPLETED:
      "bg-slate-100 text-slate-700 hover:bg-slate-100",
  };

  return (
    <Badge className={styles[status] ?? "bg-slate-100"}>
      {status}
    </Badge>
  );
}
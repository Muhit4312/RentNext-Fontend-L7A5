import {
  CheckCircle2,
  Clock3,
  CreditCard,
  ExternalLink,
  ReceiptText,
  XCircle,
} from "lucide-react";
import { getMyPayments } from "../../_action/payment.aciton";


const statusConfig = {
  COMPLETED: {
    label: "Completed",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
    icon: CheckCircle2,
  },
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
    icon: Clock3,
  },
  FAILED: {
    label: "Failed",
    className:
      "bg-red-50 text-red-700 ring-1 ring-red-600/20",
    icon: XCircle,
  },
} as const;

export default async function TenantPaymentsPage() {
  const response = await getMyPayments();

  const payments = response?.data ?? [];

  const totalPaid = payments
    .filter((payment: any) => payment.status === "COMPLETED")
    .reduce(
      (total: number, payment: any) =>
        total + Number(payment.amount),
      0
    );

  const completedPayments = payments.filter(
    (payment: any) => payment.status === "COMPLETED"
  ).length;

  const pendingPayments = payments.filter(
    (payment: any) => payment.status === "PENDING"
  ).length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <p className="text-sm font-medium text-[#338263]">
          Tenant Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Payment History
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View your rental payments and transaction history.
        </p>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Paid */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Paid
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                ৳{totalPaid.toLocaleString()}
              </h2>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-[#338263]">
              <CreditCard className="size-5" />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Completed Payments
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {completedPayments}
              </h2>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CheckCircle2 className="size-5" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending Payments
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {pendingPayments}
              </h2>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= PAYMENT LIST ================= */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {/* Table Header */}
        <div className="flex flex-col gap-2 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <ReceiptText className="size-5 text-[#338263]" />
              Transactions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your recent rental payment transactions
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {payments.length} transaction
            {payments.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Empty State */}
        {payments.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-slate-100">
              <CreditCard className="size-6 text-slate-400" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No payments yet
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Your rental payment transactions will appear
              here after you make a payment.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-slate-50/70 text-left">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Property
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Provider
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Paid At
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Transaction
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {payments.map((payment: any) => {
                    const status =
                      statusConfig[
                        payment.status as keyof typeof statusConfig
                      ] ?? statusConfig.PENDING;

                    const StatusIcon = status.icon;

                    return (
                      <tr
                        key={payment.id}
                        className="transition hover:bg-slate-50/70"
                      >
                        {/* Property */}
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium text-slate-900">
                              {
                                payment.rentalRequest
                                  ?.property?.title
                              }
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {
                                payment.rentalRequest
                                  ?.property?.location
                              }
                            </p>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-5 py-4">
                          <span className="font-semibold text-slate-900">
                            ৳
                            {Number(
                              payment.amount
                            ).toLocaleString()}
                          </span>
                        </td>

                        {/* Provider */}
                        <td className="px-5 py-4">
                          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {payment.provider}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                          >
                            <StatusIcon className="size-3.5" />
                            {status.label}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-700">
                            {new Date(
                              payment.paidAt ??
                                payment.createdAt
                            ).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </td>

                        {/* Transaction */}
                        <td className="px-5 py-4 text-right">
                          <span
                            title={payment.transactionId}
                            className="inline-flex max-w-32 items-center gap-1 truncate text-xs text-slate-500"
                          >
                            <ExternalLink className="size-3.5 shrink-0" />

                            <span className="truncate">
                              {payment.transactionId}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="divide-y md:hidden">
              {payments.map((payment: any) => {
                const status =
                  statusConfig[
                    payment.status as keyof typeof statusConfig
                  ] ?? statusConfig.PENDING;

                const StatusIcon = status.icon;

                return (
                  <div
                    key={payment.id}
                    className="space-y-4 p-5"
                  >
                    {/* Property */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-900">
                          {
                            payment.rentalRequest
                              ?.property?.title
                          }
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {
                            payment.rentalRequest
                              ?.property?.location
                          }
                        </p>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        <StatusIcon className="size-3.5" />
                        {status.label}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        Amount Paid
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        ৳
                        {Number(
                          payment.amount
                        ).toLocaleString()}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">
                          Provider
                        </p>

                        <p className="mt-1 font-medium text-slate-700">
                          {payment.provider}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Paid Date
                        </p>

                        <p className="mt-1 font-medium text-slate-700">
                          {new Date(
                            payment.paidAt ??
                              payment.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Transaction ID */}
                    <div>
                      <p className="text-xs text-slate-400">
                        Transaction ID
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-600">
                        {payment.transactionId}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
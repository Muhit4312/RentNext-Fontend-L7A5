import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Home,
  MapPin,
  XCircle,
} from "lucide-react";
import { getMyRentals } from "../../_action/rental.action";


const statusConfig = {
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
    icon: Clock3,
  },

  APPROVED: {
    label: "Approved",
    className:
      "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
    icon: CheckCircle2,
  },

  REJECTED: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 ring-1 ring-red-600/20",
    icon: XCircle,
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-slate-100 text-slate-700 ring-1 ring-slate-600/20",
    icon: CheckCircle2,
  },

  ACTIVE: {
    label: "Active",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
    icon: CheckCircle2,
  },
} as const;

export default async function TenantRequestsPage() {
  const response = await getMyRentals();

  const requests = response?.data?.result ?? [];

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request: any) => request.status === "PENDING"
  ).length;

  const approvedRequests = requests.filter(
    (request: any) => request.status === "APPROVED"
  ).length;

  const rejectedRequests = requests.filter(
    (request: any) => request.status === "REJECTED"
  ).length;

  const completedRequests = requests.filter(
    (request: any) => request.status === "COMPLETED"
  ).length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* ================= HEADER ================= */}

      <div>
        <p className="text-sm font-medium text-[#338263]">
          Tenant Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          My Rental Requests
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Track your property rental requests and their current
          status.
        </p>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Requests
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {totalRequests}
              </h2>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <FileText className="size-5" />
            </div>
          </div>
        </div>

        {/* Pending */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {pendingRequests}
              </h2>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 className="size-5" />
            </div>
          </div>
        </div>

        {/* Approved */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Approved
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {approvedRequests}
              </h2>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CheckCircle2 className="size-5" />
            </div>
          </div>
        </div>

        {/* Rejected */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Rejected
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {rejectedRequests}
              </h2>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <XCircle className="size-5" />
            </div>
          </div>
        </div>

        {/* Completed */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {completedRequests}
              </h2>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-[#338263]">
              <CheckCircle2 className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= REQUESTS ================= */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {/* Section Header */}

        <div className="flex flex-col gap-2 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <Home className="size-5 text-[#338263]" />
              Rental Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View all properties you have requested to rent.
            </p>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {requests.length} request
            {requests.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ================= EMPTY STATE ================= */}

        {requests.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-slate-100">
              <Home className="size-6 text-slate-400" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No rental requests
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              You have not submitted any rental requests yet.
              Browse properties and find your next home.
            </p>

            <Link
              href="/properties"
              className="mt-5 inline-flex items-center rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51]"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <>
            {/* ================= DESKTOP TABLE ================= */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-slate-50/70 text-left">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Property
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Rent
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Move-in Date
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {requests.map((request: any) => {
                    const property = request.property;

                    const status =
                      statusConfig[
                        request.status as keyof typeof statusConfig
                      ] ?? statusConfig.PENDING;

                    const StatusIcon = status.icon;

                    return (
                      <tr
                        key={request.id}
                        className="transition hover:bg-slate-50/70"
                      >
                        {/* Property */}

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#338263]">
                              <Home className="size-5" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-900">
                                {property?.title}
                              </p>

                              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                <MapPin className="size-3" />
                                {property?.location}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Rent */}

                        <td className="px-5 py-5">
                          <span className="font-semibold text-slate-900">
                            ৳
                            {Number(
                              property?.rent
                            ).toLocaleString()}
                          </span>

                          <span className="ml-1 text-xs text-slate-400">
                            /month
                          </span>
                        </td>

                        {/* Move in */}

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <CalendarDays className="size-4 text-slate-400" />

                            {new Date(
                              request.moveInDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </td>

                        {/* Status */}

                        <td className="px-5 py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                          >
                            <StatusIcon className="size-3.5" />
                            {status.label}
                          </span>
                        </td>

                        {/* Action */}

                        <td className="px-5 py-5 text-right">
                          {request.status === "APPROVED" && (
                            <Link
                              href={`/dashboard/tenant/requests/${request.id}/pay`}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#338263] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#286b51]"
                            >
                              <CreditCard className="size-3.5" />
                              Pay Now
                            </Link>
                          )}

                          {request.status === "COMPLETED" && (
                            <span className="text-xs font-medium text-slate-500">
                              Payment Completed
                            </span>
                          )}

                          {request.status === "PENDING" && (
                            <span className="text-xs text-slate-400">
                              Waiting for approval
                            </span>
                          )}

                          {request.status === "REJECTED" && (
                            <span className="text-xs font-medium text-red-500">
                              Request Rejected
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}

            <div className="divide-y md:hidden">
              {requests.map((request: any) => {
                const property = request.property;

                const status =
                  statusConfig[
                    request.status as keyof typeof statusConfig
                  ] ?? statusConfig.PENDING;

                const StatusIcon = status.icon;

                return (
                  <div
                    key={request.id}
                    className="space-y-5 p-5"
                  >
                    {/* Property */}

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#338263]">
                          <Home className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-slate-900">
                            {property?.title}
                          </h3>

                          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                            <MapPin className="size-3.5" />
                            {property?.location}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        <StatusIcon className="size-3.5" />
                        {status.label}
                      </span>
                    </div>

                    {/* Property info */}

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Monthly Rent
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                          ৳
                          {Number(
                            property?.rent
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Move-in Date
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
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

                    {/* Message */}

                    {request.message && (
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Your Message
                        </p>

                        <p className="mt-1 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                          {request.message}
                        </p>
                      </div>
                    )}

                    {/* Action */}

                    {request.status === "APPROVED" && (
                      <Link
                        href={`/dashboard/tenant/requests/${request.id}/pay`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#338263] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#286b51]"
                      >
                        <CreditCard className="size-4" />
                        Proceed to Payment
                      </Link>
                    )}

                    {request.status === "PENDING" && (
                      <div className="rounded-xl bg-amber-50 px-4 py-3 text-center text-sm text-amber-700">
                        Your request is waiting for landlord
                        approval.
                      </div>
                    )}

                    {request.status === "REJECTED" && (
                      <div className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                        This rental request has been rejected.
                      </div>
                    )}

                    {request.status === "COMPLETED" && (
                      <div className="rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-700">
                        Rental payment has been completed.
                      </div>
                    )}
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
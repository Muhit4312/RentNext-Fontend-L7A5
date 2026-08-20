"use client";

import { useState, useTransition } from "react";
import {
  Check,
  Loader2,
  MapPin,
  CalendarDays,
  Mail,
  Building2,
  UserRound,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import RentalStatusBadge from "@/components/shared/RentalStatusBadge";

import { updateRentalRequest } from "../_action/update-rental-request";

import type { RentalRequest } from "../_types/rental-request.type";

interface LandlordRequestsTableProps {
  requests: RentalRequest[];
}

export default function LandlordRequestsTable({
  requests: initialRequests,
}: LandlordRequestsTableProps) {
  const [requests, setRequests] =
    useState<RentalRequest[]>(initialRequests);

  const [selectedRequest, setSelectedRequest] =
    useState<RentalRequest | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    if (!selectedRequest) return;

    startTransition(async () => {
      const result = await updateRentalRequest(
        selectedRequest.id,
        "APPROVED"
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setRequests((prev) =>
        prev.map((request) =>
          request.id === selectedRequest.id
            ? {
                ...request,
                status: "APPROVED",
              }
            : request
        )
      );

      toast.success("Rental request approved successfully.");

      setSelectedRequest(null);
    });
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
        {/* Table Header Info */}
        <div className="border-b px-6 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Rental Requests
              </h2>

              <p className="text-sm text-muted-foreground">
                Review and manage tenants who requested your
                properties.
              </p>
            </div>

            <div className="w-fit rounded-full bg-muted px-3 py-1.5 text-xs font-medium">
              {requests.length}{" "}
              {requests.length === 1 ? "Request" : "Requests"}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="h-12 pl-6">
                  Tenant
                </TableHead>

                <TableHead className="h-12">
                  Property
                </TableHead>

                <TableHead className="h-12">
                  Rent
                </TableHead>

                <TableHead className="h-12">
                  Move-in
                </TableHead>

                <TableHead className="h-12">
                  Status
                </TableHead>

                <TableHead className="h-12 pr-6 text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-64"
                  >
                    <EmptyState />
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <TableRow
                    key={request.id}
                    className="group transition-colors hover:bg-muted/20"
                  >
                    {/* Tenant */}
                    <TableCell className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {request.tenant.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-37.5">
                          <p className="font-medium">
                            {request.tenant.name}
                          </p>

                          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Mail className="size-3" />

                            <span>
                              {request.tenant.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Property */}
                    <TableCell>
                      <div className="flex min-w-55 items-center gap-3">
                        {/* Image */}
                        <div className="size-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
                          {request.property.img ? (
                            <img
                              src={request.property.img}
                              alt={request.property.title}
                              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center">
                              <Building2 className="size-5 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-medium">
                            {request.property.title}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="size-3 shrink-0" />

                            <span>
                              {request.property.location}
                            </span>
                          </div>

                          <span className="mt-1.5 inline-block rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                            {request.property.category.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Rent */}
                    <TableCell>
                      <div className="min-w-27.5">
                        <span className="font-semibold">
                          ৳
                          {Number(
                            request.property.rent
                          ).toLocaleString()}
                        </span>

                        <span className="ml-1 text-xs text-muted-foreground">
                          /mo
                        </span>
                      </div>
                    </TableCell>

                    {/* Move In */}
                    <TableCell>
                      <div className="flex min-w-30 items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                          <CalendarDays className="size-4 text-muted-foreground" />
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            {new Date(
                              request.moveInDate
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </p>

                          <p className="text-[11px] text-muted-foreground">
                            {new Date(
                              request.moveInDate
                            ).getFullYear()}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <RentalStatusBadge
                        status={request.status}
                      />
                    </TableCell>

                    {/* Action */}
                    <TableCell className="pr-6 text-right">
                      {request.status === "PENDING" ? (
                        <Button
                          size="sm"
                          className="gap-1.5"
                          onClick={() =>
                            setSelectedRequest(request)
                          }
                        >
                          <Check className="size-4" />
                          Approve
                        </Button>
                      ) : request.status === "APPROVED" ? (
                        <span className="text-xs font-medium text-blue-600">
                          Approved
                        </span>
                      ) : request.status === "REJECTED" ? (
                        <span className="text-xs font-medium text-red-600">
                          Rejected
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          —
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={!!selectedRequest}
        onOpenChange={(open) => {
          if (!open && !isPending) {
            setSelectedRequest(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Check className="size-6 text-primary" />
            </div>

            <DialogTitle className="text-center text-xl">
              Approve Rental Request?
            </DialogTitle>

            <DialogDescription className="text-center">
              Please review the request details before
              approving this rental request.
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              {/* Tenant */}
              <div className="flex items-center gap-3 rounded-xl border p-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {selectedRequest.tenant.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {selectedRequest.tenant.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {selectedRequest.tenant.email}
                  </p>
                </div>
              </div>

              {/* Property */}
              <div className="rounded-xl border p-4">
                <div className="flex gap-3">
                  <Building2 className="mt-0.5 size-4 text-muted-foreground" />

                  <div>
                    <p className="text-sm font-medium">
                      {selectedRequest.property.title}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {selectedRequest.property.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">
                    Monthly Rent
                  </p>

                  <p className="mt-1 font-semibold">
                    ৳
                    {Number(
                      selectedRequest.property.rent
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">
                    Move-in Date
                  </p>

                  <p className="mt-1 font-semibold">
                    {new Date(
                      selectedRequest.moveInDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Note */}
              {selectedRequest.note && (
                <div className="rounded-xl border p-3">
                  <div className="mb-1.5 flex items-center gap-2">
                    <MessageSquare className="size-4 text-muted-foreground" />

                    <span className="text-xs font-medium">
                      Tenant Note
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.note}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => setSelectedRequest(null)}
            >
              Cancel
            </Button>

            <Button
              disabled={isPending}
              onClick={handleApprove}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <Check className="mr-2 size-4" />
                  Confirm Approval
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* Empty State */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
        <UserRound className="size-6 text-muted-foreground" />
      </div>

      <h3 className="font-semibold">
        No rental requests yet
      </h3>

      <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">
        When tenants request one of your properties,
        their requests will appear here.
      </p>
    </div>
  );
}
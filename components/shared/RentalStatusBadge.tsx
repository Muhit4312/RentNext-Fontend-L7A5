import { Badge } from "@/components/ui/badge";

import type { RentalStatus } from "@/app/(dashboardGroup)/dashboard/landlord/requests/_types/rental-request.type";

interface RentalStatusBadgeProps {
  status: RentalStatus;
}

const statusConfig: Record<
  RentalStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Pending",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  APPROVED: {
    label: "Approved",
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  REJECTED: {
    label: "Rejected",
    className:
      "border-red-200 bg-red-50 text-red-700",
  },

  ACTIVE: {
    label: "Active",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "border-gray-200 bg-gray-50 text-gray-700",
  },
};

export default function RentalStatusBadge({
  status,
}: RentalStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={config.className}
    >
      {config.label}
    </Badge>
  );
}
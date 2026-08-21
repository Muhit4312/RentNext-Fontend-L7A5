import { Badge } from "@/components/ui/badge";

interface PropertyAvailabilityBadgeProps {
  isAvailable: boolean;
}

const PropertyAvailabilityBadge = ({
  isAvailable,
}: PropertyAvailabilityBadgeProps) => {
  if (isAvailable) {
    return (
      <Badge
        variant="outline"
        className="border-emerald-200 bg-emerald-50 text-emerald-700"
      >
        Available
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-red-200 bg-red-50 text-red-700"
    >
      Unavailable
    </Badge>
  );
};

export default PropertyAvailabilityBadge;
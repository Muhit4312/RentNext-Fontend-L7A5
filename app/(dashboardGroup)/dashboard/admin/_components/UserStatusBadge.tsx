import { Badge } from "@/components/ui/badge";

type UserStatus = "ACTIVE" | "BANNED";

interface UserStatusBadgeProps {
  status: UserStatus;
}

const UserStatusBadge = ({
  status,
}: UserStatusBadgeProps) => {
  if (status === "ACTIVE") {
    return (
      <Badge
        variant="outline"
        className="border-emerald-200 bg-emerald-50 text-emerald-700"
      >
        Active
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-red-200 bg-red-50 text-red-700"
    >
      Banned
    </Badge>
  );
};

export default UserStatusBadge;
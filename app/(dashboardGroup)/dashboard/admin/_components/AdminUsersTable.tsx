import { Mail, UserRound } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import UserStatusBadge from "./UserStatusBadge";
import UpdateUserStatusDialog from "./UpdateUserStatusDialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
}

interface AdminUsersTableProps {
  users: User[];
}

const AdminUsersTable = ({
  users,
}: AdminUsersTableProps) => {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Joined
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-muted-foreground"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <UserRound className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-medium">
                            {user.name}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Mail className="h-3.5 w-3.5" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <UserStatusBadge
                        status={user.status}
                      />
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      {user.role === "ADMIN" ? (
                        <span className="text-xs text-muted-foreground">
                          Protected
                        </span>
                      ) : (
                        <UpdateUserStatusDialog
                          userId={user.id}
                          userName={user.name}
                          status={user.status}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUsersTable;
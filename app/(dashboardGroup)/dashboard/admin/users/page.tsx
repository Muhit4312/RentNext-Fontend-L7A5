import { UserSearch } from "lucide-react";
import { getAdminUsers } from "../_action/get-admin-users";
import AdminUsersTable from "../_components/AdminUsersTable";
import UserPagination from "../_components/UserPagination";

interface AdminUsersPageProps {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
  }>;
}

const AdminUsersPage = async ({
  searchParams,
}: AdminUsersPageProps) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const searchTerm = params.searchTerm || "";

  const result = await getAdminUsers({
    page,
    limit: 10,
    searchTerm,
  });

  if (!result.success) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
        <h2 className="font-semibold text-destructive">
          Failed to load users
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {result.message}
        </p>
      </div>
    );
  }

  const users = result.data?.users?.data ?? [];
  const meta = result.data?.users?.meta;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-primary">
          User Management
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Users
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Manage RentNest users, monitor account status,
          and control platform access.
        </p>
      </div>

      {/* Search + Count */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <UserSearch />

        <p className="text-sm text-muted-foreground">
          Total users:{" "}
          <span className="font-semibold text-foreground">
            {meta?.total ?? 0}
          </span>
        </p>
      </div>

      {/* Table */}
      <AdminUsersTable users={users} />

      {/* Pagination */}
      {meta && (
        <UserPagination
          page={meta.page}
          totalPage={meta.totalPage}
        />
      )}
    </div>
  );
};

export default AdminUsersPage;
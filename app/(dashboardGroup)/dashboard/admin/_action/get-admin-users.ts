"use server";

import { cookies } from "next/headers";

interface GetAdminUsersParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export async function getAdminUsers({
  page = 1,
  limit = 10,
  searchTerm = "",
}: GetAdminUsersParams = {}) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not authenticated.",
      data: null,
      meta: null,
    };
  }

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (searchTerm.trim()) {
    params.set("searchTerm", searchTerm.trim());
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message: result.message || "Failed to fetch users.",
      data: null,
      meta: null,
    };
  }

  return result;
}
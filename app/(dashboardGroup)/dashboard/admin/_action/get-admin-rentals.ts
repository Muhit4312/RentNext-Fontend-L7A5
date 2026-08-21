"use server";

import { cookies } from "next/headers";

interface GetAdminRentalsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export async function getAdminRentals({
  page = 1,
  limit = 10,
  searchTerm = "",
}: GetAdminRentalsParams = {}) {
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
    `${process.env.BACKEND_API_URL}/api/admin/rentals?${params.toString()}`,
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
      message:
        result.message || "Failed to fetch rental requests.",
      data: null,
      meta: null,
    };
  }

  return {
    success: true,
    message: result.message,
    data: result.data,
    meta: result.meta,
  };
}
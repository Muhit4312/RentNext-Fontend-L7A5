"use server";

import { cookies } from "next/headers";

export type RentalRequestStatus = "APPROVED" | "REJECTED";

export async function updateRentalRequest(
  rentalRequestId: string,
  status: RentalRequestStatus
) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not authenticated.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests/${rentalRequestId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        status,
      }),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message: result.message || "Failed to update rental request.",
    };
  }

  return result;
}
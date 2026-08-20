"use server";

import { LandlordPropertiesResponse } from "@/types/lanlord";
import { cookies } from "next/headers";

export async function getLandlordProperties(): Promise<LandlordPropertiesResponse> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch landlord properties");
  }

  const result: LandlordPropertiesResponse = await res.json();

  if (!result.success) {
    throw new Error(
      result.message || "Failed to fetch landlord properties"
    );
  }

  return result;
}
"use server";

import { cookies } from "next/headers";

export interface UpdatePropertyPayload {
  title: string;
  description: string;
  location: string;
  rent: number;
  categoryId: string;
  bedrooms: number;
  bathrooms: number;
  images?: string[];
  isAvailable?: boolean;
}

export async function updateProperty(
  propertyId: string,
  payload: UpdatePropertyPayload
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
    `${process.env.BACKEND_API_URL}/api/properties/${propertyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message: result.message || "Failed to update property.",
    };
  }

  return result;
}
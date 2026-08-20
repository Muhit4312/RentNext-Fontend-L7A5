"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export interface CreatePropertyPayload {
  title: string;
  description: string;
  location: string;
  rent: number;
  categoryId: string;
  bedrooms: number;
  bathrooms: number;
  img?: string;
  isAvailable?: boolean;
}

export interface CreatePropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    property?: unknown;
  };
}

export async function createProperty(
  payload: CreatePropertyPayload
): Promise<CreatePropertyResponse> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "You are not authenticated.",
    };
  }

  const res = await fetch(`${API_URL}/api/landlord/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      statusCode: res.status,
      message: result?.message || "Failed to create property.",
    };
  }

  return result;
}
"use server";

import { SinglePropertyResponse } from "@/types/property";

export async function getPropertyById(
  id: string
): Promise<SinglePropertyResponse> {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }
  console.log(res);

  return res.json();
}
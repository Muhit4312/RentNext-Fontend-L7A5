"use server";

import { cookies } from "next/headers";

export async function deleteProperty(propertyId: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not authenticated.",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "DELETE",
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
        message: result.message || "Failed to delete property.",
      };
    }

    console.log(result);

    return {
      success: true,
      message: result.message || "Property deleted successfully.",
    };
  } catch (error) {
    console.error("Delete property error:", error);

    return {
      success: false,
      message: "Something went wrong while deleting the property.",
    };
  }
}
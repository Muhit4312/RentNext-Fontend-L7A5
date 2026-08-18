"use server";

import { cookies } from "next/headers";

interface CreateReviewPayload {
  propertyId: string;
  rating: number;
  comment: string;
}

export const createReview = async (
  payload: CreateReviewPayload
) => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not authenticated.",
      };
    }

    if (!payload.propertyId) {
      return {
        success: false,
        message: "Property ID is required.",
      };
    }

    if (payload.rating < 1 || payload.rating > 5) {
      return {
        success: false,
        message: "Rating must be between 1 and 5.",
      };
    }

    if (!payload.comment.trim()) {
      return {
        success: false,
        message: "Review comment is required.",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          propertyId: payload.propertyId,
          rating: payload.rating,
          comment: payload.comment.trim(),
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to create review.",
      };
    }

    return {
      success: true,
      message: "Review created successfully.",
      data: result?.data,
    };
  } catch (error) {
    console.error("Create review error:", error);

    return {
      success: false,
      message: "Something went wrong while creating the review.",
    };
  }
};
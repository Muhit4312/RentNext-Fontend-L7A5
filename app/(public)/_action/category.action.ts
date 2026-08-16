"use server";

import { CategoryResponse } from "@/types/category";

export async function getCategories(): Promise<CategoryResponse> {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["all-categories"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
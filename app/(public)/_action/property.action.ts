"use server";

import { PropertyResponse } from "@/types/property";

interface GetPropertiesParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    location?: string;
    category?: string;
    rent?: number;
    landlordId?: string;
    sortBy?: "createdAt" | "rent" | "title";
    sortOrder?: "asc" | "desc";
}

export async function getProperties(
    params: GetPropertiesParams = {}
): Promise<PropertyResponse> {
    const searchParams = new URLSearchParams();

    if (params.page) {
        searchParams.set("page", params.page.toString());
    }

    if (params.limit) {
        searchParams.set("limit", params.limit.toString());
    }

    if (params.searchTerm) {
        searchParams.set("searchTerm", params.searchTerm);
    }

    if (params.location) {
        searchParams.set("location", params.location);
    }

    if (params.category) {
    searchParams.set("category", params.category);
}

    if (params.rent !== undefined) {
        searchParams.set("rent", params.rent.toString());
    }

    if (params.landlordId) {
        searchParams.set("landlordId", params.landlordId);
    }

    if (params.sortBy) {
        searchParams.set("sortBy", params.sortBy);
    }

    if (params.sortOrder) {
        searchParams.set("sortOrder", params.sortOrder);
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${searchParams.toString()}`, {
        cache: "no-store",
        // next: {
        //     revalidate: 60 * 60 * 24,
        //     tags: ["all-properties"]
        // }
    }

    );

    if (!res.ok) {
        throw new Error("Failed to fetch properties");
    }

    const result: PropertyResponse = await res.json();
    

    return result;
}
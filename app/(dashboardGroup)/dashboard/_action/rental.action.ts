"use server";

import { cookies } from "next/headers";
import { RentalResponse } from "@/types/rental";

export const getMyRentals = async (): Promise<RentalResponse> => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in",
        }
    }

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentals`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch rental requests");
    }

    const result: RentalResponse = await response.json();

    return result;
};
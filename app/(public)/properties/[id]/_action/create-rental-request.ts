"use server";

import { cookies } from "next/headers";

interface CreateRentalRequestPayload {
    propertyId: string;
    moveInDate: string;
    message: string;
    note: string;
}

export const createRentalRequest = async (
    payload: CreateRentalRequestPayload
) => {
    
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Please login first.",
        };
    }

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentals`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        }
    );

    const result = await res.json();
    

    return result;
};
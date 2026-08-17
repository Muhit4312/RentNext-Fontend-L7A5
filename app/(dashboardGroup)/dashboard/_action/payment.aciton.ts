"use server";

import { cookies } from "next/headers";

export const getMyPayments = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/payments`,
        {
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch payments");
    }

    const result = await response.json();
    
    return result;
};
"use server";

import { cookies } from "next/headers";



export const createPayment = async (rentalRequestId: string) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({
      rentalRequestId,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result?.message || "Failed to create payment session"
    );
  }
  console.log(result);

  return result;
};
"use server";

import { logout } from "@/service/logout";
import { redirect } from "next/navigation";

export type RegisterState = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: {
        user?: {
            id: string;
            name: string;
            email: string;
            status: string;
            role: string;
            createdAt: string;
            updatedAt: string;
        };
    };
};

export const registerAction = async (
    prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> => {
    console.log(formData);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const terms = formData.get("terms") === "on";


    if (password !== confirmPassword) {
        return {
            success: false,
            statusCode: 400,
            message: "Invalid Password!",
        };
    }

    if (!terms) {
        return {
            success: false,
            statusCode: 400,
            message: "Please accept the terms and privacy policy",
        };
    }


    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                role,
                password,
            }),
        }
    );

    const result = await res.json();

    if (!result.success) {
        return result;
    }
    else if (result.success) {

        await logout();

        redirect("/login");
    }

    return result;
};
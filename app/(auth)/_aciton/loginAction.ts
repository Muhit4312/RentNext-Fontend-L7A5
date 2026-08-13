"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"

type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export const loginAction = async (prevState: LoginState, formData: FormData) => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const result = await res.json();

    if(result.success) {
        const cookieStore = await cookies();
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24
            
        });
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        });

        const decodedToken = jwt.decode(result.data.accessToken) as jwt.JwtPayload;
        
        if(decodedToken && decodedToken.role === "TENANT") {
            redirect("/dashboard/tenant");
        }
        else if(decodedToken && decodedToken.role === "LANDLORD") {
            redirect("/dashboard/landlord");
        }else if(decodedToken && decodedToken.role === "ADMIN") {
            redirect("/dashboard/admin");
        }
    }

    return result;
} 
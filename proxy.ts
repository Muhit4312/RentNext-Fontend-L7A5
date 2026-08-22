import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtUtils } from './utils/jwt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { getNewAccessToken } from './service/accessToken'


const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password']
const PUBLIC_ROUTES = [...AUTH_ROUTES, '/', '/properties', '/about', '/contact', '/privacy-policy', '/terms-of-service']



export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname
    const cookieStore = await cookies()


    

    let accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value

    


    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!) as jwt.JwtPayload : null

    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!) as jwt.JwtPayload : null

    if (decodedRefreshToken && !decodedAccessToken) {
        const result = await getNewAccessToken()
        if (result.success) {
            const newAccessToken = result.data.accessToken

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24

            });

            accessToken = newAccessToken
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET!) as jwt.JwtPayload
        }
    }




    let userRole = null

    if (!decodedAccessToken) {
        cookieStore.delete("accessToken")
    }

    if (decodedAccessToken && decodedAccessToken.role) {
        userRole = decodedAccessToken.role
    }

    if (accessToken && AUTH_ROUTES.includes(path)) {
        if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        } else if (userRole === 'TENANT') {
            return NextResponse.redirect(new URL('/dashboard/tenant', request.url))
        } else if (userRole === 'LANDLORD') {
            return NextResponse.redirect(new URL('/dashboard/landlord', request.url))
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }


    const isPublicRoute = PUBLIC_ROUTES.some((route) => path === route || path.startsWith(route + '/'))

    // if (!accessToken && !isPublicRoute) {
        
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }

     if (!accessToken && !isPublicRoute) {

        const loginUrl = new URL('/login', request.url)

        loginUrl.searchParams.set("redirectTo", path)
        
        return NextResponse.redirect(loginUrl)
    }

    

    const isTenantRoute =
        path === "/dashboard/tenant" ||
        path.startsWith("/dashboard/tenant/");

    const isLandlordRoute =
        path === "/dashboard/landlord" ||
        path.startsWith("/dashboard/landlord/");

    const isAdminRoute =
        path === "/dashboard/admin" ||
        path.startsWith("/dashboard/admin/");

    if (isTenantRoute && userRole !== "TENANT") {
        return NextResponse.redirect(
            new URL("/not-found", request.url)
        );
    }

    if (isLandlordRoute && userRole !== "LANDLORD") {
        return NextResponse.redirect(
            new URL("/not-found", request.url)
        );
    }

    if (isAdminRoute && userRole !== "ADMIN") {
        return NextResponse.redirect(
            new URL("/not-found", request.url)
        );
    }

    return NextResponse.next()
}



export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
    ]
}
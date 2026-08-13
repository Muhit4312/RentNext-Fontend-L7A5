import jwt from "jsonwebtoken"

const verifyToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret)

        return decoded
    } catch (error) {
        console.log("Token verification failed:", error)
        return null
    }
}


export const jwtUtils = {
    verifyToken
}
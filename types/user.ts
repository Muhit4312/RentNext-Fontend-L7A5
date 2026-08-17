export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type IUser = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            status: string;
            role: UserRole;
            createdAt: string;
            updatedAt: string;
        };
    };
}

export type NavbarProps = {
    user: IUser
}
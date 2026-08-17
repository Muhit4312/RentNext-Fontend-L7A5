import { CreditCard, LayoutDashboard, Settings, User } from "lucide-react";

const dashboardRoutes = {
    TENANT: "/dashboard/tenant",
    LANDLORD: "/dashboard/landlord",
    ADMIN: "/dashboard/admin",
} as const;

export const userMenuItems = (role: string) => [
    {
        label: "Dashboard",
        href: dashboardRoutes[role as keyof typeof dashboardRoutes] ?? "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
    },
    {
        label: "Billing",
        href: "/billing",
        icon: CreditCard,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
    },
];
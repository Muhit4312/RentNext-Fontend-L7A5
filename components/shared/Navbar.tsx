"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
    LayoutDashboard,
    User,
    Settings,
    CreditCard,
    LogOut,
    Menu,
    X,
    Home,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { logout } from "@/service/logout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
]

const userMenuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Profile", href: "/profile", icon: User },
    { label: "Billing", href: "/billing", icon: CreditCard },
    { label: "Settings", href: "/settings", icon: Settings },


]



type IUser = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            status: string;
            role: string;
            createdAt: string;
            updatedAt: string;
        };
    };
}

type NavbarProps = {
    user: IUser
}



export function Navbar({ user }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();


    const handleLogout = async (action: string) => {
        if (action === "logout") {
            await logout();
            toast.success("Logged out successfully");
            router.push("/login");
            

        }
    }

    

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Home className="h-6 w-6 text-primary" />
                    <span className="text-2xl font-bold">
                        Rent<span className="text-primary">Nest</span>
                    </span>
                </Link>

                {/* Desktop nav links */}
                <ul className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="rounded-md text-black px-3 font-bold py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right side: user dropdown + mobile toggle */}
                <div className="flex items-center gap-2">

                    {
                        !user.success ? <div className="hidden items-center gap-3 md:flex">
                            <Button variant="outline">
                                <Link href="/login">Login</Link>
                            </Button>

                            <Button>
                                <Link href="/register">Register</Link>
                            </Button>
                        </div> : <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full"
                                        aria-label="Open user menu"
                                    />
                                }
                            >
                                <Avatar className="size-8">
                                    <AvatarImage src="/thoughtful-artist.png" alt="User avatar" />
                                    <AvatarFallback>Me</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-foreground">
                                                {user.data.user.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {user.data.user.email}
                                            </span>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {userMenuItems.map((item) => (
                                        <DropdownMenuItem key={item.href} render={<Link href={item.href} />}>
                                            <item.icon />
                                            {item.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={async () => {
                                    await handleLogout("logout")
                                }} variant="destructive">
                                    <LogOut />
                                    {isLoggedIn ? "Logging out..." : "Log out"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }




                    {/* Mobile menu toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((prev) => !prev)}
                    >
                        {mobileOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </nav>

            {/* Mobile nav links */}
            <div
                className={cn(
                    "border-t border-border md:hidden",
                    mobileOpen ? "block" : "hidden"
                )}
            >
                <ul className="flex flex-col gap-1 px-4 py-3">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}

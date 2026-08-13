import { Navbar } from "@/components/shared/Navbar"
import { getMe } from "@/service/getMe";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const user = await getMe();
    return (
        <div>
            <Navbar user={user}></Navbar>
            {children}
        </div>
    )

}
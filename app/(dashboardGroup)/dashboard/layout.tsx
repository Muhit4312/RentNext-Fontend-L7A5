import { Navbar } from "@/components/shared/Navbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import DashboardSidebar from "./_components/dashboard-sidebar";
import { getMe } from "@/service/getMe";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  console.log(user);

  return (
    <div className="min-h-screen bg-[#f6faf8]">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Dashboard */}
      <SidebarProvider>
        <DashboardSidebar user={user} />

        <SidebarInset>
          {/* Dashboard Header */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-white/95 px-4 backdrop-blur">
            <SidebarTrigger />

            <div className="h-5 w-px bg-slate-200" />

            <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
              Dashboard
            </h2>
          </header>

          {/* Main Content */}
          <main className="min-h-[calc(100vh-3.5rem)] w-full overflow-x-hidden p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
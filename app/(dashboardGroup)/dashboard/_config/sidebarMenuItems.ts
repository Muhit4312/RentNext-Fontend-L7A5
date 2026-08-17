import { Building2, ClipboardList, CreditCard, Home, LayoutDashboard, PlusCircle, Users } from "lucide-react";

export const sideMenuItems = {
  TENANT: [
    {
      title: "Overview",
      href: "/dashboard/tenant",
      icon: LayoutDashboard,
    },
    {
      title: "My Requests",
      href: "/dashboard/tenant/requests",
      icon: ClipboardList,
    },
    {
      title: "Payments",
      href: "/dashboard/tenant/payments",
      icon: CreditCard,
    },
    {
      title: "Reviews",
      href: "/dashboard/tenant/reviews",
      icon: Home,
    },
  ],

  LANDLORD: [
    {
      title: "Overview",
      href: "/dashboard/landlord",
      icon: LayoutDashboard,
    },
    {
      title: "My Properties",
      href: "/dashboard/landlord/properties",
      icon: Building2,
    },
    {
      title: "Add Property",
      href: "/dashboard/landlord/properties/new",
      icon: PlusCircle,
    },
    {
      title: "Rental Requests",
      href: "/dashboard/landlord/requests",
      icon: ClipboardList,
    },
  ],

  ADMIN: [
    {
      title: "Overview",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Properties",
      href: "/dashboard/admin/properties",
      icon: Building2,
    },
    {
      title: "Rental Requests",
      href: "/dashboard/admin/requests",
      icon: ClipboardList,
    },
  ],
};
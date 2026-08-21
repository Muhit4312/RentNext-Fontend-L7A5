import {
  Building2,
  ClipboardList,
  Users,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AdminOverviewCardsProps {
  totalUsers: number;
  totalProperties: number;
  totalRentalRequests: number;
}

const AdminOverviewCards = ({
  totalUsers,
  totalProperties,
  totalRentalRequests,
}: AdminOverviewCardsProps) => {
  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "Registered users on RentNest",
      icon: Users,
    },
    {
      title: "Total Properties",
      value: totalProperties,
      description: "Properties listed on platform",
      icon: Building2,
    },
    {
      title: "Rental Requests",
      value: totalRentalRequests,
      description: "Total rental requests",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="group relative overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Decorative background */}
            <div className="absolute -right-8 -top-8 size-28 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" />

            <CardHeader className="relative flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>

              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <Icon className="size-5" />
              </div>
            </CardHeader>

            <CardContent className="relative">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold tracking-tight">
                    {card.value.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>

                <ArrowUpRight className="size-5 text-muted-foreground/50 transition-colors group-hover:text-primary" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminOverviewCards;
import { Skeleton } from "@/components/ui/skeleton";

const AdminOverviewSkeleton = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-xl border p-6"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="size-10 rounded-xl" />
          </div>

          <Skeleton className="mt-5 h-9 w-20" />

          <Skeleton className="mt-2 h-3 w-40" />
        </div>
      ))}
    </div>
  );
};

export default AdminOverviewSkeleton;
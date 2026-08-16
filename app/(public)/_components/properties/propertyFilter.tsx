"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Category } from "@/types/category";

interface PropertyFiltersProps {
  categories: Category[];
}

export default function PropertyFilters({
  categories,
}: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "all";

  const handleCategoryChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    params.set("page", "1");

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="mb-8 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="font-semibold text-slate-900">
            Filter Properties
          </h2>

          <p className="text-sm text-slate-500">
            Filter by category
          </p>
        </div>

        <Select
          value={category}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Categories
            </SelectItem>

            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.name}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>
    </div>
  );
}
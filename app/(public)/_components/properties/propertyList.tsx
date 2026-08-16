"use client"
import { Property } from "@/types/property";
import PropertyCard from "./propertyCard";

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({
  properties,
}: PropertyGridProps) {
  if (!properties.length) {
    return (
      <div className="flex min-h-75 items-center justify-center rounded-xl border bg-white">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            No properties found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}
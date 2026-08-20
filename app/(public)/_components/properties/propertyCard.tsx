"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Bath } from "lucide-react";

import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-lg">
      
      {/* Image */}
      <Link href={`/properties/${property.id}`}>
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          {property.img ? (
            <Image
              unoptimized
              src={property.img}
              alt={property.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No image available
            </div>
          )}

          {/* Availability */}
          <div className="absolute right-3 top-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                property.isAvailable
                  ? "bg-white text-[#338263]"
                  : "bg-red-500 text-white"
              }`}
            >
              {property.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <div className="mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#338263]">
            {property.category.name}
          </span>
        </div>

        {/* Title */}
        <Link href={`/properties/${property.id}`}>
          <h2 className="line-clamp-1 text-lg font-semibold text-slate-900 transition group-hover:text-[#338263]">
            {property.title}
          </h2>
        </Link>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" />

          <span className="line-clamp-1">
            {property.location}
          </span>
        </div>

        {/* Amenities */}
        <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">

          <div className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4" />
            {property.bedrooms} Beds
          </div>

          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" />
            {property.bathrooms} Baths
          </div>

        </div>

        {/* Price */}
        <div className="mt-5 flex items-center justify-between border-t pt-4">

          <div>
            <span className="text-xl font-bold text-slate-900">
              ৳{Number(property.rent).toLocaleString()}
            </span>

            <span className="ml-1 text-sm text-slate-500">
              /month
            </span>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="text-sm font-semibold text-[#338263] hover:underline"
          >
            View details
          </Link>

        </div>
      </div>
    </article>
  );
}
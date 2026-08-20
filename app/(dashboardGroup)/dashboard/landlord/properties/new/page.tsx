import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PropertyCreateForm from "./_components/property-create-form";
import { getCategories } from "@/app/(public)/_action/category.action";

export default async function NewPropertyPage() {
  const result = await getCategories();

  const categories = result?.data?.categories ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/landlord/properties"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#338263]"
        >
          <ArrowLeft className="size-4" />
          Back to My Properties
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Add Property
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new rental property listing.
        </p>
      </div>

      {/* Form */}
      <PropertyCreateForm
        categories={categories}
      />
    </div>
  );
}
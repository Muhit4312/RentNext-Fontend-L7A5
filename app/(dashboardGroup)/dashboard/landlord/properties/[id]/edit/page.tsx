import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import PropertyEditForm from "./_components/property-edit-form";
import { getLandlordProperties } from "../../../_action/getLandlordProperties";
import { getCategories } from "@/app/(public)/_action/category.action";
import { LandlordProperty } from "@/types/lanlord";

interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;

  const [propertyResult, categoryResult] = await Promise.all([
    getLandlordProperties(),
    getCategories(),
  ]);

  const properties: LandlordProperty[] =
    propertyResult?.data?.properties ?? [];

  const categories = categoryResult?.data?.categories ?? [];

  const property = properties.find(
    (item: LandlordProperty) => item.id === id
  );

  if (!property) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-slate-100">
            <Home className="size-7 text-slate-400" />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-slate-900">
            Property Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The property you are trying to edit does not
            exist or you do not have permission to edit it.
          </p>

          <Link
            href="/dashboard/landlord/properties"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51]"
          >
            <ArrowLeft className="size-4" />
            Back to My Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <Link
        href="/dashboard/landlord/properties"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#338263]"
      >
        <ArrowLeft className="size-4" />
        Back to My Properties
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Edit Property
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update your property information and keep your
          listing details accurate.
        </p>
      </div>

      <PropertyEditForm
        property={property}
        categories={categories}
      />
    </div>
  );
}
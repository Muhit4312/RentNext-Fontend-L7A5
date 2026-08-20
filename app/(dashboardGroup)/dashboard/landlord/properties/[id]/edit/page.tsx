import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PropertyEditForm from "./_components/property-edit-form";
import { getLandlordProperties } from "../../../_action/getLandlordProperties";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPropertyPage({
  params,
}: PageProps) {
  const { id } = await params;

  const result = await getLandlordProperties();

  const properties = result?.data?.properties ?? [];

  const property = properties.find(
    (item: any) => item.id === id
  );

  if (!property) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Property not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Property doesn't exist or you don't have permission
            to edit it.
          </p>

          <Link
            href="/dashboard/landlord/properties"
            className="mt-5 inline-flex items-center rounded-lg bg-[#338263] px-4 py-2.5 text-sm font-medium text-white"
          >
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Link
        href="/dashboard/landlord/properties"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#338263]"
      >
        <ArrowLeft className="size-4" />
        Back to My Properties
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Edit Property
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update your property information.
        </p>
      </div>

      <PropertyEditForm property={property} />
    </div>
  );
}
import { getProperties } from "../_action/property.action";
import { getCategories } from "../_action/category.action";
import PropertyGrid from "../_components/properties/propertyList";
import PropertyFilters from "../_components/properties/propertyFilter";
import PropertyPagination from "../_components/properties/propertyPagination";

interface PropertiesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    searchTerm?: string;
    location?: string;
    category?: string;
    rent?: string;
    landlordId?: string;
    sortBy?: "createdAt" | "rent" | "title";
    sortOrder?: "asc" | "desc";
  }>;
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;

  const [result, categories] = await Promise.all([
    getProperties({
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 10,

      searchTerm: params.searchTerm,
      location: params.location,
      category: params.category,

      rent: params.rent
        ? Number(params.rent)
        : undefined,

      landlordId: params.landlordId,

      sortBy: params.sortBy || "createdAt",
      sortOrder: params.sortOrder || "desc",
    }),

    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#f6faf8]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-sm font-semibold text-[#338263]">
            Find your place
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Explore Properties
          </h1>

          <p className="mt-2 text-slate-500">
            Find a rental property that fits your lifestyle.
          </p>
        </div>

        <PropertyFilters
          categories={categories.data.categories}
        />

        <PropertyGrid
          properties={result.data}
        />

        <PropertyPagination
          page={result.meta.page}
          totalPage={result.meta.totalPage}
        />

      </div>
    </main>
  );
}
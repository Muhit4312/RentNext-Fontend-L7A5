"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { createProperty, CreatePropertyPayload } from "../_action/property.action";



interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface PropertyCreateFormProps {
  categories: Category[];
}

export default function PropertyCreateForm({
  categories,
}: PropertyCreateFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    categoryId: "",
    isAvailable: true,
  });

  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");

  // -----------------------------
  // Handle input changes
  // -----------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Add image
  // -----------------------------

  const addImage = () => {
    const url = imageInput.trim();

    if (!url) {
      toast.error("Please enter an image URL.");
      return;
    }

    if (images.includes(url)) {
      toast.error("This image URL has already been added.");
      return;
    }

    setImages((prev) => [...prev, url]);
    setImageInput("");
  };

  // -----------------------------
  // Remove image
  // -----------------------------

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim()) {
      toast.error("Property title is required.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Property description is required.");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Property location is required.");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select a property category.");
      return;
    }

    if (!formData.rent || Number(formData.rent) <= 0) {
      toast.error("Please enter a valid monthly rent.");
      return;
    }

    if (
      formData.bedrooms === "" ||
      Number(formData.bedrooms) < 0
    ) {
      toast.error("Please enter a valid number of bedrooms.");
      return;
    }

    if (
      formData.bathrooms === "" ||
      Number(formData.bathrooms) < 0
    ) {
      toast.error("Please enter a valid number of bathrooms.");
      return;
    }

    setLoading(true);

    try {
      const payload: CreatePropertyPayload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        rent: Number(formData.rent),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        categoryId: formData.categoryId,
        img: imageInput.trim() || undefined,
        isAvailable: formData.isAvailable,
      };

      const result = await createProperty(payload);

      if (!result.success) {
        toast.error(
          result.message || "Failed to create property."
        );
        return;
      }

      toast.success("Property listed successfully!");

      router.refresh();
      router.push("/dashboard/landlord/properties");
      
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong while creating the property."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border bg-white p-6 shadow-sm"
    >
      {/* -------------------------------- */}
      {/* Basic Information */}
      {/* -------------------------------- */}

      <div>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Property Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Provide the basic information about your rental property.
          </p>
        </div>

        <div className="space-y-5">
          {/* Title */}

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-slate-700"
            >
              Property Title
            </label>

            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Modern 3-Bedroom Apartment in Dhanmondi"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
            />

            <p className="text-xs text-slate-400">
              Choose a clear and attractive title for your property.
            </p>
          </div>

          {/* Description */}

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-slate-700"
            >
              Property Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Describe the property's condition, amenities, nearby facilities, and other important details..."
              className="w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
            />

            <p className="text-xs text-slate-400">
              Include useful details that can help tenants understand
              the property.
            </p>
          </div>

          {/* Location */}

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="text-sm font-medium text-slate-700"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g. Dhanmondi, Dhaka"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
            />
          </div>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* Property Details */}
      {/* -------------------------------- */}

      <div className="border-t pt-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Property Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add pricing, category, and basic property specifications.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Rent */}

          <div className="space-y-2">
            <label
              htmlFor="rent"
              className="text-sm font-medium text-slate-700"
            >
              Monthly Rent
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                ৳
              </span>

              <input
                id="rent"
                name="rent"
                type="number"
                min="1"
                value={formData.rent}
                onChange={handleChange}
                required
                placeholder="Enter monthly rent"
                className="w-full rounded-lg border py-2.5 pl-8 pr-3 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
              />
            </div>
          </div>

          {/* Category */}

          <div className="space-y-2">
            <label
              htmlFor="categoryId"
              className="text-sm font-medium text-slate-700"
            >
              Property Category
            </label>

            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
            >
              <option value="">
                Select a property category
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}

          <div className="space-y-2">
            <label
              htmlFor="bedrooms"
              className="text-sm font-medium text-slate-700"
            >
              Bedrooms
            </label>

            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              min="0"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              placeholder="e.g. 3"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
            />
          </div>

          {/* Bathrooms */}

          <div className="space-y-2">
            <label
              htmlFor="bathrooms"
              className="text-sm font-medium text-slate-700"
            >
              Bathrooms
            </label>

            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              min="0"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              placeholder="e.g. 2"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
            />
          </div>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* Property Images */}
      {/* -------------------------------- */}

      <div className="border-t pt-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Property Images
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add publicly accessible image URLs for your property.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            placeholder="Paste a publicly accessible property image URL"
            className="flex-1 rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
          />

          <button
            type="button"
            onClick={addImage}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Plus className="size-4" />
            Add Image
          </button>
        </div>

        {images.length > 0 && (
          <div className="mt-4 space-y-2">
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg border bg-slate-50 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs text-slate-600">
                    {image}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="shrink-0 rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove image"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <div className="mt-4 rounded-lg border border-dashed bg-slate-50 px-4 py-6 text-center">
            <p className="text-sm text-slate-400">
              No property images added yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add at least one image URL to make your listing more attractive.
            </p>
          </div>
        )}
      </div>

      {/* -------------------------------- */}
      {/* Availability */}
      {/* -------------------------------- */}

      <div className="border-t pt-8">
        <div className="flex items-center justify-between rounded-xl border bg-slate-50 p-4">
          <div>
            <p className="text-sm font-medium text-slate-900">
              Property Availability
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              When enabled, tenants can view and request this property.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                isAvailable: !prev.isAvailable,
              }))
            }
            aria-label="Toggle property availability"
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${formData.isAvailable
                ? "bg-[#338263]"
                : "bg-slate-300"
              }`}
          >
            <span
              className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition ${formData.isAvailable
                  ? "left-6"
                  : "left-1"
                }`}
            />
          </button>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* Actions */}
      {/* -------------------------------- */}

      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            router.push("/dashboard/landlord/properties")
          }
          className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[#338263] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Property..." : "Create Property"}
        </button>
      </div>
    </form>
  );
}
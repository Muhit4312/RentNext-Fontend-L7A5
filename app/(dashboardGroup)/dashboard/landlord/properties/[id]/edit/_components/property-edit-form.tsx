"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  updateProperty,
  UpdatePropertyPayload,
} from "../../../_action/property.action";

interface Category {
  id: string;
  name: string;
}

interface PropertyEditFormProps {
  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    rent: string | number;
    categoryId: string;
    bedrooms: number;
    bathrooms: number;
    img?: string | null;
    isAvailable: boolean;
  };
  categories: Category[];
}

export default function PropertyEditForm({
  property,
  categories,
}: PropertyEditFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: property.title ?? "",
    description: property.description ?? "",
    location: property.location ?? "",
    rent: String(property.rent ?? ""),
    bedrooms: String(property.bedrooms ?? ""),
    bathrooms: String(property.bathrooms ?? ""),
    categoryId: property.categoryId ?? "",
    img: property.img ?? "",
    isAvailable: property.isAvailable ?? true,
  });

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Property title is required.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please provide a description for the property.");
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

    if (Number(formData.rent) <= 0) {
      toast.error("Monthly rent must be greater than 0.");
      return;
    }

    if (Number(formData.bedrooms) < 0) {
      toast.error("Bedrooms cannot be negative.");
      return;
    }

    if (Number(formData.bathrooms) < 0) {
      toast.error("Bathrooms cannot be negative.");
      return;
    }

    setLoading(true);

    try {
      const payload: UpdatePropertyPayload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        rent: Number(formData.rent),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        categoryId: formData.categoryId,
        img: formData.img.trim() || undefined,
        isAvailable: formData.isAvailable,
      };

      const result = await updateProperty(
        property.id,
        payload
      );

      if (!result.success) {
        toast.error(
          result.message || "Failed to update property."
        );
        return;
      }

      toast.success("Property updated successfully.");
      router.refresh();
      router.push("/dashboard/landlord/properties");
      
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong while updating the property."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7 rounded-2xl border bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Property Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Update the basic information about your rental property.
        </p>
      </div>

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
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Spacious Family Apartment in Dhanmondi"
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
        />
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
          placeholder="Describe the property's condition, facilities, surroundings, and other important details."
          className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
        />
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
          type="text"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Dhanmondi, Dhaka"
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
        />
      </div>

      {/* Rent / Bedrooms / Bathrooms */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* Rent */}
        <div className="space-y-2">
          <label
            htmlFor="rent"
            className="text-sm font-medium text-slate-700"
          >
            Monthly Rent
          </label>

          <input
            id="rent"
            name="rent"
            type="number"
            min="1"
            value={formData.rent}
            onChange={handleChange}
            placeholder="85000"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
          />
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
            placeholder="3"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
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
            placeholder="2"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
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
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
        >
          <option value="" disabled>
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

        <p className="text-xs text-slate-400">
          Choose the category that best describes this property.
        </p>
      </div>

      {/* Image */}
      <div className="space-y-2">
        <label
          htmlFor="img"
          className="text-sm font-medium text-slate-700"
        >
          Property Image URL
        </label>

        <input
          id="img"
          name="img"
          type="url"
          value={formData.img}
          onChange={handleChange}
          placeholder="https://example.com/property-image.jpg"
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
        />

        <p className="text-xs text-slate-400">
          Provide a publicly accessible image URL for your property.
        </p>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="text-sm font-medium text-slate-900">
            Property Availability
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Allow tenants to send rental requests for this property.
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
          className={`relative h-6 w-11 rounded-full transition ${
            formData.isAvailable
              ? "bg-[#338263]"
              : "bg-slate-300"
          }`}
          aria-label="Toggle property availability"
        >
          <span
            className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition ${
              formData.isAvailable
                ? "left-6"
                : "left-1"
            }`}
          />
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            router.push(
              "/dashboard/landlord/properties"
            )
          }
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#338263] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && (
            <Loader2 className="size-4 animate-spin" />
          )}

          {loading
            ? "Saving Changes..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
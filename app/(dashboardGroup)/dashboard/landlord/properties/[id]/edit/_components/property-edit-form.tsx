"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";
import { updateProperty, UpdatePropertyPayload } from "../../../_action/property.action";



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
    images?: string[];
    isAvailable: boolean;
  };
}

export default function PropertyEditForm({
  property,
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
    isAvailable: property.isAvailable ?? true,
  });

  const [images, setImages] = useState<string[]>(
  property.images ?? []
);
  const [imageInput, setImageInput] = useState("");

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

  const addImage = () => {
    const url = imageInput.trim();

    if (!url) return;

    if (images.includes(url)) {
      toast.error("This image URL is already added.");
      return;
    }

    setImages((prev) => [...prev, url]);
    setImageInput("");
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

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

    if (!formData.categoryId.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (Number(formData.rent) <= 0) {
      toast.error("Rent must be greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const payload: UpdatePropertyPayload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        rent: Number(formData.rent),
        categoryId: formData.categoryId,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        images,
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

      toast.success("Property updated successfully!");

      router.push("/dashboard/landlord/properties");
      router.refresh();
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
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
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
          placeholder="Luxury Apartment"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          placeholder="Describe your property..."
          className="w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
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
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="Dhaka"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
        />
      </div>

      {/* Rent / Bedrooms / Bathrooms */}
      <div className="grid gap-5 md:grid-cols-3">
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
            required
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
          />
        </div>

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
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
          />
        </div>

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
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label
          htmlFor="categoryId"
          className="text-sm font-medium text-slate-700"
        >
          Category ID
        </label>

        <input
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
        />
      </div>

      {/* Images */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700">
          Property Images
        </label>

        <div className="flex gap-2">
          <input
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
          />

          <button
            type="button"
            onClick={addImage}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            <Plus className="size-4" />
            Add
          </button>
        </div>

        {images.length > 0 && (
          <div className="space-y-2">
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="flex items-center justify-between rounded-lg border bg-slate-50 px-3 py-2"
              >
                <p className="max-w-[80%] truncate text-xs text-slate-600">
                  {image}
                </p>

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between rounded-xl border bg-slate-50 p-4">
        <div>
          <p className="text-sm font-medium text-slate-900">
            Property Availability
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Allow tenants to request this property.
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
        >
          <span
            className={`absolute top-1 size-4 rounded-full bg-white transition ${
              formData.isAvailable
                ? "left-6"
                : "left-1"
            }`}
          />
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            router.push("/dashboard/landlord/properties")
          }
          className="rounded-lg border px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[#338263] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#286b51] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Property"}
        </button>
      </div>
    </form>
  );
}
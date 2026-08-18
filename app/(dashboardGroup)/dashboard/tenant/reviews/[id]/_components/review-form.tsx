"use client";

import { useState } from "react";
import { Loader2, Send, Star } from "lucide-react";
import { toast } from "sonner";
import { createReview } from "../_action/review.action";


interface ReviewFormProps {
  propertyId: string;
}

const ratingLabels = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export default function ReviewForm({ propertyId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const currentRating = hoverRating || rating;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write your review.");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        propertyId,
        rating,
        comment: comment.trim(),
      };

      const result = await createReview(payload);

      if (!result?.success) {
        throw new Error(
          result?.message || "Failed to create review."
        );
      }

      toast.success("Review submitted successfully!");

      setRating(0);
      setComment("");

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Rating */}
      <div>
        <label className="text-sm font-medium text-slate-900">
          How would you rate this property?
        </label>

        <div className="mt-4 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => {
            const active = value <= currentRating;

            return (
              <button
                key={value}
                type="button"
                disabled={loading}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(value)}
                className="rounded-md p-1 transition hover:scale-110 disabled:cursor-not-allowed"
                aria-label={`Rate ${value} out of 5`}
              >
                <Star
                  className={`size-8 transition ${
                    active
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {rating > 0 && (
          <p className="mt-2 text-sm font-medium text-slate-600">
            {rating}/5 —{" "}
            {ratingLabels[rating as keyof typeof ratingLabels]}
          </p>
        )}
      </div>

      {/* Comment */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="comment"
            className="text-sm font-medium text-slate-900"
          >
            Your Experience
          </label>

          <span className="text-xs text-slate-400">
            {comment.length}/500
          </span>
        </div>

        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setComment(e.target.value);
            }
          }}
          placeholder="Tell us about your experience with this property..."
          rows={7}
          disabled={loading}
          className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
        />

        <p className="mt-2 text-xs text-slate-400">
          Share your honest experience about the property, location,
          landlord communication, and overall rental experience.
        </p>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end border-t pt-5">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#338263] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#286b51] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Submit Review
            </>
          )}
        </button>
      </div>
    </form>
  );
}
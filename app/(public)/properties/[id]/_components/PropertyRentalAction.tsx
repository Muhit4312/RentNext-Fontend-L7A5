"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createRentalRequest } from "../_action/create-rental-request";

interface RentalRequestFormProps {
  propertyId: string;
  onSuccess?: () => void;
}

const RentalRequestForm = ({
  propertyId,
  onSuccess,
}: RentalRequestFormProps) => {
  const [note, setNote] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!note.trim()) {
      setError("Please enter a note.");
      return;
    }

    if (!moveInDate) {
      setError("Please select a move-in date.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }

    try {
      setIsPending(true);

      const result = await createRentalRequest({
        propertyId,
        note: note.trim(),
        moveInDate,
        message: message.trim(),
      });

      if (!result.success) {
        setError(
          result.message ||
            "Failed to submit rental request."
        );
        return;
      }

      // Reset form
      setNote("");
      setMoveInDate("");
      setMessage("");

      // Tell parent that request was successful
      onSuccess?.();
    } catch (error) {
      console.error(
        "Rental request error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
    >
      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Note */}
      <div>
        <label
          htmlFor="rental-note"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Note
        </label>

        <input
          id="rental-note"
          type="text"
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
          placeholder="Example: I am interested in this property"
          disabled={isPending}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/10 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* Move In Date */}
      <div className="mt-5">
        <label
          htmlFor="rental-move-in-date"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Preferred Move-in Date
        </label>

        <input
          id="rental-move-in-date"
          type="date"
          value={moveInDate}
          min={new Date()
            .toISOString()
            .split("T")[0]}
          onChange={(e) =>
            setMoveInDate(e.target.value)
          }
          disabled={isPending}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/10 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* Message */}
      <div className="mt-5">
        <label
          htmlFor="rental-message"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Message
        </label>

        <textarea
          id="rental-message"
          rows={4}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Tell the landlord why you are interested..."
          disabled={isPending}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/10 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="mt-5 w-full bg-[#338263] hover:bg-[#286b51]"
      >
        <Send className="mr-2 h-4 w-4" />

        {isPending
          ? "Submitting Request..."
          : "Submit Rental Request"}
      </Button>
    </form>
  );
};

export default RentalRequestForm;
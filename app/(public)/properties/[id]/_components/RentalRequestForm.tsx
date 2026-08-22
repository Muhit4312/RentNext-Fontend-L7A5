"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  FileText,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createRentalRequest } from "../_action/create-rental-request";

interface RentalRequestFormProps {
  propertyId: string;
}

interface FormState {
  success: boolean;
  message: string;
}

const initialState: FormState = {
  success: false,
  message: "",
};

export default function RentalRequestForm({
  propertyId,
}: RentalRequestFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      const result = await createRentalRequest({
        propertyId,
        note: formData.get("note") as string,
        moveInDate: formData.get("moveInDate") as string,
        message: formData.get("message") as string,
      });

      return {
        success: result.success,
        message: result.message,
      };
    },
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="mt-6 space-y-6">
      {/* Note + Move-in Date */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="note"
            className="flex items-center gap-2 text-sm font-semibold text-slate-800"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#338263]/10">
              <FileText className="h-4 w-4 text-[#338263]" />
            </span>
            Short note
          </label>

          <Input
            id="note"
            name="note"
            placeholder="I'm interested in this property"
            required
            disabled={pending}
            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 transition focus-visible:border-[#338263] focus-visible:ring-[#338263]/20"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="moveInDate"
            className="flex items-center gap-2 text-sm font-semibold text-slate-800"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#338263]/10">
              <CalendarDays className="h-4 w-4 text-[#338263]" />
            </span>
            Preferred move-in date
          </label>

          <Input
            id="moveInDate"
            name="moveInDate"
            type="date"
            required
            disabled={pending}
            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 transition focus-visible:border-[#338263] focus-visible:ring-[#338263]/20"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="flex items-center gap-2 text-sm font-semibold text-slate-800"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#338263]/10">
            <MessageSquare className="h-4 w-4 text-[#338263]" />
          </span>
          Message
        </label>

        <Textarea
          id="message"
          name="message"
          placeholder="Tell the landlord a little about yourself and your rental request..."
          rows={5}
          required
          disabled={pending}
          className="resize-none rounded-xl border-slate-200 bg-slate-50/50 transition focus-visible:border-[#338263] focus-visible:ring-[#338263]/20"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-start border-t border-slate-100 pt-5">
        <Button
          type="submit"
          disabled={pending}
          className="h-11 rounded-xl bg-[#338263] px-6 font-semibold text-white shadow-sm transition-all hover:bg-[#28694f] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Submitting...
            </>
          ) : (
            <>
              Submit Rental Request
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
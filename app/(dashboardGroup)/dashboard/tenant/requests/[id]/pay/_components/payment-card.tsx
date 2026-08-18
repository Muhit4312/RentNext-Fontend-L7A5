"use client";

import { useState } from "react";
import {
  CreditCard,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { createPayment } from "../_aciton/payment.action";



interface PaymentCardProps {
  rentalRequestId: string;
  propertyTitle: string;
  amount: number;
}

export default function PaymentCard({
  rentalRequestId,
  propertyTitle,
  amount,
}: PaymentCardProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const result = await createPayment(rentalRequestId);

      const paymentUrl = result?.data?.paymentUrl;

      if (!paymentUrl) {
        throw new Error("Payment URL was not returned.");
      }

      window.location.href = paymentUrl;
    } catch (error: any) {
      console.error("Payment error:", error);

      toast.error(
        error?.message || "Unable to initiate payment"
      );

      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50">
        <CreditCard className="size-6 text-[#338263]" />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-slate-900">
        Payment Summary
      </h2>

      <div className="mt-5 space-y-4">
        <div className="flex items-start justify-between gap-4 text-sm">
          <span className="text-slate-500">
            Property
          </span>

          <span className="max-w-40 text-right font-medium text-slate-900">
            {propertyTitle}
          </span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Monthly Rent
            </span>

            <span className="text-2xl font-bold text-[#338263]">
              ৳{amount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#338263] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#286b51] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Redirecting to Stripe...
          </>
        ) : (
          <>
            <CreditCard className="size-4" />
            Proceed to Payment
          </>
        )}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
        <ShieldCheck className="size-4" />
        Secure payment powered by Stripe
      </div>
    </div>
  );
}
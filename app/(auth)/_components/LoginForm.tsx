"use client";
import Link from "next/link";
import { ArrowRight, Home, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_aciton/loginAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? ""

  const [state, action, pending] = useActionState(loginAction.bind(null,redirectTo), false);
  useEffect(() => {
        if (!state) {
            return
        }
        if (!state.success) {
            toast.error(state.message || "Login failed!")
        }
    }, [state])

  return (
    <main className="min-h-screen bg-[#f6faf8]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <section className="relative hidden overflow-hidden bg-[#338263] lg:flex">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10" />

          <div className="absolute -bottom-40 -right-20 h-125 w-125 rounded-full bg-white/10" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">


            {/* Hero */}
            <div className="max-w-xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                <ShieldCheck className="h-4 w-4" />
                Trusted rental platform
              </div>

              <h1 className="text-3xl font-bold leading-tight text-white xl:text-5xl">
                Find a place
                <br />
                you&apos;ll love to
                <br />
                <span className="text-emerald-100">
                  call home.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-emerald-50/80">
                Discover beautiful rental properties, connect
                with landlords, and find your perfect home.
              </p>

              {/* Stats */}
              <div className="mt-10 flex gap-10">
                <div>
                  <p className="text-2xl font-bold text-white">
                    10K+
                  </p>

                  <p className="text-sm text-emerald-100/70">
                    Properties
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">
                    8K+
                  </p>

                  <p className="text-sm text-emerald-100/70">
                    Tenants
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">
                    4.9
                  </p>

                  <p className="text-sm text-emerald-100/70">
                    Rating
                  </p>
                </div>
              </div>
            </div>

            
          </div>
        </section>

        {/* Right Side */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-10 flex items-center justify-center gap-2 lg:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#338263] text-white">
                <Home className="h-5 w-5" />
              </span>

              <span className="text-2xl font-bold text-slate-900">
                Rent<span className="text-[#338263]">Nest</span>
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#338263]">
                Welcome back!
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your email and password to continue to RentNest.
              </p>
            </div>

            {/* Form */}
            <form action={action} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email address
                </Label>

                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                  className="h-12 bg-white focus-visible:ring-[#338263]"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">

                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    Password
                  </Label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-[#338263] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="h-12 bg-white focus-visible:ring-[#338263]"
                />
              </div>



              {/* Submit */}
              <Button
                type="submit"
                className="h-12 w-full bg-[#338263] text-base font-semibold text-white hover:bg-[#286b50]"
              >
                {
                  pending ? "Submitting..." : <div className="flex items-center justify-center">
                    <p className="inline-block">Sign in</p>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>

                }

              </Button>

              {state?.error && (
                <p className="text-sm text-center text-red-500">
                  {state.message || "An error occurred. Please try again."}
                </p>
              )}

            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#338263] hover:underline"
              >
                Create an account
              </Link>
            </p>

          </div>
        </section>

      </div>
    </main>
  );
}
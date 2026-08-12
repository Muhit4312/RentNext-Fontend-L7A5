import Link from "next/link";
import { ArrowRight, Home, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  return (
    <main className="min-h-screen bg-[#f6faf8]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <section className="relative hidden overflow-hidden bg-[#338263] lg:flex">
          {/* Decorative circles */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10" />

          <div className="absolute -bottom-40 -right-20 h-125 w-125 rounded-full bg-white/10" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Home className="h-5 w-5" />
              </span>

              RentNest
            </Link>

            {/* Hero */}
            <div className="max-w-xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                <ShieldCheck className="h-4 w-4" />
                Trusted rental platform
              </div>

              <h1 className="text-5xl font-bold leading-tight text-white xl:text-6xl">
                Your next home
                <br />
                is just a few
                <br />
                <span className="text-emerald-100">
                  clicks away.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-emerald-50/80">
                Join RentNest and discover beautiful rental
                properties that match your lifestyle.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-4">

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm text-white">
                    ✓
                  </span>

                  <p className="text-sm text-emerald-50">
                    Thousands of rental properties
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm text-white">
                    ✓
                  </span>

                  <p className="text-sm text-emerald-50">
                    Easy and secure rental requests
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm text-white">
                    ✓
                  </span>

                  <p className="text-sm text-emerald-50">
                    Trusted landlords and tenants
                  </p>
                </div>

              </div>
            </div>

            {/* Footer */}
            <p className="text-sm text-emerald-100/60">
              © 2026 RentNest. All rights reserved.
            </p>

          </div>
        </section>

        {/* Right Side */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-8 flex items-center justify-center gap-2 lg:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#338263] text-white">
                <Home className="h-5 w-5" />
              </span>

              <span className="text-2xl font-bold text-slate-900">
                Rent<span className="text-[#338263]">Nest</span>
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-7">
              <p className="text-sm font-semibold text-[#338263]">
                Get started 🚀
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Join RentNest and start finding your perfect home.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4">

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full name
                </Label>

                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="h-11 bg-white focus-visible:ring-[#338263]"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email address
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 bg-white focus-visible:ring-[#338263]"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">
                  I want to
                </Label>

                <select
                  id="role"
                  defaultValue=""
                  className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm outline-none transition focus:border-[#338263] focus:ring-2 focus:ring-[#338263]/20"
                >
                  <option value="" disabled>
                    Select your role
                  </option>

                  <option value="TENANT">
                    Find a rental property
                  </option>

                  <option value="LANDLORD">
                    List my property
                  </option>
                </select>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="h-11 bg-white focus-visible:ring-[#338263]"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm password
                </Label>

                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="h-11 bg-white focus-visible:ring-[#338263]"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#338263]"
                />

                <Label
                  htmlFor="terms"
                  className="cursor-pointer text-xs font-normal leading-5 text-slate-500"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-[#338263] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-[#338263] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="mt-2 h-12 w-full bg-[#338263] text-base font-semibold text-white hover:bg-[#286b50]"
              >
                Create account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#338263] hover:underline"
              >
                Sign in
              </Link>
            </p>

          </div>
        </section>

      </div>
    </main>
  );
}

"use client"

import { AlertTriangle, Home, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Something went wrong
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
          We couldn&apos;t load this page right now. Please try again or
          return to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto"
          >
            <a href="/">
              Go home
            </a>
          </Button>
        </div>

        {/* Brand */}
        <div className="mt-10">
          <p className="text-sm font-semibold">
            RentNest
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Find a place you&apos;ll love to call home.
          </p>
        </div>
      </div>
    </main>
  )
}


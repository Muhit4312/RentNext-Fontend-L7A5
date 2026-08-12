
import Link from "next/link"
import { ArrowLeft, Home, SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <SearchX className="h-10 w-10 text-primary" />
        </div>

        {/* 404 */}
        <p className="text-7xl font-bold tracking-tight text-primary sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          It may have been moved or the URL might be incorrect.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button className="w-full sm:w-auto">
            <Link href="/">
             
              Go to Home
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Brand */}
        <div className="mt-10">
          <p className="font-semibold">RentNest</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Find a place you&apos;ll love to call home.
          </p>
        </div>
      </div>
    </main>
  )
}


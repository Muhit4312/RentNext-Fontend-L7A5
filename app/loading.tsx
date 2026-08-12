
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        {/* Logo / Brand */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
          <span className="text-2xl font-bold text-primary-foreground">
            R
          </span>
        </div>

        {/* Spinner */}
        <div className="mb-5">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>

        {/* Text */}
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Loading RentNest...
        </h1>

        <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
          Please wait while we prepare everything for you.
        </p>

        {/* Loading dots */}
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </main>
  )
}

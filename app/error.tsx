'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h2 className="text-4xl font-serif mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-primary text-background rounded hover:bg-primary-light transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

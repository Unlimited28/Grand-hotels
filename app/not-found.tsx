import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h2 className="text-4xl font-serif mb-4">404 - Page Not Found</h2>
      <p className="mb-8 text-neutral-400">The luxury you seek is in another room.</p>
      <Link href="/" className="px-6 py-2 bg-primary text-background rounded hover:bg-primary-light transition-colors">
        Return Home
      </Link>
    </div>
  )
}

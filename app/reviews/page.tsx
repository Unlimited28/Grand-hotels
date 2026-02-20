import { prisma } from "@/lib/prisma";
import ReviewForm from "@/components/ReviewForm";
import { Star } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { created_at: "desc" },
  });

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-20">
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 block">Testimonials</span>
          <h1 className="text-5xl font-serif text-[#1A1A1A] mb-6">Guest Experiences</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Read what our guests have to say about their stay at Grand Commodores.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left: Review List */}
          <div className="space-y-12">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-12">
                <div className="flex text-gold-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? 'fill-current' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-gray-600 text-xl font-light italic mb-6 leading-relaxed">
                  "{review.message}"
                </p>
                <div>
                  <h3 className="text-[#1A1A1A] font-medium tracking-wide">{review.name}</h3>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Verified Guest • {new Date(review.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-gray-400 italic">No reviews yet. Be the first to share your experience!</p>
            )}
          </div>

          {/* Right: Review Form */}
          <div className="lg:sticky lg:top-40 h-fit bg-white p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Share Your Experience</h2>
            <p className="text-gray-500 mb-8 font-light">Your feedback helps us continue to provide exceptional service.</p>
            <ReviewForm />
          </div>
        </div>
      </div>
    </main>
  );
}

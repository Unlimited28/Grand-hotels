'use client';

import { useState } from 'react';

const initialReviews = [
  { id: 1, name: 'Adewale K.', rating: 5, comment: 'Exceptional service! The staff was very professional and the room was sparkling clean.', date: '2025-05-15' },
  { id: 2, name: 'Chidi O.', rating: 4, comment: 'Great atmosphere in the lounge. Had a wonderful stay with my family.', date: '2025-05-10' },
  { id: 3, name: 'Sarah B.', rating: 5, comment: 'The best hotel in Oyo. 24/7 power and fast internet made my business trip very productive.', date: '2025-05-02' },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ name: '', rating: '5', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In real app, send to API for moderation
    setTimeout(() => {
      setSubmitted(false);
      setNewReview({ name: '', rating: '5', comment: '' });
      alert('Thank you! Your review has been submitted for moderation.');
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 uppercase tracking-widest text-primary">Guest Reviews</h1>
          <p className="text-lg italic opacity-80">What our valued guests are saying about us.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {reviews.map(review => (
              <div key={review.id} className="bg-white p-10 shadow-sm border-l-8 border-primary relative">
                <div className="flex text-primary mb-4 text-xl">
                  {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-xl font-serif italic mb-6 leading-relaxed">"{review.comment}"</p>
                <div className="flex justify-between items-center border-t pt-6">
                  <span className="font-bold uppercase tracking-widest text-xs text-primary">{review.name}</span>
                  <span className="text-xs text-foreground/40">{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 shadow-2xl h-fit border-t-8 border-primary sticky top-32">
            <h3 className="text-2xl font-serif font-bold mb-8 italic text-center">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2 block">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  required
                  className="w-full border-b border-primary/20 p-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2 block">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                  className="w-full border-b border-primary/20 p-3 text-foreground focus:outline-none focus:border-primary transition-colors bg-transparent"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2 block">Comment</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  required
                  rows={4}
                  className="w-full border-b border-primary/20 p-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tell us about your stay..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-primary text-white py-4 uppercase text-xs font-bold tracking-widest hover:bg-foreground transition-all disabled:bg-gray-400"
              >
                {submitted ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

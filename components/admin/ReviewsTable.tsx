"use client";

import { useState } from "react";
import { Star, Check, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  approved: boolean;
  created_at: string;
}

export default function ReviewsTable({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);

  const toggleApproval = async (id: string, current: boolean) => {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !current }),
    });
    if (res.ok) {
      setReviews(reviews.map(r => r.id === id ? { ...r, approved: !current } : r));
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (res.ok) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Review</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {reviews.map((review) => (
            <tr key={review.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-medium text-dark">{review.name}</p>
                <p className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</p>
              </td>
              <td className="px-6 py-4 max-w-md">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < review.rating ? 'fill-gold text-gold' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{review.message}</p>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  review.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {review.approved ? 'Approved' : 'Pending'}
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className={review.approved ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}
                  onClick={() => toggleApproval(review.id, review.approved)}
                >
                  {review.approved ? <X size={18} /> : <Check size={18} />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => deleteReview(review.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Star } from "lucide-react";

export default function ReviewForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      setSuccess(true);
      setFormData({ name: "", message: "" });
      setRating(5);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm">
          Thank you! Your review has been submitted and is pending approval.
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star className={`w-8 h-8 ${star <= rating ? 'fill-gold text-gold' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Your Name</label>
        <Input
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Your Message</label>
        <textarea
          name="message"
          placeholder="Tell us about your stay..."
          required
          rows={4}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-dark hover:bg-gold text-white"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}

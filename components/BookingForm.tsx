"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface Room {
  id: string;
  name: string;
  price: number;
}

export default function BookingForm({ rooms }: { rooms: Room[] }) {
  const searchParams = useSearchParams();
  const roomIdFromQuery = searchParams.get("room");

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    room_id: roomIdFromQuery || "",
    check_in: "",
    check_out: "",
    guests: "1",
  });

  useEffect(() => {
    if (roomIdFromQuery) {
      setFormData((prev) => ({ ...prev, room_id: roomIdFromQuery }));
    }
  }, [roomIdFromQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-serif text-dark mb-4">Booking Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for choosing Grand Commodores. We have sent a confirmation email to {formData.email}.
        </p>
        <Button onClick={() => window.location.href = "/"} className="bg-dark">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <Input
            name="name"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <Input
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <Input
            name="phone"
            placeholder="+234 ..."
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Select Room</label>
          <select
            name="room_id"
            className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            required
            value={formData.room_id}
            onChange={handleChange}
          >
            <option value="">Select a room...</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} (₦{room.price.toLocaleString()})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-In Date</label>
          <Input
            name="check_in"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            value={formData.check_in}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-Out Date</label>
          <Input
            name="check_out"
            type="date"
            required
            min={formData.check_in || new Date().toISOString().split("T")[0]}
            value={formData.check_out}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Guests</label>
          <Input
            name="guests"
            type="number"
            min="1"
            max="10"
            required
            value={formData.guests}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gold hover:bg-gold-dark text-white py-6 text-lg"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Confirm Reservation"}
      </Button>
    </form>
  );
}

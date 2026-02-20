"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  room: { name: string; price: number };
  check_in: string;
  check_out: string;
  status: string;
  guests: number;
}

export default function BookingsTable({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
      }
    } catch (error) {
      console.error("Failed to update booking status", error);
    } finally {
      setLoadingId(null);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings(bookings.filter(b => b.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete booking", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Room</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In/Out</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-medium text-dark">{booking.name}</p>
                <p className="text-sm text-gray-500">{booking.email}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-dark font-medium">{booking.room.name}</p>
                <p className="text-xs text-gray-500">{booking.guests} Guests</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-dark">{format(new Date(booking.check_in), 'MMM dd, yyyy')}</p>
                <p className="text-sm text-gray-400">{format(new Date(booking.check_out), 'MMM dd, yyyy')}</p>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                  booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                {booking.status === 'PENDING' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-200 text-green-600 hover:bg-green-50"
                    onClick={() => updateStatus(booking.id, 'CONFIRMED')}
                    disabled={loadingId === booking.id}
                  >
                    Confirm
                  </Button>
                )}
                {booking.status !== 'CANCELLED' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => updateStatus(booking.id, 'CANCELLED')}
                    disabled={loadingId === booking.id}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-red-600"
                  onClick={() => deleteBooking(booking.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

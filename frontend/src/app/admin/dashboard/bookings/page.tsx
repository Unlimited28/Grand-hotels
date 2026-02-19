'use client';

import { useState } from 'react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([
    { id: '1', name: 'Adewale K.', room: 'Executive Suite', checkIn: '2025-05-15', checkOut: '2025-05-18', status: 'confirmed' },
    { id: '2', name: 'Sarah B.', room: 'Standard Room', checkIn: '2025-05-12', checkOut: '2025-05-14', status: 'pending' },
  ]);

  const updateStatus = (id: string, status: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-serif font-bold italic">Manage Bookings</h1>
      </div>

      <div className="bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-xs font-bold uppercase tracking-widest text-foreground/40">
              <th className="px-8 py-5">Guest</th>
              <th className="px-8 py-5">Room Type</th>
              <th className="px-8 py-5">Check In</th>
              <th className="px-8 py-5">Check Out</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6 font-bold">{booking.name}</td>
                <td className="px-8 py-6 text-foreground/60">{booking.room}</td>
                <td className="px-8 py-6 text-foreground/60">{booking.checkIn}</td>
                <td className="px-8 py-6 text-foreground/60">{booking.checkOut}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 font-bold uppercase text-[10px] ${
                    booking.status === 'confirmed' ? 'text-green-600 bg-green-50' :
                    booking.status === 'pending' ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right space-x-4">
                  <button onClick={() => updateStatus(booking.id, 'confirmed')} className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Confirm</button>
                  <button onClick={() => updateStatus(booking.id, 'cancelled')} className="text-xs font-bold text-red-400 hover:underline uppercase tracking-widest">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

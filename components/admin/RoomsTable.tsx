"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  availability: boolean;
  image_url: string;
}

export default function RoomsTable({ initialRooms }: { initialRooms: Room[] }) {
  const [rooms, setRooms] = useState(initialRooms);


  // Corrected the map logic
  const handleToggle = async (id: string, current: boolean) => {
    const res = await fetch(`/api/rooms/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availability: !current }),
    });
    if (res.ok) {
      setRooms(rooms.map(r => r.id === id ? { ...r, availability: !current } : r));
    }
  };

  const deleteRoom = async (id: string) => {
    if (!confirm("Are you sure? This will delete the room permanently.")) return;
    const res = await fetch(`/api/rooms/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Room</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Availability</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={room.image_url} alt={room.name} fill className="object-cover" />
                  </div>
                  <span className="font-medium text-dark">{room.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600 capitalize">{room.type.replace('_', ' ')}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-bold text-dark">₦{room.price.toLocaleString()}</span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleToggle(room.id, room.availability)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    room.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {room.availability ? 'Available' : 'Unavailable'}
                </button>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">Edit</Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => deleteRoom(room.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

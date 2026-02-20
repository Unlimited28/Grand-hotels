'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    availability: boolean;
    amenities: string;
}

export default function RoomManager({ initialRooms }: { initialRooms: Room[] }) {
    const [rooms, setRooms] = useState(initialRooms);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        availability: true,
        amenities: '',
    });

    const openAddModal = () => {
        setEditingRoom(null);
        setFormData({
            name: '',
            description: '',
            price: 0,
            image_url: '',
            availability: true,
            amenities: '',
        });
        setIsModalOpen(true);
    };

    const openEditModal = (room: Room) => {
        setEditingRoom(room);
        let ams = '';
        try {
            const parsed = JSON.parse(room.amenities);
            ams = Array.isArray(parsed) ? parsed.join(', ') : '';
        } catch (e) {
            ams = '';
        }
        setFormData({
            name: room.name,
            description: room.description,
            price: room.price,
            image_url: room.image_url,
            availability: room.availability,
            amenities: ams,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            ...formData,
            price: Number(formData.price),
            amenities: formData.amenities.split(',').map(s => s.trim()).filter(s => s !== ''),
        };

        const url = editingRoom ? `/api/rooms/${editingRoom.id}` : '/api/rooms';
        const method = editingRoom ? 'PATCH' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsModalOpen(false);
                router.refresh();
                // We'll also update local state for immediate feedback
                const updatedRoom = await res.json();
                if (editingRoom) {
                    setRooms(rooms.map(r => r.id === editingRoom.id ? updatedRoom : r));
                } else {
                    setRooms([updatedRoom, ...rooms]);
                }
            } else {
                const err = await res.json();
                alert(err.message || 'Error saving room');
            }
        } catch (error) {
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const deleteRoom = async (id: string) => {
        if (!confirm('Are you sure you want to delete this room?')) return;

        try {
            const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setRooms(rooms.filter(r => r.id !== id));
                router.refresh();
            }
        } catch (error) {
            alert('Error deleting room');
        }
    };

    return (
        <section id="rooms">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-gray-900">Manage Rooms</h2>
                <button
                    onClick={openAddModal}
                    className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-gold-700 transition-colors"
                >
                    Add New Room
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {rooms.map((room) => (
                        <li key={room.id} className="px-6 py-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{room.name}</h3>
                                <p className="text-sm text-gray-500">${room.price} / night</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => openEditModal(room)}
                                    className="text-primary hover:text-gold-700 text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteRoom(room.id)}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                    {rooms.length === 0 && (
                        <li className="px-6 py-10 text-center text-gray-500 italic">No rooms found.</li>
                    )}
                </ul>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-8 shadow-2xl">
                        <h3 className="text-2xl font-serif mb-6">{editingRoom ? 'Edit Room' : 'Add New Room'}</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Room Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full border-gray-200 border p-2 text-sm focus:border-primary focus:ring-0 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Price per Night</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                    className="w-full border-gray-200 border p-2 text-sm focus:border-primary focus:ring-0 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Availability</label>
                                <select
                                    value={formData.availability ? 'true' : 'false'}
                                    onChange={(e) => setFormData({...formData, availability: e.target.value === 'true'})}
                                    className="w-full border-gray-200 border p-2 text-sm focus:border-primary focus:ring-0 outline-none"
                                >
                                    <option value="true">Available</option>
                                    <option value="false">Occupied/Maintenance</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full border-gray-200 border p-2 text-sm focus:border-primary focus:ring-0 outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Amenities (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.amenities}
                                    placeholder="Free WiFi, Ocean View, King Bed"
                                    onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                                    className="w-full border-gray-200 border p-2 text-sm focus:border-primary focus:ring-0 outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                    className="w-full border-gray-200 border p-2 text-sm focus:border-primary focus:ring-0 outline-none"
                                />
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 text-xs uppercase tracking-widest text-gray-500 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#1A1A1A] text-white px-8 py-2 text-xs uppercase tracking-widest hover:bg-primary transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Room'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

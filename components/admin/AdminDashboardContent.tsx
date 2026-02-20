'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Calendar,
    MessageSquare,
    Star,
    Bed,
    CheckCircle,
    XCircle,
    Trash2,
    TrendingUp,
    Users,
    Clock,
    DollarSign
} from 'lucide-react';
import RoomManager from './RoomManager';

interface AdminDashboardContentProps {
    bookings: any[];
    messages: any[];
    reviews: any[];
    rooms: any[];
    metrics: {
        totalBookings: number;
        confirmedBookings: number;
        pendingBookings: number;
        totalRevenue: number;
        monthlyRevenue: number;
        unreadMessages: number;
        pendingReviews: number;
    }
}

export default function AdminDashboardContent({
    bookings: initialBookings,
    messages: initialMessages,
    reviews: initialReviews,
    rooms: initialRooms,
    metrics
}: AdminDashboardContentProps) {
    const [activeTab, setActiveTab] = useState<'bookings' | 'messages' | 'reviews' | 'rooms'>('bookings');
    const [bookings, setBookings] = useState(initialBookings);
    const [messages, setMessages] = useState(initialMessages);
    const [reviews, setReviews] = useState(initialReviews);
    const router = useRouter();

    const handleApproveReview = async (id: string, approved: boolean) => {
        try {
            const res = await fetch('/api/reviews', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, approved }),
            });
            if (res.ok) {
                setReviews(reviews.map(r => r.id === id ? { ...r, approved } : r));
                router.refresh();
            }
        } catch (error) {
            console.error('Error updating review', error);
        }
    };

    const handleDeleteBooking = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setBookings(bookings.filter(b => b.id !== id));
                router.refresh();
            }
        } catch (error) {
            console.error('Error deleting booking', error);
        }
    };

    const handleUpdateBookingStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
                router.refresh();
            }
        } catch (error) {
            console.error('Error updating booking status', error);
        }
    };

    const tabs = [
        { id: 'bookings', name: 'Bookings', icon: Calendar },
        { id: 'rooms', name: 'Rooms', icon: Bed },
        { id: 'reviews', name: 'Reviews', icon: Star },
        { id: 'messages', name: 'Messages', icon: MessageSquare },
    ];

    const stats = [
        { name: 'Monthly Revenue', value: `$${metrics.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600' },
        { name: 'Pending Bookings', value: metrics.pendingBookings, icon: Clock, color: 'text-yellow-600' },
        { name: 'Active Reviews', value: metrics.pendingReviews, icon: Star, color: 'text-blue-600' },
        { name: 'Total Revenue', value: `$${metrics.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-primary' },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">{stat.name}</p>
                        <h3 className="text-2xl font-serif text-gray-900 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="lg:w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
                                    activeTab === tab.id
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:bg-cream-100 hover:text-gray-900'
                                }`}
                            >
                                <tab.icon className={`mr-3 h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            {activeTab === 'bookings' && (
                                <section id="bookings">
                                    <h2 className="text-xl font-serif text-gray-900 mb-6">Manage Bookings</h2>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">Guest</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">Room</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">Dates</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">Status</th>
                                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-widest">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {bookings.map((booking) => (
                                                    <tr key={booking.id}>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                                            <div className="text-xs text-gray-500">{booking.email}</div>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {booking.room?.name || 'Unknown Room'}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 inline-flex text-[10px] leading-5 font-semibold rounded-full uppercase tracking-wider ${
                                                                booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                                booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {booking.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end gap-3">
                                                                {booking.status === 'PENDING' && (
                                                                    <button
                                                                        onClick={() => handleUpdateBookingStatus(booking.id, 'CONFIRMED')}
                                                                        className="text-green-600 hover:text-green-900 transition-colors" title="Confirm"
                                                                    >
                                                                        <CheckCircle size={18} />
                                                                    </button>
                                                                )}
                                                                {booking.status !== 'CANCELLED' && (
                                                                    <button
                                                                        onClick={() => handleUpdateBookingStatus(booking.id, 'CANCELLED')}
                                                                        className="text-yellow-600 hover:text-yellow-900 transition-colors" title="Cancel"
                                                                    >
                                                                        <XCircle size={18} />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => handleDeleteBooking(booking.id)}
                                                                    className="text-red-400 hover:text-red-600 transition-colors" title="Delete Permanent"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {bookings.length === 0 && (
                                                    <tr>
                                                        <td colSpan={5} className="px-4 py-10 text-center text-gray-500 italic">No bookings found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            )}

                            {activeTab === 'rooms' && (
                                <RoomManager initialRooms={initialRooms} />
                            )}

                            {activeTab === 'reviews' && (
                                <section id="reviews">
                                    <h2 className="text-xl font-serif text-gray-900 mb-6">Review Moderation</h2>
                                    <div className="grid gap-6">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900">{review.name}</h3>
                                                        <div className="flex text-gold-500 mt-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={14} className={i < review.rating ? 'fill-current' : 'text-gray-300'} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {!review.approved ? (
                                                            <button
                                                                onClick={() => handleApproveReview(review.id, true)}
                                                                className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded text-[10px] uppercase tracking-widest hover:bg-green-700 transition-colors"
                                                            >
                                                                <CheckCircle size={12} /> Approve
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleApproveReview(review.id, false)}
                                                                className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-[10px] uppercase tracking-widest hover:bg-gray-300 transition-colors"
                                                            >
                                                                <XCircle size={12} /> Hide
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm italic leading-relaxed">"{review.message}"</p>
                                                <p className="text-gray-400 text-[10px] mt-4 uppercase tracking-[0.2em]">{new Date(review.created_at).toLocaleDateString()}</p>
                                            </div>
                                        ))}
                                        {reviews.length === 0 && (
                                            <div className="p-10 text-center text-gray-500 italic">No reviews found.</div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {activeTab === 'messages' && (
                                <section id="messages">
                                    <h2 className="text-xl font-serif text-gray-900 mb-6">Contact Messages</h2>
                                    <div className="space-y-4">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-sm font-bold text-gray-900">{msg.name}</h3>
                                                        <p className="text-xs text-primary mt-0.5">{msg.email}</p>
                                                    </div>
                                                    <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">{new Date(msg.created_at).toLocaleString()}</span>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed bg-white p-4 rounded-lg border border-gray-100">{msg.message}</p>
                                            </div>
                                        ))}
                                        {messages.length === 0 && (
                                            <div className="p-10 text-center text-gray-500 italic">No messages found.</div>
                                        )}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

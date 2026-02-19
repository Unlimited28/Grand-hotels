'use client';

import { useState } from 'react';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: 'Standard Room',
    checkIn: '',
    checkOut: '',
    guests: '1'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // In a real app, we'd call the API here
      // const res = await fetch('http://localhost:5000/api/bookings', { ... });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setMessage({ type: 'success', text: 'Thank you! Your booking request has been submitted. We will contact you shortly to confirm.' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        roomType: 'Standard Room',
        checkIn: '',
        checkOut: '',
        guests: '1'
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 uppercase tracking-widest text-primary">Reservation</h1>
          <p className="text-lg italic opacity-80">Book your luxury experience at Grand Commodores.</p>
        </div>

        <div className="bg-white shadow-2xl p-8 md:p-12 border-t-8 border-primary">
          {message.text && (
            <div className={`mb-8 p-4 text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/60">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-b border-primary/30 p-3 focus:outline-none focus:border-primary transition-colors bg-secondary/5"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/60">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-primary/30 p-3 focus:outline-none focus:border-primary transition-colors bg-secondary/5"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/60">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border-b border-primary/30 p-3 focus:outline-none focus:border-primary transition-colors bg-secondary/5"
                placeholder="+234 ..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/60">Room Type</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full border-b border-primary/30 p-3 focus:outline-none focus:border-primary transition-colors bg-secondary/5"
              >
                <option>Standard Room</option>
                <option>Double Room</option>
                <option>Executive Suite</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/60">Check-In Date</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
                className="w-full border-b border-primary/30 p-3 focus:outline-none focus:border-primary transition-colors bg-secondary/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/60">Check-Out Date</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
                className="w-full border-b border-primary/30 p-3 focus:outline-none focus:border-primary transition-colors bg-secondary/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/60">Number of Guests</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full border-b border-primary/30 p-3 focus:outline-none focus:border-primary transition-colors bg-secondary/5"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
            <div className="md:col-span-2 pt-8 text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-16 py-5 hover:bg-foreground transition-all uppercase text-sm font-bold tracking-[0.3em] shadow-xl disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : 'Confirm Reservation'}
              </button>
              <p className="mt-6 text-xs text-foreground/50 italic font-sans tracking-wide">
                * You will receive a confirmation email within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

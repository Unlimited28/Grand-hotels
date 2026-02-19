'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-white fixed h-full z-10">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-xl font-serif font-bold text-primary tracking-widest uppercase">Admin</h2>
        </div>
        <nav className="mt-8 px-4 space-y-2">
          <Link href="/admin/dashboard" className="block p-4 hover:bg-primary/20 rounded transition-colors uppercase text-xs font-bold tracking-widest">Dashboard</Link>
          <Link href="/admin/dashboard/bookings" className="block p-4 hover:bg-primary/20 rounded transition-colors uppercase text-xs font-bold tracking-widest">Bookings</Link>
          <Link href="/admin/dashboard/rooms" className="block p-4 hover:bg-primary/20 rounded transition-colors uppercase text-xs font-bold tracking-widest">Rooms</Link>
          <Link href="/admin/dashboard/gallery" className="block p-4 hover:bg-primary/20 rounded transition-colors uppercase text-xs font-bold tracking-widest">Gallery</Link>
          <Link href="/admin/dashboard/reviews" className="block p-4 hover:bg-primary/20 rounded transition-colors uppercase text-xs font-bold tracking-widest">Reviews</Link>
          <Link href="/admin/dashboard/messages" className="block p-4 hover:bg-primary/20 rounded transition-colors uppercase text-xs font-bold tracking-widest">Messages</Link>
        </nav>
        <div className="absolute bottom-0 w-full p-8 border-t border-white/10">
          <button onClick={handleLogout} className="text-xs uppercase font-bold tracking-widest text-red-400 hover:text-red-300 transition-colors">Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12">
        {children}
      </main>
    </div>
  );
}

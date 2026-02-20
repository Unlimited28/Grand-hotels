import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminDashboardContent from '@/components/admin/AdminDashboardContent';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin');
  }

  // Fetch all data for the dashboard
  const [bookings, messages, reviews, rooms] = await Promise.all([
    prisma.booking.findMany({
        orderBy: { created_at: 'desc' },
        include: { room: true }
    }),
    prisma.message.findMany({ orderBy: { created_at: 'desc' } }),
    prisma.review.findMany({ orderBy: { created_at: 'desc' } }),
    prisma.room.findMany({ orderBy: { name: 'asc' } })
  ]);

  // Calculate Metrics
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED');
  const totalRevenue = confirmedBookings.reduce((acc, curr) => {
      // room price * days
      const start = new Date(curr.check_in);
      const end = new Date(curr.check_out);
      const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
      return acc + (days * (curr.room?.price || 0));
  }, 0);

  const now = new Date();
  const currentMonthBookings = confirmedBookings.filter(b =>
      isWithinInterval(new Date(b.created_at), { start: startOfMonth(now), end: endOfMonth(now) })
  );
  const monthlyRevenue = currentMonthBookings.reduce((acc, curr) => {
      const start = new Date(curr.check_in);
      const end = new Date(curr.check_out);
      const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
      return acc + (days * (curr.room?.price || 0));
  }, 0);

  const metrics = {
      totalBookings: bookings.length,
      confirmedBookings: confirmedBookings.length,
      pendingBookings: bookings.filter(b => b.status === 'PENDING').length,
      totalRevenue,
      monthlyRevenue,
      unreadMessages: messages.length, // Assuming all are unread for now
      pendingReviews: reviews.filter(r => !r.approved).length
  };

  return (
    <main className="min-h-screen pt-24 pb-12 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-serif text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-2 font-light">Welcome back, {session.user?.name || 'Administrator'}</p>
          </div>
          <div className="flex gap-4">
              <a href="/" className="text-xs uppercase tracking-widest text-primary hover:text-gold-700 transition-colors border-b border-primary">View Site</a>
          </div>
        </div>

        {/* Use a client component to handle tab switching and interactive actions */}
        <AdminDashboardContent
            bookings={JSON.parse(JSON.stringify(bookings))}
            messages={JSON.parse(JSON.stringify(messages))}
            reviews={JSON.parse(JSON.stringify(reviews))}
            rooms={JSON.parse(JSON.stringify(rooms))}
            metrics={metrics}
        />
      </div>
    </main>
  );
}

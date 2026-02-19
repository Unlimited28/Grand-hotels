export default function AdminDashboardHome() {
  const stats = [
    { label: 'Total Bookings', value: '12', icon: '📅' },
    { label: 'Available Rooms', value: '18', icon: '🛏️' },
    { label: 'New Messages', value: '5', icon: '✉️' },
    { label: 'Pending Reviews', value: '3', icon: '★' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-12 italic">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 shadow-sm border-t-4 border-primary">
            <div className="text-3xl mb-4">{stat.icon}</div>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">{stat.label}</p>
            <p className="text-4xl font-serif font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-10 shadow-sm">
        <h2 className="text-xl font-serif font-bold mb-8">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-xs font-bold uppercase tracking-widest text-foreground/40">
                <th className="py-4">Guest</th>
                <th className="py-4">Room</th>
                <th className="py-4">Dates</th>
                <th className="py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b">
                <td className="py-4">Adewale K.</td>
                <td className="py-4">Executive Suite</td>
                <td className="py-4">May 15 - May 18</td>
                <td className="py-4"><span className="text-green-600 bg-green-50 px-3 py-1 font-bold uppercase text-[10px]">Confirmed</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-4">Sarah B.</td>
                <td className="py-4">Standard Room</td>
                <td className="py-4">May 12 - May 14</td>
                <td className="py-4"><span className="text-yellow-600 bg-yellow-50 px-3 py-1 font-bold uppercase text-[10px]">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

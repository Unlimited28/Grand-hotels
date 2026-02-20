"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  User,
  ArrowLeft
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1A1A1A] text-white flex flex-col md:fixed h-auto md:h-full z-50">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="text-xl font-serif text-primary block">
            GRAND <br /> COMMODORES
          </Link>
          <p className="text-[10px] text-gray-400 mt-2 tracking-[0.3em] uppercase font-sans">Admin Panel</p>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/admin/dashboard"
                ? "bg-primary text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Site</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 text-gray-400 mb-2">
            <User size={20} />
            <span className="text-sm truncate">{session?.user?.name || "Admin"}</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate login
      if (username === 'admin' && password === 'GrandCom2026!') {
        localStorage.setItem('adminToken', 'mock-jwt-token');
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-2xl overflow-hidden border-t-8 border-primary">
        <div className="p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif font-bold text-primary mb-2 tracking-widest uppercase">Admin Portal</h1>
            <p className="text-xs text-foreground/50 uppercase tracking-[0.2em]">Grand Commodores Hotel & Suites</p>
          </div>

          {error && <div className="mb-6 p-4 bg-red-100 text-red-700 text-sm text-center">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full border-b border-primary/20 p-3 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b border-primary/20 p-3 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 uppercase text-xs font-bold tracking-widest hover:bg-foreground transition-all shadow-lg disabled:bg-gray-400"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-12 text-center">
            <a href="/" className="text-xs text-primary font-bold uppercase tracking-widest hover:underline">Back to Website</a>
          </div>
        </div>
      </div>
    </div>
  );
}

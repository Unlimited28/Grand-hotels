"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Image from "next/image";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="h-screen flex items-center justify-center bg-dark">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gold p-8 text-center text-white">
            <h1 className="text-3xl font-serif">Admin Portal</h1>
            <p className="mt-2 text-white/80">Grand Commodores Hotel</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <Input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-dark hover:bg-gold-dark text-white py-6"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>
          </div>
        </div>
        <p className="text-center mt-8 text-gray-500 text-sm">
          Protected Administrative Area
        </p>
      </div>
    </div>
  );
}

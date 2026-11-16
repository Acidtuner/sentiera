"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!supabaseAuth) {
      setError("Auth is not configured.");
      setLoading(false);
      return;
    }

    const { error } = await supabaseAuth.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="font-sans text-2xl font-bold text-slate-950 text-center">Sign in to Cortex</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-hairline rounded-sm px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-hairline rounded-sm px-3 py-2 text-sm"
          />
          {error && <p className="text-xs text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-tech-blue text-white font-mono text-xs uppercase tracking-wider py-2.5 rounded-sm hover:bg-tech-blue-600 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-center text-xs text-slate-500">
          No account? <Link href="/register" className="text-tech-blue hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { supabaseAuth } from "@/lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    if (!supabaseAuth) {
      setError("Auth is not configured.");
      setGoogleLoading(false);
      return;
    }
    const { error } = await supabaseAuth.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (!supabaseAuth) {
      setError("Auth is not configured.");
      setLoading(false);
      return;
    }

    if (mode === "login") {
      const { error } = await supabaseAuth.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else onSuccess();
    } else {
      const { error } = await supabaseAuth.auth.signUp({ email, password });
      if (error) setError(error.message);
      else {
        const { error: signInError } = await supabaseAuth.auth.signInWithPassword({ email, password });
        if (signInError) setError("Account created. Please confirm your email, then sign in.");
        else onSuccess();
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="font-sans text-xl font-bold text-slate-950">
            {mode === "login" ? "Sign in to Cortex" : "Create your account"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-2 border border-hairline bg-white py-2.5 rounded-sm text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? "Redirecting…" : "Continue with Google"}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-hairline" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">or</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
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
            minLength={6}
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
            {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          {mode === "login" ? (
            <>No account? <button type="button" onClick={() => setMode("register")} className="text-tech-blue hover:underline">Register</button></>
          ) : (
            <>Already have an account? <button type="button" onClick={() => setMode("login")} className="text-tech-blue hover:underline">Sign in</button></>
          )}
        </p>
      </div>
    </div>
  );
}

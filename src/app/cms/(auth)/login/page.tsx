"use client";

import React, { useState, useTransition } from "react";
import { login } from "@/actions/authActions";
import { Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      
      const result = await login(null, formData);
      if (result && result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden font-sans">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="relative w-full max-w-md p-8 sm:p-10 mx-4 bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800/80 shadow-2xl transition-all duration-300">
        
        {/* Title / Brand logo section */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
            <Lock className="h-6 w-6 text-zinc-950" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-serif">
            SUB SAHARA
          </h2>
          <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest">
            Image Management CMS
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-950/40 border border-red-800/80 text-red-200 text-sm flex items-start animate-shake">
            <span className="font-semibold mr-1">Error:</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <User className="h-4 w-4" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isPending}
                className="block w-full pl-10 pr-3 py-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm transition-colors duration-200 disabled:opacity-50"
                placeholder="Enter admin username"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                className="block w-full pl-10 pr-10 py-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm transition-colors duration-200 disabled:opacity-50"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isPending}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Verifying Credentials...
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-zinc-800/80 pt-6">
          <p className="text-zinc-500 text-xs">
            &copy; 2026 SUB SAHARA Fabric and Fashion. Timeless luxury.
          </p>
        </div>
      </div>
    </div>
  );
}

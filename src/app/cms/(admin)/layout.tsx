"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/authActions";
import { LogOut, Image as ImageIcon, Upload, Shield, Loader2 } from "lucide-react";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 pointer-events-none"></div>

      <header className="bg-zinc-900/80 border-b border-zinc-800/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/cms" className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center border border-amber-500/20 shadow-md">
              <Shield className="h-4.5 w-4.5 text-zinc-950" />
            </div>
            <div>
              <h1 className="text-md sm:text-lg font-bold tracking-wider font-serif text-white uppercase">
                SUB SAHARA
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                Admin Console
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-red-900/60 hover:bg-red-950/10 text-xs font-semibold text-zinc-400 hover:text-red-400 transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <LogOut className="h-3.5 w-3.5" />
            )}
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Welcome Header Card */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-white font-serif">Welcome back, Administrator</h2>
              <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                Use this console to upload new apparel images, copy public URLs, and manage your image catalog. All changes sync dynamically.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 translate-y-1/4 translate-x-1/4 pointer-events-none select-none">
              <Shield className="h-48 w-48 text-amber-500" />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 gap-2 max-w-md">
            <Link
              href="/cms/gallery"
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200
                ${pathname === "/cms/gallery" || pathname === "/cms"
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 shadow-md shadow-amber-500/10"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/40"}
              `}
            >
              <ImageIcon className="h-4 w-4" />
              Gallery Vault
            </Link>
            <Link
              href="/cms/upload"
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200
                ${pathname === "/cms/upload"
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 shadow-md shadow-amber-500/10"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/40"}
              `}
            >
              <Upload className="h-4 w-4" />
              Upload Center
            </Link>
          </div>

          {/* Render active subpage content */}
          <div className="transition-all duration-300">
            {children}
          </div>
        </div>
      </main>

      <footer className="bg-zinc-900/30 border-t border-zinc-900 py-6 mt-12 text-center text-xs text-zinc-500">
        <p>&copy; 2026 SUB SAHARA Fabric and Fashion LLC. Reserved admin space.</p>
      </footer>
    </div>
  );
}

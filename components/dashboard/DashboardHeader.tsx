"use client";

import { SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";

interface DashboardHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
    toast.success("Berhasil keluar dari akun");
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 shadow-lg border-b border-amber-200/50 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Mitra Servis Elektronik
              </h1>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-slate-900 dark:text-white hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <HomeIcon className="w-4 h-4" />
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-full border border-amber-200 dark:border-amber-700">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-7 h-7",
                    },
                  }}
                />
                <span className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  Halo, {user?.firstName || "Pengguna"}
                </span>
              </div>
            </div>

            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-amber-50 hover:border-amber-300 dark:hover:bg-amber-900/20 transition-colors"
              >
                <HomeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Beranda</span>
              </Button>
            </Link>

            <SignOutButton>
              <Button
                onClick={handleSignOut}
                disabled={isLoading}
                variant="destructive"
                size="sm"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors"
              >
                <LogOutIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Keluar</span>
              </Button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </header>
  );
};

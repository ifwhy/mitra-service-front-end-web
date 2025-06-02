"use client";

import { SignOutButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActivityIcon } from "lucide-react";
import toast from "react-hot-toast";
import { DashboardAuthModal } from "@/components/DashboardAuthModal";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useAuth();

  const handleSignOut = () => {
    setIsLoading(true);
    toast.success("Berhasil keluar dari akun");
  };

  return (
    <>
      {/* Modal Login untuk user yang belum login */}
      <DashboardAuthModal />

      {/* Konten Dashboard - hanya tampil jika user sudah login */}
      {isSignedIn && (
        <div className="h-screen w-full flex flex-col gap-2 items-center justify-center">
          <p>INI HALAMAN DASHBOARD</p>

          <Link href={"/"}>Kembali Ke Landing Page</Link>

          <div className="flex flex-col gap-2 items-center justify-center bg-blue-500 px-4 py-2 rounded-lg shadow-md">
            {/* Tombol SignOut dengan Loading State */}
            <SignOutButton redirectUrl="/">
              <Button
                className="border-none bg-transparent"
                onClick={handleSignOut}
              >
                {isLoading ? (
                  <ActivityIcon className="bg-white animate-spin" />
                ) : (
                  "Keluar"
                )}
              </Button>
            </SignOutButton>
          </div>
        </div>
      )}

      {/* Loading placeholder saat belum login */}
      {!isSignedIn && (
        <div className="h-screen w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;

"use client"; // Menandakan ini komponen client-side

import { SignOutButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ActivityIcon } from "lucide-react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      redirect("/");
    }
  }, [isSignedIn]);

  const handleSignOut = () => {
    setIsLoading(true);
    toast.success("Berhasil keluar dari akun");
  };

  return (
    <div className="h-screen w-full flex flex-col gap-2 items-center justify-center">
      <p>INI HALAMAN DASHBOARD</p>

      <Link href={"/"}>Kembali Ke Landing Page</Link>

      <div className="flex flex-col gap-2 items-center justify-center bg-blue-500 px-4 py-2 rounded-lg shadow-md">
        {/* Tombol SignOut dengan Loading State */}
        <SignOutButton redirectUrl="/" component="Halo">
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
  );
};

export default DashboardPage;

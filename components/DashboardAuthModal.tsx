"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TabAuth } from "./TabAuth";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function DashboardAuthModal() {
  const { isSignedIn, isLoaded } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Tunggu sampai auth state loaded
    if (!isLoaded) return;

    // Jika user belum login, tampilkan modal
    if (!isSignedIn) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isSignedIn, isLoaded]);

  const handleOpenChange = (open: boolean) => {
    // Jika user mencoba menutup modal tanpa login, redirect ke halaman utama
    if (!open && !isSignedIn) {
      router.push("/");
      return;
    }
    setIsOpen(open);
  };

  // Jangan render apa-apa jika auth belum loaded
  if (!isLoaded) {
    return null;
  }

  // Jika user sudah login, tidak perlu modal
  if (isSignedIn) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[425px] z-[1000] w-full flex items-center flex-col justify-center h-min"
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          router.push("/");
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
          router.push("/");
        }}
      >
        <DialogTitle className="text-center font-bold text-lg mb-4">
          Login Required
        </DialogTitle>
        <div className="text-center mb-4 text-sm text-gray-600 dark:text-gray-400">
          Anda harus login terlebih dahulu.
        </div>
        <TabAuth />
      </DialogContent>
    </Dialog>
  );
}

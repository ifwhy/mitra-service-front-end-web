"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TabAuth } from "./TabAuth";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export function AuthDialog({ title }: { title: string }) {
  const { isSignedIn, isLoaded } = useAuth();
  const previousSignedInRef = useRef<boolean | null>(null);

  // Track perubahan status login untuk menampilkan toast
  useEffect(() => {
    if (!isLoaded) return;

    // Jika user baru saja login (dari false ke true)
    if (previousSignedInRef.current === false && isSignedIn === true) {
      toast.success("Berhasil login! Selamat datang");
    }

    // Update ref dengan status saat ini
    previousSignedInRef.current = isSignedIn;
  }, [isSignedIn, isLoaded]);

  const handleAuth = () => {
    if (isSignedIn) {
      redirect("/dashboard");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="font-bold w-20 xs:w-24 sm:w-44 md:w-max text-sm xs:text-base md:text-lg bg-amber-500 hover:bg-amber-600 transition-all duration-500 ease-in-out text-white dark:bg-amber-500 dark:hover:bg-amber-600"
          onClick={handleAuth}
        >
          {isLoaded ? (isSignedIn ? "Dashboard" : title) : "Loading"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] z-[1000] w-full flex items-center flex-col justify-center h-min">
        <DialogTitle></DialogTitle>
        <TabAuth />
      </DialogContent>
    </Dialog>
  );
}

"use client";
import Image from "next/image";
import images from "@/constants/images";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <header className="lg:sticky lg:top-0">
        <TopBar />
        <Navbar />
      </header>

      <main className="w-full h-[87vh] md:h-full lg:h-[80%] flex flex-1 items-center justify-center flex-col gap-4 p-4">
        <Image
          src={images.notFound}
          alt="404 Page Not Found Robot"
          className="w-[65%] md:w-[30%] lg:w-2/6 object-cover"
        />

        <h2 className="text-2xl text-center font-bold capitalize">
          Halaman Tidak Ditemukan
        </h2>

        <Link href={"/"}>
          <Button className="hover:opacity-75 transition-all duration-300">
            Kembali ke Beranda
          </Button>
        </Link>
      </main>
    </>
  );
}

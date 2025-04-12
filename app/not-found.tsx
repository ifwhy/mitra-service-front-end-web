"use client";
import Image from "next/image";
import images from "@/constants/images";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full h-full lg:h-[80%] flex flex-1 items-center justify-center flex-col gap-4 p-4">
      <Image
        src={images.notFound}
        alt="404 Page Not Found Robot"
        className="w-2/6 object-cover"
      />

      <h2 className="text-2xl font-bold capitalize">Halaman Tidak Ditemukan</h2>

      <Link href={"/"}>
        <Button className="hover:opacity-75 transition-all duration-300">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}

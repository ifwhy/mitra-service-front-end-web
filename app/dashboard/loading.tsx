"use client";

import images from "@/constants/images";
import { LucideClipboardSignature } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Loading = () => {
  return (
    <main
      className="w-full h-screen dark:bg-black bg-white flex items-center justify-center flex-col gap-6 p-6"
      aria-busy="true"
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-1 group transition-all duration-300"
      >
        <Image
          src={images.mitraLogoCircle}
          alt="Logo Mitra Servis Elektronik"
          className="size-24 group-hover:scale-105 transition-transform"
        />
        <div className="flex flex-col">
          <p className="font-extrabold text-xl lg:text-2xl xl:text-3xl text-gray-900 dark:text-white leading-snug">
            Mitra Servis
          </p>
          <p className="font-extrabold text-xl lg:text-2xl xl:text-3xl text-gray-900 dark:text-white leading-snug">
            Elektronik
          </p>
        </div>
      </Link>

      {/* Loading Info */}
      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 animate-pulse duration-1000">
        <LucideClipboardSignature className="size-6" />
        <p className="text-base lg:text-lg font-semibold">
          Dashboard sedang dimuat...
        </p>
      </div>
    </main>
  );
};

export default Loading;

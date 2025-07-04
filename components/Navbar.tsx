"use client";

import images from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ModeToggle from "./ToggleMode";
import { ClassName } from "@/constants/types";
import { NavMenu } from "./NavMenu";
import { SidebarTrigger } from "./ui/sidebar";
import { AuthDialog } from "./AuthModal";

const Navbar = () => {
  return (
    <>
      <NavbarLarge className="lg:flex hidden md:px-5" />
      <NavbarMobile className="flex lg:hidden z-50" />
    </>
  );
};

const NavbarLarge = ({ className }: ClassName) => {
  return (
    <div
      className={`w-full h-24 flex items-center justify-center lg:gap-10 bg-slate-100 dark:bg-neutral-900 dark:text-white text-black ${className}`}
    >
      {/* Logo Mitra Servis Elektronik */}
      <Link href={"/"} className="flex flex-row items-center gap-1">
        <Image
          src={images.mitraLogoCircle}
          alt="Logo Mitra Sevis Elektronik"
          className="size-20"
        />

        <div>
          <p className="font-bold text-lg lg:text-xl">Mitra Servis</p>
          <p className="font-bold text-lg lg:text-xl">Elektronik</p>
        </div>
      </Link>

      {/* Menu */}
      <nav className="flex flex-row gap-5 items-center">
        <NavMenu />
        <ModeToggle />
      </nav>

      {/* Button Pesan Layanan */}
      <AuthDialog title="Servis" />
    </div>
  );
};

const NavbarMobile = ({ className }: ClassName) => {
  return (
    <div className={`w-full justify-around py-3 px-2 ${className}`}>
      <Link href={"/"} className="flex flex-row items-center gap-2">
        <Image
          src={images.mitraLogoCircle}
          alt="Logo Mitra Servis Elektronik"
          className="size-14"
        />

        <div className="flex flex-col font-medium text-medium">
          <p>Mitra Servis</p>
          <p>Elektronik</p>
        </div>
      </Link>

      <div className="flex flex-row items-center gap-2">
        {/* Button Pesan Layanan */}
        <AuthDialog title="Servis" />

        {/* Off Canvas Trigger */}
        <SidebarTrigger />
      </div>
    </div>
  );
};

export default Navbar;

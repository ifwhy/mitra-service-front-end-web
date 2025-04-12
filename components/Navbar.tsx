import images from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ModeToggle from "./ToggleMode";
import { RainbowButton } from "./magicui/rainbow-button";
import { ClassName } from "@/constants/types";
import { NavMenu } from "./NavMenu";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <>
      <NavbarLarge className="lg:flex hidden" />
      <NavbarMobile className="flex lg:hidden" />
    </>
  );
};

const NavbarLarge = ({ className }: ClassName) => {
  return (
    <div
      className={`w-full h-28  flex items-center justify-center gap-14 dark:bg-black dark:text-white bg-white text-black ${className}`}
    >
      {/* Logo Mitra Servis Elektronik */}
      <Link href={"/"} className="flex flex-row items-center gap-1">
        <Image
          src={images.mitraLogoCircle}
          alt="Logo Mitra Sevis Elektronik"
          className="size-24"
        />

        <div>
          <p className="font-bold text-3xl">Mitra Servis</p>
          <p className="font-bold text-3xl">Elektronik</p>
        </div>
      </Link>

      {/* Menu */}
      <nav className="flex flex-row gap-5 items-center">
        <NavMenu />
        <ModeToggle />
      </nav>

      <Link href={"/login"} className="ml-2">
        <RainbowButton className="font-bold">Pesan Layanan</RainbowButton>
      </Link>
    </div>
  );
};

const NavbarMobile = ({ className }: ClassName) => {
  return (
    <div className={`w-full justify-around py-3 ${className}`}>
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
        <Link href={"/login"} className="ml-2">
          <RainbowButton className="font-bold text-sm h-9 w-max">
            Pesan Layanan
          </RainbowButton>
        </Link>
        <SidebarTrigger />
      </div>
    </div>
  );
};

export default Navbar;

import images from "@/constants/images";
import Image from "next/image";
import React from "react";
import { AuthDialog } from "./AuthModal";
import TypingText from "./Typewriter";

const HomeSection = () => {
  return (
    <section
      id="beranda"
      className="w-full dark:bg-neutral-900 min-h-[85vh] flex flex-col lg:scroll-mt-[20rem]"
    >
      {/* hero */}
      <HeroSection />

    </section>
  );
};

export default HomeSection;

function HeroSection() {
  return (
    <div className="w-full h-[36rem] lg:h-[32rem] text-white justify-center items-center px-6 md:px-12 pt-6 bg-cover bg-center bg-blue-700 grid grid-cols-1 lg:grid-cols-[1fr_400px]">
      <div className="h-[80%] w-full lg:max-w-5xl flex flex-col gap-4 lg:gap-7">
        <h1 className="text-xl md:text-4xl lg:text-6xl font-extrabold tracking-wider">
          MITRA SERVIS ELEKTRONIK
        </h1>
        <p className="text-base md:text-lg lg:text-2xl font-medium">
          Mitra Terpercaya Menangani Kerusakan Elektronik
        </p>
        <TypingText />
        <div className="w-full sm:w-auto mt-6">
          <AuthDialog title="Servis" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={images.landing_mitra}
          alt="Service Picture"
          className="w-[65%] md:w-[30%] lg:w-full object-cover"
        />
      </div>
    </div>
  );
}

import images from "@/constants/images";
import Image from "next/image";
import React from "react";
import { AuthDialog } from "./AuthModal";
import TypingText from "./Typewriter";

const HomeSection = () => {
  return (
    <section
      id="beranda"
      className="w-full bg-slate-100 dark:bg-neutral-900 min-h-[85vh] flex flex-col"
    >
      {/* hero */}
      <HeroSection />

      {/* kartu mengambang */}
      {/* <div className="w-[90%] md:w-[80%] mx-auto -mt-[5.5rem] rounded-3xl shadow-gray-300 bg-cyan-50 overflow-hidden flex flex-col shadow-lg dark:shadow-md">
        <div className="flex flex-wrap justify-center md:justify-between text-blue-700 bg-sky-400/50 p-4">
          {superiorities.map((item, idx) => (
            <div
              key={idx}
              className={`flex-col items-center justify-between gap-3 basis-1/2 md:basis-1/3 lg:basis-1/5 py-4 ${
                idx === 2
                  ? "hidden md:flex"
                  : "flex text-5xl md:text-6xl lg:text-7xl"
              }`}
            >
              {item.icon}
              <p className="font-medium text-base text-center">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 px-6 py-10 mx-1.5 w-full">
          <div className="text-blue-900 text-center lg:text-left">
            <h1 className="font-medium text-lg">
              Perangkat Elektronik Anda Rusak? Bawa Aja Ke Mitra Servis
              Elektronik
            </h1>
            <h1 className="text-base font-semibold mt-1">
              Kami Telah Melayani Pelanggan Lebih dari 10 Tahun
            </h1>
          </div>
          <div className="w-full sm:w-auto flex justify-center">
            <AuthDialog title="Pesan Layanan" />
          </div>
        </div>
      </div> */}
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

import { superiorities } from "@/constants/constants";
import images from "@/constants/images";
import Link from "next/link";
import React from "react";

const HomeSection = () => {
  return (
    <section id="beranda" className="w-full min-h-[85vh] flex flex-col">
      {/* hero */}
      <HeroSection />

      {/* kartu mengambang */}
      <div className="w-[90%] md:w-[80%] mx-auto -mt-[5.5rem] rounded-3xl shadow-gray-300 bg-cyan-50 overflow-hidden flex flex-col shadow-lg dark:shadow-md">
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

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 px-6 py-10">
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
            <Link
              href={"/"}
              className="bg-amber-500 text-white h-12 font-semibold rounded-lg px-6 flex justify-center items-center hover:bg-amber-600 duration-300"
            >
              Perbaiki Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;

function HeroSection() {
  return (
    <div
      className="w-full h-[32rem] text-white flex flex-col justify-start px-6 md:px-12 pt-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${images.home_bg.src})`,
      }}
    >
      <div className="h-[80%] max-w-xl">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-wider">
          MITRA SERVIS ELEKTRONIK
        </h1>
        <p className="text-base md:text-lg lg:text-2xl font-medium mt-2">
          Mitra Terpercaya Menangani Kerusakan Elektronik
        </p>
      </div>
    </div>
  );
}

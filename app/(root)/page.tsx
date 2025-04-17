import Link from "next/link";
import Spline from '@splinetool/react-spline/next';
import Image from "next/image";
import images from "@/constants/images";
import { Star } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { UserRoundCheck } from "lucide-react";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="w-full h-screen flex flex-col gap-3 bg-slate-100 dark:bg-black">
      {/* Bagian Beranda */}
      <section id="beranda" className="w-full h-[85vh] grid grid-rows-[16rem_1fr]">
        {/* hero */}
        <div className="w-full h-full text-white flex flex-col justify-start px-12 pt-8 bg-cover bg-center relative" style={{
        backgroundImage: `url(${images.home_bg.src})`, }}>
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="h-[80%] relative">
            <h1 className="text-4xl font-extrabold tracking-wider">MITRA SERVIS ELEKTRONIK</h1>
            <p className="text-lg font-medium mt-2">Mitra Terpercaya Menangani Kerusakan Elektronik</p>
          </div>
        </div>
        {/* kartu mengambang */}
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-[80%] h-[18rem] z-10 -mt-[14rem] grid grid-rows-[8rem_10rem] overflow-hidden rounded-lg shadow-md shadow-gray-300 bg-cyan-50">
            <div className="grid grid-cols-5 text-blue-700 bg-sky-400/50">
              <div className="p-4 flex flex-col gap-3 justify-between items-center">
                <h1 className="font-extrabold text-6xl"><Star color="currentColor" fill="currentColor" size={60} /></h1>
                <p className="font-medium text-sm">4.8 Kepuasan Pelanggan</p>
              </div>
              <div className="p-4 flex flex-col gap-3 justify-between items-center">
                <h1 className="font-extrabold text-6xl">5k+</h1>
                <p className="font-medium text-sm">Perbaikan Perangkat</p>
              </div>
              <div className="p-4 flex flex-col gap-3 justify-between items-center">
                <h1 className="font-extrabold text-6xl"><UserRoundCheck color="currentColor" size={60} /></h1>
                <p className="font-medium text-sm">Teknisi Kompeten</p>
              </div>
              <div className="p-4 flex flex-col gap-3 justify-between items-center">
                <h1 className="font-extrabold text-6xl">15+</h1>
                <p className="font-medium text-sm">Jenis Perbaikan</p>
              </div>
              <div className="p-4 flex flex-col gap-3 justify-between items-center">
                <h1 className="font-extrabold text-6xl"><ShieldCheck color="currentColor" size={60} /></h1>
                <p className="font-medium text-sm">Garansi Perbaikan</p>
              </div>
            </div>
            <div className="grid grid-cols-[44rem_1fr] p-6">
                <div className="text-blue-900">
                  <h1 className="text-base">Perangkat Elektronik Anda Rusak? Bawa Aja Ke Mitra Servis Elektronik</h1>
                  <h1 className="font-medium text-lg">Telah Melayani Pelanggan Lebih Dari 10 Tahun</h1>
                </div>
                <div className="w-full flex justify-center">
                  <Link href={""} className="bg-amber-500 text-white h-12 font-semibold rounded-lg flex justify-center items-center w-[80%] hover:w-full hover:bg-amber-600 transform duration-300">Perbaiki Sekarang</Link>
                </div>
            </div>
          </div> 
        </div>
      </section>
    </div>
  );
}

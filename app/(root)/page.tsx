import Link from "next/link";
import Spline from '@splinetool/react-spline/next';
import Image from "next/image";
import images from "@/constants/images";
import { Star } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { UserRoundCheck } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Wrench } from "lucide-react";
import { Tv } from "lucide-react";
import { BoomBox } from "lucide-react";
import { Refrigerator } from "lucide-react";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="w-full h-full flex flex-col gap-3 bg-slate-100 dark:bg-black">
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
            <div className="grid grid-cols-[1fr_20rem] p-6">
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

      {/* Bagian Mitra Servis */}
      <section id="mitra-servis" className="w-full h-full bg-neutral-950 py-4">
        {/* Mitra Servis */}
        <div className="bg-neutral-950 grid grid-rows-[180px_1fr]">
          {/* judul */}
          <div className="w-full h-full flex flex-col items-center p-2">
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-[2px] w-16 bg-cyan-400" />
              <h2 className="text-cyan-400 text-lg font-semibold tracking-widest">MITRA SERVIS ELEKTRONIIK</h2>
              <div className="h-[2px] w-16 bg-cyan-400" />
            </div>
            <h1 className="font-semibold text-2xl w-[850px] text-center tracking-wider text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam rerum totam</h1>
          </div>
          {/* card */}
          <div className="grid grid-cols-2 justify-items-center w-full h-full p-8">
            {/* Why Choose Us */}
            <div className="bg-slate-700/50 w-[450px] h-[150px] grid grid-cols-[100px_1fr] justify-center items-center rounded-lg hover:-translate-y-2 transform duration-700 relative overflow-hidden group text-white">
              <div className="absolute inset-0 bg-sky-500 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-in-out z-0" />
              <div className="flex justify-center items-center z-10">
                <CircleHelp color="currentColor" size={64}/>
              </div>
              <div className="flex flex-col gap-1 p-3 z-10">
                <Link href={""} className="font-bold text-lg tracking-wider">Mengapa Memilih Kami?</Link>
                <p className="tracking-wide">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, itaque.</p>
              </div>
            </div>
            {/* Our Team */}
            <div className="bg-slate-700/50 w-[450px] h-[150px] grid grid-cols-[100px_1fr] justify-center items-center rounded-lg hover:-translate-y-2 transform duration-700 relative overflow-hidden group text-white">
              <div className="absolute inset-0 bg-sky-500 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-in-out z-0" />
              <div className="flex justify-center items-center z-10">
                <Wrench color="currentColor" size={64}/>
              </div>
              <div className="flex flex-col gap-1 p-3 z-10">
                <Link href={""} className="font-bold text-lg tracking-wider">Tim Kami</Link>
                <p className="tracking-wide">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, itaque.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Apa yg dapat diperbaiki */}
        <div className="grid grid-rows-[80px_1fr] mt-8">
          {/* judul */}
          <div className="w-full h-full flex flex-col items-center p-2">
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-[2px] w-16 bg-cyan-400" />
              <h2 className="text-cyan-400 text-lg font-semibold tracking-widest">APA SAJA YANG DAPAT KAMI PERBAIKI?</h2>
              <div className="h-[2px] w-16 bg-cyan-400" />
            </div>
          </div>
          {/* Daftar Jenis Perbaikan */}
          <div className="grid grid-cols-6 w-full h-full justify-center items-center px-12 py-8 gap-12">
            <div className="relative bg-slate-700/50 w-full h-[180px] rounded-lg flex flex-col justify-evenly items-center gap-1 hover:-translate-y-2 transform duration-300 group overflow-hidden text-cyan-400">
              <Tv color="currentColor" size={88} />
              <div className="h-[2px] w-24 bg-cyan-400" />
              <h1 className="font-medium tracking-wide">Television</h1>
              <Link href={""} className="absolute bottom-0 bg-sky-500 text-white font-medium transition-all duration-500 translate-y-full group-hover:-translate-y-0 z-20 w-full text-center h-[32px]">Order</Link>
            </div>
            <div className="relative bg-slate-700/50 w-full h-[180px] rounded-lg flex flex-col justify-evenly items-center gap-1 hover:-translate-y-2 transform duration-300 group overflow-hidden text-cyan-400">
              <BoomBox color="currentColor" size={88} />
              <div className="h-[2px] w-24 bg-cyan-400" />
              <h1 className="font-medium tracking-wide">Radio</h1>
              <Link href={""} className="absolute bottom-0 bg-sky-500 text-white font-medium transition-all duration-500 translate-y-full group-hover:-translate-y-0 z-20 w-full text-center h-[32px]">Order</Link>
            </div>
            <div className="relative bg-slate-700/50 w-full h-[180px] rounded-lg flex flex-col justify-evenly items-center gap-1 hover:-translate-y-2 transform duration-300 group overflow-hidden text-cyan-400">
              <Refrigerator color="currentColor" size={88} />
              <div className="h-[2px] w-24 bg-cyan-400" />
              <h1 className="font-medium tracking-wide">Kulkas</h1>
              <Link href={""} className="absolute bottom-0 bg-sky-500 text-white font-medium transition-all duration-500 translate-y-full group-hover:-translate-y-0 z-20 w-full text-center h-[32px]">Order</Link>
            </div>
            <div className="relative bg-slate-700/50 w-full h-[180px] rounded-lg flex flex-col justify-evenly items-center gap-1 hover:-translate-y-2 transform duration-300 group overflow-hidden text-cyan-400">
              <Tv color="currentColor" size={88} />
              <div className="h-[2px] w-24 bg-cyan-400" />
              <h1 className="font-medium tracking-wide">Mesin Cuci</h1>
              <Link href={""} className="absolute bottom-0 bg-sky-500 text-white font-medium transition-all duration-500 translate-y-full group-hover:-translate-y-0 z-20 w-full text-center h-[32px]">Order</Link>
            </div>
            <div className="relative bg-slate-700/50 w-full h-[180px] rounded-lg flex flex-col justify-evenly items-center gap-1 hover:-translate-y-2 transform duration-300 group overflow-hidden text-cyan-400">
              <Tv color="currentColor" size={88} />
              <div className="h-[2px] w-24 bg-cyan-400" />
              <h1 className="font-medium tracking-wide">Kipas Angin</h1>
              <Link href={""} className="absolute bottom-0 bg-sky-500 text-white font-medium transition-all duration-500 translate-y-full group-hover:-translate-y-0 z-20 w-full text-center h-[32px]">Order</Link>
            </div>
            <div className="relative bg-slate-700/50 w-full h-[180px] rounded-lg flex flex-col justify-evenly items-center gap-1 hover:-translate-y-2 transform duration-300 group overflow-hidden text-cyan-400">
              <Tv color="currentColor" size={88} />
              <div className="h-[2px] w-24 bg-cyan-400" />
              <h1 className="font-medium tracking-wide">Blender</h1>
              <Link href={""} className="absolute bottom-0 bg-sky-500 text-white font-medium transition-all duration-500 translate-y-full group-hover:-translate-y-0 z-20 w-full text-center h-[32px]">Order</Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

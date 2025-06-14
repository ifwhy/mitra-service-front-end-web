"use client";

import { StarIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const reviewData = [
  {
    id: 1,
    review:
      "Teknisinya sangat sat set, hasil penegerjaan juga rapi, perangkat kembali dalam keadaan bersih. Good banget lah pelayanan perbaikannya. Kalian harus servis disini",
    user: "Widodo",
    rating: 4.7,
  },
  {
    id: 2,
    review: "Perangkat kembali normal, tampilan bersih seperti baru. Bintang 5.",
    user: "Prabowo",
    rating: 4.9,
  },
  {
    id: 3,
    review: "Pelayanan cepat, CS ramah, dan prosesnya transparan. Mantap!",
    user: "Ganjar",
    rating: 4.6,
  },
  {
    id: 4,
    review: "Tempat terpercaya buat perbaikan perangkat elektronik.",
    user: "Megawati",
    rating: 4.8,
  },
  {
    id: 5,
    review: "Mantap pelayanannya. Cepat dan terpercaya!",
    user: "Jokowi",
    rating: 4.5,
  },
];

const Ulasan = () => {
  return (
    <section id="ulasan" className="bg-slate-300 dark:bg-neutral-900 py-[3rem] lg:py-[5rem] lg:scroll-mt-[10rem]">
      <div className="px-12 mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-[2px] w-6 lg:w-10 bg-blue-700 dark:bg-cyan-400" />
            <h2 className="text-blue-700 dark:text-cyan-400 text-base lg:text-lg font-bold tracking-widest text-center">
              ULASAN
            </h2>
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold tracking-wider text-black dark:text-white w-full">Apa Kata Mereka?</h2>
        </div>
      </div>

      <Carousel className="flex justify-center items-center w-[65%] lg:w-[90%] mx-auto mt-[18px] lg:mt-[24px]">
        <CarouselPrevious />
        <CarouselContent>
          {reviewData.map((reviewData, i) => (
            <CarouselItem key={reviewData.id} className="basis-full lg:basis-1/4">
              <div className="p-6 bg-gray-100 dark:bg-gradient-to-b dark:from-cyan-400/60 dark:to-slate-900 dark:bg-slate-900 rounded-xl shadow space-y-2 flex flex-col justify-between h-[200px] hover:shadow-md hover:shadow-amber-500/50 dark:hover:shadow-cyan-400 hover:-translate-y-2 transition duration-500 my-[16px]">
                <p className="text-sm text-gray-600 dark:text-white h-[150px] overflow-auto">{reviewData.review}</p>
                <div className="flex items-center justify-between gap-1">
                  <h2 className="text-base font-semibold dark:text-amber-400">{reviewData.user}</h2>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {reviewData.rating}
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </section>
  );
};


export default Ulasan;

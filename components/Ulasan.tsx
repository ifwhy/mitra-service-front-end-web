"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const reviewData = [
  {
    review:
      "Teknisinya sangat sat set, hasil penegerjaan juga rapi, perangkat kembali dalam keadaan bersih. Good banget lah pelayanan perbaikannya. Kalian harus servis disini",
    user: "Widodo Etan Tanggul",
  },
  {
    review: "Perangkat kembali normal, tampilan bersih seperti baru. Bintang 5.",
    user: "Prabowo Lor Kali",
  },
  {
    review: "Pelayanan cepat, CS ramah, dan prosesnya transparan. Mantap!",
    user: "Ganjar Ngarep Sungai",
  },
  {
    review: "Tempat terpercaya buat perbaikan perangkat elektronik.",
    user: "Megawati Tengah Kota",
  },
  {
    review: "Mantap pelayanannya. Cepat dan terpercaya!",
    user: "Jokowi Tengah Laut",
  },
];

const CARD_WIDTH = 600; // px
const GAP = 16; // Tailwind gap-4 = 1rem = 16px
const CARD_TOTAL = CARD_WIDTH + GAP;

const Ulasan = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const updateMaxTranslate = () => {
    const wrapper = wrapperRef.current;
    const carousel = carouselRef.current;
    if (!wrapper || !carousel) return;

    const visibleWidth = wrapper.offsetWidth;
    const totalWidth = carousel.scrollWidth;

    const max = totalWidth - visibleWidth + 48;
    setMaxTranslate(max > 0 ? max : 0);
  };

  const handleNext = () => {
    const wrapper = wrapperRef.current;
    const carousel = carouselRef.current;
    if (!wrapper || !carousel) return;

    const visibleWidth = wrapper.offsetWidth;
    const remaining = maxTranslate - translateX;

    // Geser sebanyak mungkin hingga 2 card, atau sisa yang ada
    const shift = Math.min(2 * CARD_TOTAL, remaining);
    setTranslateX((prev) => prev + shift);
  };

  const handlePrev = () => {
    const shift = Math.min(2 * CARD_TOTAL, translateX);
    setTranslateX((prev) => prev - shift);
  };

  useLayoutEffect(() => {
    updateMaxTranslate();

    const handleResize = () => {
      updateMaxTranslate();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const disableLeft = translateX <= 0;
  const disableRight = translateX >= maxTranslate - 1; // toleransi pixel

  return (
    <section id="Ulasan" className="bg-slate-300 py-8">
      <div className="grid grid-cols-2 px-12 mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-[2px] w-10 bg-blue-700 dark:bg-cyan-400" />
            <h2 className="text-blue-700 dark:text-cyan-400 text-lg font-bold tracking-widest text-center">
              ULASAN
            </h2>
          </div>
          <h2 className="text-4xl font-bold tracking-wider">Apa Kata Mereka?</h2>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <button
            onClick={handlePrev}
            disabled={disableLeft}
            className={`bg-slate-200 rounded-full h-[2rem] w-[2rem] flex justify-center items-center ${
              disableLeft ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            disabled={disableRight}
            className={`bg-slate-200 rounded-full h-[2rem] w-[2rem] flex justify-center items-center ${
              disableRight ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div ref={wrapperRef} className="overflow-hidden px-8 py-4">
        <div
          ref={carouselRef}
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {reviewData.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[600px]">
              <CardReview
                icon={<Quote color="currentColor" size={40} fill="currentColor" />}
                review={item.review}
                user={item.user}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CardReview = ({
  icon,
  review,
  user,
}: {
  icon: React.ReactNode;
  review: string;
  user: string;
}) => (
  <div className="bg-white dark:bg-slate-700/50 h-[230px] w-full flex flex-col gap-4 justify-start items-start transform duration-700 p-4 shadow-md shadow-slate-400 hover:border-blue-500 border hover:-translate-y-2 mx-auto rounded-md overflow-hidden">
    <div className="flex justify-center items-center z-10 text-amber-500 px-3">
      {icon}
    </div>
    <div className="flex flex-col gap-2 px-3 py-2 z-1">
      <h2 className="font-light tracking-wide overflow-y-auto h-[100px]">
        {review}
      </h2>
      <p className="font-bold tracking-wide text-sm">{user}</p>
    </div>
  </div>
);

export default Ulasan;

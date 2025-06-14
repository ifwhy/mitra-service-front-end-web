import React from "react";
import MarqueeElektronik from "./MarqueeElektronik";

const KamiPerbaiki = () => {
  return (
    <section className="p-8 lg:scroll-mt-[10rem]" id="perbaiki">
      {/* Apa yg dapat diperbaiki */}
      <div className="flex flex-col items-center">
        {/* judul */}
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="h-[2px] w-8 lg:w-16 bg-blue-700 dark:bg-cyan-400" />
          <h2 className="text-blue-700 dark:text-cyan-400 text-base lg:text-lg font-bold tracking-widest text-center">
            APA SAJA YANG DAPAT KAMI PERBAIKI?
          </h2>
          <div className="h-[2px] w-8 lg:w-16 bg-blue-700 dark:bg-cyan-400" />
        </div>
      </div>

      {/* daftar jenis perbaikan */}
      <MarqueeElektronik />
    </section>
  );
};

export default KamiPerbaiki;

import React from "react";
import MarqueeElektronik from "./MarqueeElektronik";

const KamiPerbaiki = () => {
  return (
    <section className="py-8">
      {/* Apa yg dapat diperbaiki */}
      <div className="flex flex-col items-center">
        {/* judul */}
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="h-[2px] w-16 bg-cyan-400" />
          <h2 className="text-cyan-400 text-lg font-bold tracking-widest text-center">
            APA SAJA YANG DAPAT KAMI PERBAIKI?
          </h2>
          <div className="h-[2px] w-16 bg-cyan-400" />
        </div>
      </div>

      {/* daftar jenis perbaikan */}
      <MarqueeElektronik />
    </section>
  );
};

export default KamiPerbaiki;

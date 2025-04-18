import React from "react";
import { Marquee } from "./magicui/marquee";
import { repairItems } from "@/constants/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RepairItemProps } from "@/constants/types";

const MarqueeElektronik = () => {
  return (
    <div className="mx-auto relative flex w-[85%] md:w-full max-w-4xl flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {repairItems.map((repairItem, idx) => (
          <RepairItem
            key={idx}
            icon={repairItem.icon}
            label={repairItem.label}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r hidden dark:flex from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 hidden dark:flex bg-gradient-to-l from-background"></div>
    </div>
  );
};

export default MarqueeElektronik;

const RepairItem = ({ icon, label }: RepairItemProps) => {
  return (
    <div
      className={cn(
        "relative w-44 h-44 rounded-2xl bg-slate-800 dark:bg-gradient-to-br dark:from-slate-700/50 dark:to-slate-800/60",
        "flex flex-col items-center justify-center gap-2",
        "text-cyan-400 shadow-lg transition-all duration-300 ease-in-out",
        "group overflow-hidden"
      )}
    >
      <div className="text-cyan-300">{icon}</div>
      <div className="w-16 h-[2px] bg-cyan-400" />
      <h1 className="font-semibold tracking-wide text-sm text-center">
        {label}
      </h1>

      {/* Slide-up order button */}
      <Link
        href=""
        className={cn(
          "absolute bottom-0 w-full h-8 text-sm text-center font-medium",
          "bg-sky-500 text-white transition-transform duration-500",
          "translate-y-full group-hover:translate-y-0"
        )}
      >
        Order
      </Link>
    </div>
  );
};

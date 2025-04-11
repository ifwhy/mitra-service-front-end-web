import { topBarIcons } from "@/constants/constants";
import { ClassName, TopBarIconType } from "@/constants/types";
import Link from "next/link";
import React from "react";

const TopBar = ({ className }: ClassName) => {
  return (
    <section
      className={`${className} w-full bg-black h-14 flex items-center justify-around`}
    >
      <p className="font-bold ml-5 text-white">
        Selamat Datang di Mitra Servis Elektronik
      </p>

      <div className="flex flex-row items-center gap-2">
        <p className="text-white font-base font-medium">Media Sosial Kami</p>

        {topBarIcons.map((topBarIcon) => (
          <TopBarIcon
            key={topBarIcon.id}
            href={topBarIcon.href}
            Icon={<topBarIcon.Icon className="text-black size-4" />}
          />
        ))}
      </div>
    </section>
  );
};

const TopBarIcon = ({ href, Icon }: TopBarIconType) => {
  return (
    <Link href={href} target="_blank">
      <div className="rounded-full bg-white p-2 hover:opacity-65 transition-all duration-300">
        {Icon}
      </div>
    </Link>
  );
};

export default TopBar;

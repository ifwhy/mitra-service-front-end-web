"use client";

import { topBarIcons } from "@/constants/constants";
import { ClassName, TopBarIconType } from "@/constants/types";
import Link from "next/link";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const TopBar = ({ className }: ClassName) => {
  const [isRemoveTopBar, setIsRemoveTopBar] = useState<boolean | null>(null);

  useEffect(() => {
    const isRemoved = sessionStorage.getItem("topBarRemoved");
    if (isRemoved === "true") {
      setIsRemoveTopBar(true);
    }
  }, []);

  const handleRemoveTopBar = () => {
    sessionStorage.setItem("topBarRemoved", "true");
    setIsRemoveTopBar(true);
  };

  return (
    <section
      className={`w-full bg-black h-14 items-center justify-around ${
        isRemoveTopBar ? "hidden" : "hidden md:flex"
      } ${className}`}
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

        <Button
          className="w-min bg-transparent hover:bg-black hover:opacity-75 transition-all duration-200"
          onClick={handleRemoveTopBar}
        >
          <X size={32} color="#FFFFFF" />
        </Button>
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

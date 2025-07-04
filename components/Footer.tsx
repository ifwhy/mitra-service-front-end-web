import React from "react";
import { FiTwitter, FiFacebook, FiInstagram, FiGithub } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import images from "@/constants/images";

const Footer = () => {
  const iconStyles =
    "flex items-center justify-center text-black dark:text-white transition-all duration-200 bg-transparent border border-gray-700 rounded-full w-7 h-7 focus:bg-blue-600 hover:bg-blue-600 hover:border-blue-600 focus:border-blue-600";

  const linkClasses =
    "text-base text-black dark:text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80 cursor-pointer";

  return (
    <footer className="py-10 bg-slate-100 dark:bg-neutral-900 text-black sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-12">
          {/* Company */}
          <div>
            <p className="text-base text-gray-500">Perusahaan</p>
            <ul className="mt-8 space-y-4">
              {[
                { href: "", text: "Tentang Kami" },
                { href: "", text: "Layanan" },
                { href: "", text: "Ulasan" },
                { href: "", text: "Karir" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:underline">
                    <span className={linkClasses}>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-base text-gray-500">Bantuan</p>
            <ul className="mt-8 space-y-4">
              {[
                { href: "", text: "Hubungi Dukungan" },
                { href: "", text: "Status Servis" },
                { href: "", text: "Ketentuan & Layanan" },
                { href: "", text: "Kebijakan Polisi" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:underline">
                    <span className={linkClasses}>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-base text-gray-500">Panduan & Tips</p>
            <ul className="mt-8 space-y-4">
              {[
                { href: "", text: "Tips Merawat Elektronik" },
                { href: "", text: "Tutorial & Artikel" },
                { href: "", text: "FAQ" },
                { href: "", text: "Video Perbaikan" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:underline">
                    <span className={linkClasses}>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Extra Links */}
          <div>
            <p className="text-base text-gray-500">Lainnya</p>
            <ul className="mt-8 space-y-4">
              {[
                { href: "", text: "Customer Support" },
                { href: "", text: "Layanan Jemput" },
                { href: "", text: "Lokasi" },
                { href: "", text: "Jam Operasional" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="hover:underline">
                    <span className={linkClasses}>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-800" />

        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-between sm:flex-nowrap">
          <Link
            href={"/"}
            className="flex text-black dark:text-white flex-row items-center gap-1"
          >
            <Image
              src={images.mitraLogoCircle}
              alt="Logo Mitra Sevis Elektronik"
              className="size-20"
            />

            <div>
              <p className="font-bold text-lg lg:text-xl">Mitra Servis</p>
              <p className="font-bold text-lg lg:text-xl">Elektronik</p>
            </div>
          </Link>

          <ul className="flex items-center space-x-3 md:order-3">
            {[
              {
                icon: <FiTwitter className="w-4 h-4" />,
                href: "https://twitter.com",
              },
              {
                icon: <FiFacebook className="w-4 h-4" />,
                href: "https://facebook.com",
              },
              {
                icon: <FiInstagram className="w-4 h-4" />,
                href: "https://instagram.com",
              },
              {
                icon: <FiGithub className="w-4 h-4" />,
                href: "https://github.com",
              },
            ].map((item, index) => (
              <li key={index}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <div className={iconStyles}>{item.icon}</div>
                </a>
              </li>
            ))}
          </ul>

          <p className="w-full mt-8 text-base font-semibold text-center text-black dark:text-white md:mt-0 md:w-auto md:order-2">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by Mitra
            Servis Elektronik
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

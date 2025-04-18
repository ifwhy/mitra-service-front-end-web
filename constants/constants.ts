import { FaBlender, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { RepairItemProps, SuperiorityItem, TopBarIconReactIcon } from "./types";
import { IconType } from "react-icons";
import { Star, Fan } from "lucide-react";
import React from "react";
import { PiTelevisionBold } from "react-icons/pi";
import { ShieldCheck } from "lucide-react";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { UserRoundCheck } from "lucide-react";
import { GiWashingMachine } from "react-icons/gi";
import { FaRadio } from "react-icons/fa6";
import { PiPrinterFill } from "react-icons/pi";
import { TbAirConditioningDisabled } from "react-icons/tb";

export const topBarIcons: TopBarIconReactIcon[] = [
  {
    id: "InstagramLogo",
    href: "#",
    Icon: FaInstagram,
  },
  {
    id: "TwitterLogo",
    href: "#",
    Icon: FaTwitter,
  },
  {
    id: "FacebookLogo",
    href: "#",
    Icon: FaFacebook,
  },
];

export const authors = [
  {
    name: "Dunhill William Putra",
    nim: "L0123045",
  },
  {
    name: "Fathoni Nur Habibi",
    nim: "L0123054",
  },
  {
    name: "Ivan Wahyu Nugroho",
    nim: "L0123068",
  },
];

export const serviceComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Solusi Kami",
    href: "/layanan/solusi-kami",
    description:
      "Kami menyediakan solusi layanan terpadu untuk berbagai kebutuhan servis elektronik Anda, dari rumah ke rumah.",
  },
  {
    title: "Pengambilan Perangkat",
    href: "/layanan/pengambilan-perangkat",
    description:
      "Layanan penjadwalan pengambilan perangkat elektronik yang rusak langsung dari lokasi pelanggan.",
  },
  {
    title: "Pemeriksaan dan Diagnosis",
    href: "/layanan/pemeriksaan",
    description:
      "Teknisi kami akan menganalisis kondisi perangkat untuk mengidentifikasi kerusakan dan memberikan estimasi biaya.",
  },
  {
    title: "Servis dan Perbaikan",
    href: "/layanan/servis-perbaikan",
    description:
      "Perangkat Anda akan diperbaiki oleh teknisi berpengalaman menggunakan suku cadang terbaik dan bergaransi.",
  },
  {
    title: "Pengembalian Perangkat",
    href: "/layanan/pengembalian-perangkat",
    description:
      "Setelah proses servis selesai, perangkat akan dikirim kembali ke alamat Anda dengan aman dan cepat.",
  },
  {
    title: "FAQ - Pertanyaan Umum",
    href: "#FAQs",
    description:
      "Temukan jawaban atas pertanyaan yang sering ditanyakan seputar layanan kami dan proses servis.",
  },
];

export const mitraServisComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Mengapa Memilih Kami?",
    href: "#why-choose-us",
    description:
      "Kami hadir untuk memberikan solusi terbaik untuk kebutuhan servis elektronik Anda.",
  },
  {
    title: "Tim Kami",
    href: "tim-kami",
    description:
      "Kami memiliki tim teknisi profesional untuk menangani berbagai perangkat elektronik.",
  },
  {
    title: "Apa Saja yang Dapat Kami Perbaiki?",
    href: "#what-we-can-repair",
    description:
      "Lihat perangkat elektronik apa saja yang dapat kami perbaiki.",
  },
];

export const socialMediaItems: {
  href: string;
  username: string;
  icon: IconType;
}[] = [
  {
    href: "#",
    username: "mitra.servis",
    icon: FaInstagram,
  },
  {
    href: "#",
    username: "mitra.servis",
    icon: FaTwitter,
  },
  {
    href: "#",
    username: "mitra.servis",
    icon: FaFacebook,
  },
];

export const superiorities: SuperiorityItem[] = [
  {
    icon: React.createElement(Star, {
      color: "currentColor",
      className: "size-12",
      size: 60,
    }),
    text: "4.8 Kepuasan Pelanggan",
  },
  {
    icon: React.createElement(
      "h1",
      { className: "font-medium text-6xl" },
      "5k+"
    ),
    text: "Perbaikan Perangkat",
  },
  {
    icon: React.createElement(UserRoundCheck, {
      color: "currentColor",
      size: 60,
    }),
    text: "Teknisi Kompeten",
  },
  {
    icon: React.createElement(
      "h1",
      { className: "font-medium text-6xl" },
      "15+"
    ),
    text: "Jenis Perbaikan",
  },
  {
    icon: React.createElement(ShieldCheck, { color: "currentColor", size: 60 }),
    text: "Garansi Perbaikan",
  },
];

export const repairItems: RepairItemProps[] = [
  {
    icon: React.createElement(PiTelevisionBold, { size: 72 }),
    label: "Television",
  },
  {
    icon: React.createElement(FaRadio, { size: 72 }),
    label: "Radio",
  },
  {
    icon: React.createElement(CgSmartHomeRefrigerator, { size: 72 }),
    label: "Kulkas",
  },
  {
    icon: React.createElement(GiWashingMachine, { size: 72 }),
    label: "Mesin Cuci",
  },
  {
    icon: React.createElement(Fan, { size: 72 }),
    label: "Kipas Angin",
  },
  {
    icon: React.createElement(FaBlender, { size: 72 }),
    label: "Blender",
  },
  {
    icon: React.createElement(PiPrinterFill, { size: 72 }),
    label: "Printer",
  },
  {
    icon: React.createElement(TbAirConditioningDisabled, { size: 72 }),
    label: "AC",
  },
];

export const FAQsItems = [
  {
    id: 1,
    value: "item-1",
    question: "Q. How this theme is different from others in the market?",
    answer:
      "We provide unique, customizable components designed to simplify the development process and enhance user experience.",
  },
  {
    id: 2,
    value: "item-2",
    question: "Q. Does this theme support plugins?",
    answer:
      "We supports various plugins to extend the functionality of your projects, making development faster and easier.",
  },
  {
    id: 3,
    value: "item-3",
    question: "Q. Do you provide any moneyback guarantee for this product?",
    answer:
      "Yes, we offer a 30-day money-back guarantee if you are not satisfied with us.",
  },
  {
    id: 4,
    value: "item-4",
    question: "Q. What payment method do you support?",
    answer:
      "We support various payment methods including credit cards, PayPal, and cryptocurrencies.",
  },
  {
    id: 5,
    value: "item-5",
    question: "Q. How do you provide support?",
    answer:
      "Our team provides extensive documentation and 24/7 support for all products and plugins included.",
  },
];

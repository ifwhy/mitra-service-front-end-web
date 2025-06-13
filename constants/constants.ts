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
    href: "#layanan",
    description:
      "Kami menyediakan solusi layanan terpadu untuk berbagai kebutuhan servis elektronik Anda, dari rumah ke rumah.",
  },
  {
    title: "Pengambilan Perangkat",
    href: "#layanan",
    description:
      "Layanan penjadwalan pengambilan perangkat elektronik yang rusak langsung dari lokasi pelanggan.",
  },
  {
    title: "Pemeriksaan dan Diagnosis",
    href: "#layanan",
    description:
      "Teknisi kami akan menganalisis kondisi perangkat untuk mengidentifikasi kerusakan dan memberikan estimasi biaya.",
  },
  {
    title: "Servis dan Perbaikan",
    href: "#layanan",
    description:
      "Perangkat Anda akan diperbaiki oleh teknisi berpengalaman menggunakan suku cadang terbaik dan bergaransi.",
  },
  {
    title: "Pengembalian Perangkat",
    href: "#layanan",
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
    href: "#mitra-servis",
    description:
      "Kami hadir untuk memberikan solusi terbaik untuk kebutuhan servis elektronik Anda.",
  },
  {
    title: "Tim Kami",
    href: "#mitra-servis",
    description:
      "Kami memiliki tim teknisi profesional untuk menangani berbagai perangkat elektronik.",
  },
  {
    title: "Apa Saja yang Dapat Kami Perbaiki?",
    href: "#perbaiki",
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
    question: "Q. Apa saja perangkat elektronik yang bisa diperbaiki di layanan servis kami?",
    answer:
      "Kami melayani jasa servis berbagai alat elektronik rumah tangga, seperti televisi, blender, kipas angin, setrika, dispenser, mesin cuci, rice cooker, dan peralatan elektronik lainnya. Jika ada perangkat selain itu, silakan hubungi kami untuk konsultasi gratis.",
  },
  {
    id: 2,
    value: "item-2",
    question: "Q. Bagaimana cara pengambilan barang servis di tempat?",
    answer:
      "Kami menyediakan layanan antar jemput perangkat elektronik langsung ke lokasi Anda. Setelah Anda melakukan pemesanan layanan servis dan membayar uang muka (DP), tim kami akan datang ke alamat yang Anda tentukan untuk mengambil perangkat yang rusak.",
  },
  {
    id: 3,
    value: "item-3",
    question: "Q. Apakah ada jaminan atau garansi setelah servis selesai?",
    answer:
      "Setiap hasil servis dari kami dilengkapi dengan garansi resmi sesuai jenis kerusakan dan suku cadang yang digunakan. Garansi ini memastikan Anda mendapatkan hasil servis yang berkualitas. Jika dalam masa garansi terjadi kerusakan yang sama, Anda bisa mengajukan klaim tanpa biaya tambahan.",
  },
  {
    id: 4,
    value: "item-4",
    question: "Q. Bagaimana sistem pembayaran servis elektronik di tempat kami?",
    answer:
      "Sistem pembayaran kami fleksibel dan aman. Anda hanya perlu membayar DP (uang muka) saat awal pemesanan layanan. Setelah servis selesai dan perangkat siap digunakan kembali, sisa pembayaran bisa dilunasi.",
  },
  {
    id: 5,
    value: "item-5",
    question: "Q. Bagaimana cara memesan jasa servis elektronik?",
    answer:
      "Cukup mudah! Anda bisa memesan melalui website kami, mengisi formulir layanan servis, atau menghubungi kami langsung lewat WhatsApp maupun telepon. Tim admin kami akan membantu mengatur jadwal pengambilan perangkat dan memberikan estimasi biaya servis secara transparan.",
  },
];

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { TopBarIconReactIcon } from "./types";
import { IconType } from "react-icons";

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
    href: "/layanan/faq",
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

import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Mitra Servis Elektronik",
  description: "Mitra Servis Elektronik",
  authors: {
    name: "Fathoni Nur Habibi",
    url: "https://github.com/fathoni1509",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="lg:sticky lg:top-0 lg:z-[9999] bg-slate-100 dark:bg-neutral-950">
        <TopBar />
        <Navbar />
      </header>

      <main className="bg-slate-100 dark:bg-neutral-900">{children}</main>
    </>
  );
}

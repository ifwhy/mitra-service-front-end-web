import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Mitra Servis Elektronik",
  description: "Mitra Servis Elektronik",
  authors: {
    name: "Fathoni Nur Habibi",
    url: "https://github.com/fathoni1509",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) auth.protect({ feature: "clerk" });

  return (
    <>
      <main>{children}</main>
    </>
  );
}

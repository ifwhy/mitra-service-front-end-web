import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Mitra Servis Elektronik",
  description: "Mitra Servis Elektronik",
  authors: {
    name: "Fathoni Nur Habibi",
    url: "https://github.com/fathoni1509",
  },
};

const geistSans = Geist();
const geistMono = Geist_Mono();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id" className="scroll-smooth" suppressHydrationWarning>
        <body
          className={`${geistSans.className} ${geistMono.className} antialiased lg:min-h-screen`}
        >
          <SidebarProvider className="flex flex-col">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {" "}
              <div>
                <Toaster />
                <SonnerToaster />
              </div>
              {children}
            </ThemeProvider>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

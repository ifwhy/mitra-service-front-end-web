"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import images from "@/constants/images";
import { SignIn, SignUp } from "@clerk/clerk-react";
import Image from "next/image";

export function TabAuth() {
  return (
    <Tabs defaultValue="masuk" className="w-full">
      <div className="w-full flex flex-row items-center gap-1 justify-center">
        <Image
          src={images.mitraLogoCircle}
          alt="Logo Mitra Servis"
          className="size-16"
        />

        <div className="font-semibold text-lg">
          <p>Mitra Servis</p>
          <p>Elektronik</p>
        </div>
      </div>

      <TabsList className="flex flex-row w-full mt-2 gap-2 items-center py-2">
        <TabsTrigger value="daftar" className="font-semibold text-base w-full">
          Daftar
        </TabsTrigger>
        <TabsTrigger value="masuk" className="font-semibold text-base w-full">
          Masuk
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="daftar"
        className="shadow-none border-none mt-5 h-min flex flex-col w-full items-center justify-center"
      >
        <SignUp
          appearance={{
            elements: {
              card: "static shadow-none border-none rounded-lg bg-transparent text-white dark:text-white mx-auto w-full",
              headerTitle: "hidden", // sembunyikan title
              headerSubtitle: "hidden", // sembunyikan subtitle
              form: "space-y-0",
              formFieldInput:
                "border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md",
              socialButtonsBlockButton:
                "border border-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 ease-in-out -my-5 dark:text-white text-black rounded-md flex items-center justify-center",
              formFieldLabel: "text-black dark:text-white",
              dividerLine: "hidden",
              dividerText: "hidden",
              footer: "hidden",
              input: "text-white",
              inputText: "text-white",
            },
            variables: {
              colorPrimary: "#1D4ED8", // biru
            },
          }}
          afterSignUpUrl="/dashboard"
          signInUrl="/sign-in"
        />
      </TabsContent>

      <TabsContent
        value="masuk"
        className="shadow-none border-none mt-5 h-min flex flex-col w-full items-center justify-center"
      >
        <SignIn
          appearance={{
            elements: {
              card: "static shadow-none border-none rounded-lg bg-transparent text-white dark:text-white mx-auto w-full",
              headerTitle: "hidden", // sembunyikan title
              headerSubtitle: "hidden", // sembunyikan subtitle
              form: "space-y-0",
              formFieldInput:
                "border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md",
              socialButtonsBlockButton:
                "border border-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 ease-in-out -my-5 dark:text-white text-black rounded-md flex items-center justify-center",
              formFieldLabel: "text-black dark:text-white",
              dividerLine: "hidden",
              dividerText: "hidden",
              footer: "hidden",
              input: "text-white",
              inputText: "text-white",
            },
            variables: {
              colorPrimary: "#1D4ED8", // biru
            },
          }}
          afterSignOutUrl="/"
        />
      </TabsContent>
    </Tabs>
  );
}

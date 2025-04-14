"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import images from "@/constants/images";
import Image from "next/image";
import toast from "react-hot-toast";

export function TabAuth() {
  const handleSignUp = () => {
    toast.success("Berhasil Daftar");
  };

  const handleSignIn = () => {
    toast.success("Berhasil Masuk");
  };

  return (
    <Tabs defaultValue="masuk" className="w-full my-3">
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
      <TabsContent value="daftar">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&rsquo;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignUp}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="masuk">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>

          <CardFooter>
            <Button onClick={handleSignIn}>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

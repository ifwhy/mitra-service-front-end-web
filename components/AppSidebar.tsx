"use client";
import { HomeIcon, Tv } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import ModeToggle from "./ToggleMode";
import { FaComment, FaServicestack } from "react-icons/fa";
import Image from "next/image";
import images from "@/constants/images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  authors,
  mitraServisComponents,
  serviceComponents,
  socialMediaItems,
} from "@/constants/constants";

export function AppSidebar() {
  return (
    <Sidebar className="lg:hidden" variant="inset">
      <SidebarContent className="overflow-x-clip overflow-y-scroll">
        <SidebarGroup>
          <SidebarHeader className="flex flex-row items-center justify-between px-2 gap-2">
            <Link href={"/"} className="flex flex-row gap-1 items-center">
              <Image
                src={images.mitraLogoCircle}
                alt="Logo Mitra Servis"
                className="size-12"
              />

              <div className="flex flex-col font-bold text-base">
                <p>Mitra Servis</p>
                <p>Elektronik</p>
              </div>
            </Link>
            <ModeToggle />
          </SidebarHeader>

          <SidebarGroupContent className="overflow-y-auto ml-4 mt-3 flex flex-row gap-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"#"}>
                    <HomeIcon />
                    <span>Beranda</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="hover:bg-sidebar-accent p-1.5 rounded-lg hover:text-sidebar-accent-foreground">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2">
                    <Tv size={16} />
                    <span>Mitra Servis</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="ml-8">
                    {mitraServisComponents.map((mitraServisComponent) => (
                      <DropdownMenuItem key={mitraServisComponent.title}>
                        <Link href={mitraServisComponent.href}>
                          {mitraServisComponent.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>

              <SidebarMenuItem className="hover:bg-sidebar-accent p-1.5 rounded-lg hover:text-sidebar-accent-foreground">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2">
                    <FaServicestack size={16} />
                    <span>Layanan</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="ml-8">
                    {serviceComponents.map((serviceComponent) => (
                      <DropdownMenuItem key={serviceComponent.title}>
                        <Link href={serviceComponent.href}>
                          {serviceComponent.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"#"}>
                    <FaComment />
                    <span>Ulasan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupContent className="w-full flex flex-col items-center justify-center mt-5">
            <p className="font-semibold">Ikuti Kami di Media Sosial</p>

            <div className="flex flex-col mt-3 gap-3 items-start w-full ml-9">
              {socialMediaItems.map((socialMediaItem) => (
                <Link
                  key={socialMediaItem.username}
                  href={socialMediaItem.href}
                  target="_blank"
                  className="flex flex-row gap-2 items-center hover:bg-sidebar-accent p-1.5 rounded-lg hover:text-sidebar-accent-foreground w-full"
                >
                  <socialMediaItem.icon size={20} />
                  <span>{socialMediaItem.username}</span>
                </Link>
              ))}
            </div>
          </SidebarGroupContent>

          <SidebarGroupContent className="w-full flex flex-col justify-center gap-1 mt-5 px-3 text-justify font-base rounded-lg items- dark:bg-slate-800 bg-slate-200 p-3">
            <p>
              Website ini merupakan proyek besar pada mata kuliah Pemrograman
              Web
            </p>
            <p className="mt-1">Dikembangkan oleh:</p>
            <ul>
              {authors.map((author, index) => (
                <li key={author.name} className="flex flex-row flex-wrap">
                  <p>
                    {index + 1}. {author.name} ({author.nim})
                  </p>
                </li>
              ))}
            </ul>
          </SidebarGroupContent>

          <SidebarGroupContent className="w-full flex flex-col gap-1 mt-5 items-center font-semibold">
            <p>&copy; Copyright {new Date().getFullYear()}</p>
            <p>Mitra Servis Elektronik Solo</p>
            <p>All Rights Reserved</p>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  mitraServisComponents,
  serviceComponents,
} from "@/constants/constants";

export function NavMenu() {
  return (
    <NavigationMenu className="mx-2">
      <NavigationMenuList className="gap-2 lg:gap-5">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#beranda"
              className={
                navigationMenuTriggerStyle() +
                " bg-transparent border-b-2 rounded-none border-transparent hover:border-black transition-all duration-300 hover:dark:border-slate-100 dark:bg-transparent"
              }
            >
              <p className="text-base lg:text-lg">Beranda</p>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent border-b-2 rounded-none border-transparent hover:border-black transition-all duration-300 hover:dark:border-slate-100 dark:bg-transparent hover:dark:bg-transparent">
            {" "}
            <p className="text-base lg:text-lg">Mitra Servis</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="#mitra-servis"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Mitra Servis Elektronik
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground text-justify">
                      Kami adalah penyedia layanan servis elektronik terbaik di
                      Kota Solo.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>

              {mitraServisComponents.map((mitraServisComponent) => (
                <ListItem
                  key={mitraServisComponent.title}
                  href={mitraServisComponent.href}
                  title={mitraServisComponent.title}
                  className="text-justify"
                >
                  {mitraServisComponent.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent border-b-2 rounded-none border-transparent hover:border-black transition-all duration-300 hover:dark:border-slate-100 dark:bg-transparent hover:dark:bg-transparent">
            <p className="text-base lg:text-lg">Layanan</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {serviceComponents.map((serviceComponent) => (
                <ListItem
                  key={serviceComponent.title}
                  title={serviceComponent.title}
                  href={serviceComponent.href}
                >
                  {serviceComponent.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* FIXED: Changed order to match other navigation items */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#ulasan"
              className={
                navigationMenuTriggerStyle() +
                " bg-transparent border-b-2 rounded-none border-transparent hover:border-black transition-all duration-300 hover:dark:border-slate-100 dark:bg-transparent"
              }
            >
              <p className="text-base lg:text-lg">Ulasan</p>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

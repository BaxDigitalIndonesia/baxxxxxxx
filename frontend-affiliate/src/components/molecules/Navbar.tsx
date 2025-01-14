"use client";
import CustomContainer from "../atoms/CustomContainer";
import Link from "next/link";
import EachUtils from "@/utils/EachUtils";
import { usePathname } from "next/navigation";
import { navItems } from "@/constant";
import { buttonVariants } from "../ui/button";
import ToggleNavigation from "./ToggleNavigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Code, HeartHandshake, Scroll, Users } from "lucide-react";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <CustomContainer reverse>
      <div className="mx-auto flex py-2 h-full items-center justify-between md:max-w-screen-xl">
        <div className="flex items-start">
          <Link
            href="/"
            className="flex items-center gap-2">
            <div className="flex aspect-square size-9 items-center justify-center font-bold rounded-lg bg-chart-2 text-sidebar-primary-foreground w-[40px]">
              BAX
            </div>
            <p className="text-xl">Digital Indonesia</p>
          </Link>
        </div>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <ul className="flex items-center justify-center gap-8">
            <NavigationMenu className="bg-transparent">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent hover:font-bold">
                    Program
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[300px] p-3 space-y-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/program"
                          className="block p-2 hover:bg-slate-100 rounded-md">
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4 text-cyan-500" />
                            <span>Bootcamp Full-Stack Developer</span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Belajar menjadi developer profesional dalam 4 bulan
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/marketing"
                          className="block p-2 hover:bg-slate-100 rounded-md">
                          <div className="flex items-center gap-2">
                            <Scroll className="h-4 w-4 text-lime-500" />
                            <span>Bootcamp Digital Marketing</span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Kuasai strategi marketing digital yang efektif
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent hover:font-bold">
                    Service
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[300px] p-3 space-y-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/mitra"
                          className="block p-2 hover:bg-slate-100 rounded-md">
                          <div className="flex items-center gap-2">
                            <HeartHandshake className="h-4 w-4 text-purple-500" />
                            <span>Mitra</span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Bergabung menjadi mitra resmi BAX Digital
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/affiliate"
                          className="block p-2 hover:bg-slate-100 rounded-md">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-orange-500" />
                            <span>Affiliate</span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Dapatkan penghasilan dengan program affiliate kami
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <EachUtils
              of={navItems}
              render={(item, index) => {
                const isActiveMenu = pathName === item.url;
                return (
                  <Link
                    key={index}
                    href={item.url}
                    className={`group relative inline-block px-4 text-black hover:font-bold text-base ${
                      isActiveMenu ? "font-bold" : ""
                    }`}>
                    {item.name}
                    <span
                      className={`absolute bottom-0 h-[2px] bg-black transition-all duration-300 
                        ${
                          isActiveMenu
                            ? "left-1/2 w-full -translate-x-1/2"
                            : "left-1/2 w-0 group-hover:left-0 group-hover:w-full"
                        }`}></span>
                  </Link>
                );
              }}
            />
          </ul>
        </nav>
        {/* <NavigationMenuDemo /> */}

        {/* Wrapper Section */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className={`${buttonVariants({
              size: "sm",
              variant: "ghost",
            })} text-base `}>
            Login
          </Link>
          <Link
            href="/auth/register"
            className={`${buttonVariants({
              size: "sm",
              className: "hidden md:flex",
            })} text-base`}>
            Register
          </Link>

          <ToggleNavigation />
        </div>
      </div>
    </CustomContainer>
  );
}

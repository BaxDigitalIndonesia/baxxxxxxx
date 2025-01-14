"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { navItems } from "@/constant";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import EachUtils from "@/utils/EachUtils";

const ToggleNavigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header md:hidden lg:hidden">
      <Sheet
        open={open}
        onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">fullname</p>
                <p className="caption">email</p>
              </div>
            </div>
            <Separator className="bg-light-200/20 mb-4" />
          </SheetTitle>

          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              <EachUtils
                of={navItems}
                render={(item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.url}
                      className="lg:w-full">
                      <li
                        className={cn(
                          "mobile-nav-item",
                          pathname === item.url && "shad-active"
                        )}>
                        <p>{item.name}</p>
                      </li>
                    </Link>
                  );
                }}
              />
            </ul>
          </nav>

          <Separator className="bg-light-200/20 my-5" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <Button
              type="submit"
              className="mobile-sign-out-button">
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default ToggleNavigation;

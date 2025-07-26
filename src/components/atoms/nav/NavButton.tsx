"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavLink from "./NavLink";
import NavLogo from "./NavLogo";
import { useSession } from "next-auth/react";

interface NavHeaderProps {
  links: { href: string; label: string; active?: boolean }[];
}

export default function NavButton({ links }: NavHeaderProps) {
  const { data: session } = useSession();

  return (
    <>
      {/* Tombol untuk desktop */}
      <div className="hidden md:flex items-center gap-4">
        {session ? (
          <Link href="/dashboard">
            <Button size="sm">Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Daftar</Button>
            </Link>
          </>
        )}
      </div>

      {/* Hamburger menu untuk mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-white border-0 shadow-none"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col pt-6 space-y-6">
            {/* Logo */}
            <div className="px-4">
              <NavLogo />
            </div>

            {/* Navigasi link */}
            <nav className="flex flex-col space-y-3 px-4 text-base font-medium">
              {links.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>

            {/* Tombol login atau dashboard */}
            <div className="px-4">
              {session ? (
                <Link href="/dashboard">
                  <Button className="w-full">Dashboard</Button>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="w-full">Daftar</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

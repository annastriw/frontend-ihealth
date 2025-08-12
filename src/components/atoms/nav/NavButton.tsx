"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavLink from "./NavLink";
import NavLogo from "./NavLogo";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface NavHeaderProps {
  links: { href: string; label: string; active?: boolean }[];
}

export default function NavButton({ links }: NavHeaderProps) {
  const { data: session } = useSession();

  const MotionButton = motion(Button);

  return (
    <>
      {/* Tombol untuk desktop */}
      <div className="hidden items-center gap-4 md:flex">
        {session ? (
          <Link href="/dashboard">
            <MotionButton
              size="sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
            </MotionButton>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <MotionButton
                variant="outline"
                size="sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Masuk
              </MotionButton>
            </Link>
            <Link href="/register">
              <MotionButton
                size="sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Daftar
              </MotionButton>
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
              className="border-0 bg-white shadow-none"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col space-y-6 pt-6">
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
                  <MotionButton
                    className="w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Dashboard
                  </MotionButton>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" className="w-full">
                    <MotionButton
                      variant="outline"
                      className="w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Masuk
                    </MotionButton>
                  </Link>
                  <Link href="/register" className="w-full">
                    <MotionButton
                      className="w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Daftar
                    </MotionButton>
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

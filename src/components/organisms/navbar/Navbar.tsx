"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import NavLink from "@/components/atoms/nav/NavLink";
import NavLogo from "@/components/atoms/nav/NavLogo";
import NavButton from "@/components/atoms/nav/NavButton";

export default function Navbar() {
  const pathname = usePathname();

  const links = useMemo(() => [
    { href: "/about-us", label: "Tentang Kami", active: pathname === "/about-us" },
    { href: "/dashboard/modules", label: "Materi", active: pathname.startsWith("/dashboard/modules") },
    { href: "/dashboard/screening", label: "Screening", active: pathname.startsWith("/dashboard/screening") },
  ], [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-muted shadow-md transition-all duration-300">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <NavLogo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <NavButton links={links} />
      </div>
    </header>
  );
}

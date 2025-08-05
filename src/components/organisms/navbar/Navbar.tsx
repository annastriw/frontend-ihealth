"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import NavLink from "@/components/atoms/nav/NavLink";
import NavLogo from "@/components/atoms/nav/NavLogo";
import NavButton from "@/components/atoms/nav/NavButton";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Tambahkan efek bayangan saat scroll
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Daftar link navigasi utama
  const links = useMemo(
    () => [
      {
        href: "/about-us",
        label: "Tentang Kami",
        active: pathname === "/about-us",
      },
      {
        href: "/dashboard/modules",
        label: "Materi",
        active: pathname.startsWith("/dashboard/modules"),
      },
      {
        href: "/dashboard/screening",
        label: "Screening",
        active: pathname.startsWith("/dashboard/screening"),
      },
    ],
    [pathname],
  );

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`border-border sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl dark:bg-neutral-900/70 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      } transition-shadow duration-300`}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Logo */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <NavLogo />
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden items-center gap-8 md:flex"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {links.map((link) => (
            <motion.div
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <NavLink {...link} />
            </motion.div>
          ))}
        </motion.nav>

        {/* Tombol Login / Daftar */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <NavButton links={links} />
        </motion.div>
      </div>
    </motion.header>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NavLogo() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.25 }}>
      <Link href="/" className="group flex items-center gap-2 transition-all">
        {/* Logo */}
        <Image
          src="/images/assets/bg-about-us.png"
          alt="iHealth Edu"
          width={40}
          height={40}
          className="h-10 w-10 object-contain md:h-12 md:w-12"
        />

        {/* Text */}
        <span className="group-hover:from-primary group-hover:to-secondary text-lg font-bold tracking-tight text-black transition-all group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent">
          iHealth Edu
        </span>
      </Link>
    </motion.div>
  );
}

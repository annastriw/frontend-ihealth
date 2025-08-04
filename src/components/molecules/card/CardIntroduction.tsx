"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardIntroductionProps {
  title: string;
  description: string;
  href: string;
  image: string;
}

export default function CardIntroduction({
  title,
  description,
  href,
  image,
}: CardIntroductionProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="z-10 flex h-full max-w-full flex-col overflow-hidden rounded-2xl border border-green-300 bg-white shadow-md transition-shadow hover:z-20 hover:bg-[oklch(var(--primary)/0.05)] hover:shadow-lg md:flex-row"
    >
      {/* Gambar */}
      <div className="flex items-center justify-center bg-green-50 p-6 md:w-[140px] md:p-6 lg:w-[160px]">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Konten */}
      <div className="flex flex-1 flex-col justify-between space-y-3 px-5 py-4 md:px-4 md:py-3">
        <h3 className="text-lg leading-tight font-semibold text-green-700 md:text-xl">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        <div className="mt-auto pt-2">
          <Link href={href}>
            <Button className="w-full bg-[oklch(var(--primary))] px-5 py-1.5 text-sm text-[oklch(var(--primary-foreground))] transition-transform duration-300 hover:scale-105 hover:bg-[oklch(var(--primary-dark))] sm:w-auto">
              Baca Selengkapnya
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

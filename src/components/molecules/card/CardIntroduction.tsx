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
      className="z-10 flex h-full w-full max-w-[260px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-green-300 bg-white shadow-md transition-shadow hover:z-20 hover:bg-[oklch(var(--primary)/0.05)] hover:shadow-lg sm:max-w-[300px] md:max-w-[340px] md:flex-row"
    >
      {/* Gambar */}
      <div className="flex items-center justify-center bg-green-50 p-4 sm:p-5 md:w-[150px] lg:w-[170px]">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            width={110}
            height={110}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Konten */}
      <div className="flex flex-1 flex-col justify-between space-y-2 px-4 py-3 sm:px-5 sm:py-4">
        <h3 className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 bg-clip-text text-sm leading-snug font-semibold text-transparent sm:text-base md:text-lg">
          {title}
        </h3>
        <p className="text-muted-foreground text-xs leading-normal sm:text-sm">
          {description}
        </p>
        <div className="mt-auto pt-3">
          <Link href={href} aria-label={`Baca lebih lanjut tentang ${title}`}>
            <Button className="w-full rounded-lg bg-[oklch(var(--primary))] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[oklch(var(--primary-dark))] sm:w-auto">
              Baca Selengkapnya
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

interface SectionTitleSecondaryProps {
  title: string;
}

export default function SectionTitleSecondary({
  title,
}: SectionTitleSecondaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative mx-auto mb-10 w-fit px-4 text-center"
    >
      <h1 className="inline-block text-lg font-bold tracking-tight text-black sm:text-xl md:text-2xl lg:text-3xl">
        {title}
      </h1>

      {/* Garis bawah hitam dengan gradasi dan posisi lebih dekat ke teks */}
      <span className="absolute top-full left-1/2 mt-2 h-[3px] w-14 -translate-x-1/2 rounded-full bg-gradient-to-r from-black via-neutral-800 to-black opacity-80" />
    </motion.div>
  );
}

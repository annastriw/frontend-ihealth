"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative mx-auto mb-4 w-fit px-2 sm:px-3"
    >
      <h1 className="inline-block bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 bg-clip-text text-xl leading-tight font-bold tracking-tight text-transparent sm:text-2xl md:text-3xl">
        {title}
      </h1>

      {/* Garis bawah dekoratif */}
      <span className="absolute top-full left-1/2 mt-1 h-0.5 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 blur-[0.5px]" />
    </motion.div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CardComunity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border border-green-300 bg-[oklch(var(--primary)/0.1)] shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-[oklch(var(--primary-dark)/0.15)]"
    >
      {/* Background Dekoratif */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="to-primary/30 pointer-events-none absolute -top-16 -right-10 z-0 h-56 w-56 rotate-45 rounded-full bg-gradient-to-tr from-green-400/20 blur-2xl"
      />

      {/* Konten */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-10 sm:py-16 md:px-16 md:py-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
          className="via-primary bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text font-sans text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl"
        >
          Bergabung di Komunitas iHealth
        </motion.h3>

        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed sm:text-base md:text-lg">
          Temukan ruang untuk saling mendukung, berbagi pengalaman, dan tumbuh
          bersama dalam komunitas yang peduli akan kesehatan.
        </p>

        <Link href="/login">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              size="default"
              className="bg-primary hover:bg-primary/90 dark:hover:bg-primary-dark rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors duration-300 sm:text-base"
            >
              Bergabung Sekarang
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

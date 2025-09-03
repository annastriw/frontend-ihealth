"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeScreeningInvitation() {
  return (
    <section className="w-full scroll-mt-24 bg-[oklch(var(--primary)/0.03)] px-4 py-6 sm:px-6 md:px-10 md:py-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-green-300 bg-[oklch(var(--primary)/0.1)] shadow-md transition-shadow duration-300 hover:shadow-xl dark:bg-[oklch(var(--primary-dark)/0.15)]"
        >
          {/* Dekoratif blob */}
          <div className="to-primary/30 pointer-events-none absolute -top-14 right-0 z-0 h-64 w-64 rotate-45 rounded-full bg-gradient-to-tr from-green-400/20 blur-2xl" />

          {/* Konten utama */}
          <CardContent className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
              {/* TEKS */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-6 text-center md:text-left"
              >
                <h2 className="text-primary text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
                  Cek Kesehatanmu, <br />
                  <span className="text-green-700 dark:text-green-400">
                    Mulai dari Sini!
                  </span>
                </h2>
                <p className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed sm:text-base md:mx-0 md:text-lg">
                  Cukup dengan beberapa klik, Anda dapat meninjau kondisi kesehatan dan mendapatkan gambaran awal untuk lebih peduli pada kesehatan Anda.
                </p>

                <div className="mt-4 flex justify-center md:justify-start">
                  <Link href="/login">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                    >
                      <Button
                        size="default"
                        className="bg-primary hover:bg-primary/90 dark:hover:bg-primary-dark rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors duration-300 sm:text-base"
                      >
                        Mulai Sekarang
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              {/* GAMBAR */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex justify-center md:justify-end"
              >
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  transition={{ type: "spring", stiffness: 160, damping: 14 }}
                  className="relative aspect-square w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[400px]"
                >
                  <Image
                    src="/images/assets/doctor.png"
                    alt="Ilustrasi Dokter"
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>
          </CardContent>
        </motion.div>
      </div>
    </section>
  );
}

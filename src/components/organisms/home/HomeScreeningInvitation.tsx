"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeScreeningInvitation() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full scroll-mt-24 bg-[oklch(var(--primary)/0.03)] px-4 py-24 sm:px-6 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative overflow-hidden rounded-2xl border border-green-300 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-neutral-900"
        >
          <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-5 text-center md:text-left"
              >
                <h1 className="font-paytone text-primary text-3xl leading-snug sm:text-4xl">
                  Cek Kesehatanmu,
                  <br />
                  <span className="text-green-700">Mulai dari Sini!</span>
                </h1>
                <p className="text-muted-foreground mx-auto max-w-prose text-base leading-relaxed font-normal sm:text-lg md:mx-0">
                  Cukup dengan beberapa klik, kamu bisa mengenali kondisi
                  kesehatanmu. Jawab pertanyaan ringan dan dapatkan gambaran
                  awal tentang kesejahteraan tubuhmu.
                </p>
                <Link href="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button className="text-primary border-primary hover:bg-primary rounded-lg border bg-white px-6 py-3 font-medium transition-colors duration-300 hover:text-white">
                      Mulai Sekarang
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex justify-center md:justify-end"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="relative aspect-square w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px]"
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
    </motion.section>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Ubah Button jadi motion component
const MotionButton = motion(Button);

export default function HomeJumbotron() {
  return (
    <section className="w-full bg-white px-4 py-6 sm:px-6 md:px-10 md:py-10 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 md:gap-16 lg:flex-row lg:items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
        >
          <h1 className="font-paytone text-3xl leading-tight tracking-tight text-gray-900 uppercase sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
            Platform Edukasi
          </h1>
          <h1 className="font-paytone mt-1 bg-gradient-to-r from-[oklch(80%_0.14_145)] to-[oklch(60%_0.2_145)] bg-clip-text text-3xl leading-tight tracking-tight text-transparent uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            iHealth Edu
          </h1>
          <p className="mt-4 max-w-md text-base text-gray-600 sm:text-lg md:text-xl lg:max-w-xl dark:text-gray-300">
            iHealth Edu adalah platform edukasi kesehatan yang menyajikan
            informasi terpercaya seputar Hipertensi, Diabetes Melitus, dan
            Kesehatan Mental. Disusun berdasarkan ilmu keperawatan dan psikologi
            untuk masyarakat luas.
          </p>

          <div className="mt-6">
            <Link href="/login">
              <MotionButton
                size="default"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-primary hover:bg-primary/90 dark:hover:bg-primary-dark rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors duration-300 sm:text-base"
              >
                Coba Sekarang
              </MotionButton>
            </Link>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-1 items-center justify-center"
        >
          <Image
            src="/images/assets/bg-hero.png"
            alt="Ilustrasi edukasi kesehatan iHealth Edu"
            width={512}
            height={512}
            priority
            className="w-full max-w-[260px] transition-transform duration-200 ease-in-out sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] xl:max-w-[520px]"
          />
        </motion.div>
      </div>
    </section>
  );
}

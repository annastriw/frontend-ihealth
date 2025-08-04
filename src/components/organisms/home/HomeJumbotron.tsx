"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeJumbotron() {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:px-10 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 md:flex-col-reverse lg:flex-row lg:items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
        >
          <h1 className="font-paytone text-3xl leading-snug font-bold text-gray-900 uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            Platform Edukasi{" "}
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              iHealth Edu
            </span>
          </h1>
          <p className="mt-4 max-w-md text-base text-gray-600 sm:text-lg md:text-xl lg:max-w-xl">
            iHealth Edu adalah website edukasi kesehatan yang menyediakan
            informasi terpercaya mengenai Hipertensi, Diabetes Melitus, dan
            Kesehatan Mental. Disusun berbasis ilmu keperawatan & psikologi,
            mudah dipahami pasien, keluarga, dan masyarakat luas.
          </p>
          <div className="mt-6">
            <Link href="/login">
              <Button className="w-full px-6 py-2 text-base transition-transform duration-300 hover:scale-105 sm:w-auto">
                Coba Sekarang
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="flex flex-1 items-center justify-center"
        >
          <Image
            src="/images/assets/bg-hero.png"
            alt="Hero iHealth Edu"
            width={512}
            height={512}
            className="w-full max-w-[320px] transition-transform duration-200 ease-in-out sm:max-w-[400px] md:max-w-[480px] lg:max-w-[550px]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

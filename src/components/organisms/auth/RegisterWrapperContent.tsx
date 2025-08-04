"use client";

import { motion } from "framer-motion";
import FormAuthRegister from "@/components/molecules/form/auth/FormAuthRegister";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function RegisterWrapperContent() {
  return (
    <div className="relative flex h-screen flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Tombol Sign In (Desktop Only) */}
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 right-4 z-50 hidden md:top-8 md:right-8",
        )}
      >
        Sign In
      </Link>

      {/* Kiri: Gambar Dokter + Logo */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-primary relative hidden h-full flex-col justify-between p-10 text-white lg:flex dark:border-r"
      >
        {/* Logo Kiri Atas dengan Hover */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group relative z-20 flex items-center gap-3 text-lg font-medium transition-all duration-300"
        >
          <Link
            href="/"
            className="flex items-center gap-3 transition-all hover:opacity-90"
          >
            <Image
              src="/images/assets/bg-about-us.png"
              alt="iHealth Edu"
              width={48}
              height={48}
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-semibold tracking-wide text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text group-hover:text-transparent">
              iHealth Edu
            </span>
          </Link>
        </motion.div>

        {/* Gambar Dokter dengan Hover Scale dan Fade In */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-1 items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="transition-transform duration-300"
          >
            <Image
              src="/images/assets/bg-hero.png"
              alt="Dokter"
              width={384}
              height={384}
              className="h-auto w-200 object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Tulisan Bawah Kiri */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="z-20 mt-4"
        >
          <p className="max-w-md text-lg leading-relaxed">
            Platform edukasi kesehatan untuk <strong>Hipertensi</strong>,{" "}
            <strong>Diabetes Melitus</strong>, dan{" "}
            <strong>Kesehatan Mental</strong>
          </p>
        </motion.div>
      </motion.div>

      {/* Kanan: Form Register + Logo Mobile */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-background mt-2 flex h-full items-start justify-center overflow-y-auto px-4 py-8 sm:px-6 md:mt-0 md:px-10 lg:px-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
          {/* Logo Mobile dengan Hover */}
          <div className="group mt-2 mb-4 flex justify-center transition-all duration-300 lg:hidden">
            <Link
              href="/"
              className="flex items-center gap-3 transition-all hover:opacity-90"
            >
              <Image
                src="/images/assets/bg-about-us.png"
                alt="iHealth Edu"
                width={40}
                height={40}
                className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="group-hover:from-primary group-hover:to-secondary text-xl font-semibold text-black transition-all duration-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent dark:text-white">
                iHealth Edu
              </span>
            </Link>
          </div>

          {/* Form Register */}
          <FormAuthRegister />
        </motion.div>
      </motion.div>
    </div>
  );
}

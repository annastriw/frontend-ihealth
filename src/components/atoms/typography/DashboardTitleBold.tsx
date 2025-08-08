"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DashboardTitleBoldProps {
  head: string;
}

export default function DashboardTitleBold({ head }: DashboardTitleBoldProps) {
  const [showUnderline, setShowUnderline] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowUnderline(true);
      setIsShimmering(true);
    }, 300);

    // Stop shimmer after 2.5 seconds
    const timer2 = setTimeout(() => {
      setIsShimmering(false);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative mx-auto mb-10 w-fit px-4 text-center lg:mx-0 lg:text-left"
    >
      <h1 className="inline-block font-sans text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
        {head}
      </h1>

      {showUnderline && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute top-full left-1/2 mt-3 h-[4px] -translate-x-1/2 overflow-hidden rounded-full lg:left-0 lg:translate-x-0"
        >
          <span
            className={`relative block h-full w-full bg-gradient-to-r from-black via-neutral-500 to-black bg-[length:200%_100%] ${
              isShimmering ? "animate-shimmer" : ""
            }`}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

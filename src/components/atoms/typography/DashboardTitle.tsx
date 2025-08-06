"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DashboardTitleProps {
  head: string;
  body: string;
}

export default function DashboardTitle({ head, body }: DashboardTitleProps) {
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowUnderline(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative mx-auto mb-12 w-fit px-4 text-center md:mx-0 md:text-left"
    >
      {/* Title */}
      <h1 className="text-foreground inline-block font-sans text-[1.9rem] font-semibold sm:text-[2.4rem] md:text-[2.8rem]">
        {head}
      </h1>

      {/* Underline Animation */}
      {showUnderline && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "5.5rem" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute top-full left-1/2 mt-3 h-[3px] -translate-x-1/2 rounded-full bg-black md:left-0 md:translate-x-0"
        />
      )}

      {/* Body Text */}
      <p className="text-muted-foreground mt-4 max-w-2xl text-[15px] leading-relaxed font-normal">
        {body}
      </p>
    </motion.div>
  );
}

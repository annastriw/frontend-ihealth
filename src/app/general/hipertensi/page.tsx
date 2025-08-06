"use client";

import { motion } from "framer-motion";
import GeneralTitle from "@/components/atoms/typography/GeneralTitle";
import GeneralHipertensiWrapper from "@/components/organisms/general/hipertensi/GeneralHipertensiWrapper";

export default function GeneralHipertensiPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pad-x-xl py-[1px] sm:py-[2px] md:py-1"
    >
      <GeneralTitle title="Hipertensi" />
      <GeneralHipertensiWrapper />
    </motion.section>
  );
}

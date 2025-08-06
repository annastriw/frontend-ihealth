"use client";

import { motion } from "framer-motion";
import GeneralTitle from "@/components/atoms/typography/GeneralTitle";
import GeneralKesehatanMentalWrapper from "@/components/organisms/general/kesehatan-mental/GeneralKesehatanMentalWrapper";

export default function GeneralKesehatanMentalPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pad-x-xl py-[1px] sm:py-[2px] md:py-1"
    >
      <GeneralTitle title="Kesehatan Mental" />
      <GeneralKesehatanMentalWrapper />
    </motion.section>
  );
}

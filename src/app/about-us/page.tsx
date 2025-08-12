"use client";

import Footer from "@/components/atoms/footer/Footer";
import SectionTitleSecondary from "@/components/atoms/typography/SectionTitleSecondary";
import AboutUsWrapper from "@/components/organisms/about-us/AboutUsWrapper";
import Navbar from "@/components/organisms/navbar/Navbar";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pad-x-xl py-5 sm:py-6 md:py-7"
      >
        <SectionTitleSecondary title="Tentang Kami" />
        <AboutUsWrapper />
      </motion.section>
      <Footer />
    </>
  );
}

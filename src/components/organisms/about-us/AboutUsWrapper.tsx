"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUsWrapper() {
  const paragraphText = [
    `iHealth Edu adalah platform edukasi digital yang bertujuan untuk meningkatkan literasi masyarakat dalam bidang kesehatan, khususnya mengenai **Hipertensi**, **Diabetes Melitus**, dan **Kesehatan Mental**. Website ini menyediakan informasi yang akurat, mudah dipahami, dan berbasis ilmu **keperawatan** serta **psikologi**.`,
    `Melalui artikel, video, dan modul interaktif, iHealth Edu hadir sebagai sarana **pembelajaran** dan **pemberdayaan** bagi pasien, keluarga, maupun masyarakat umum agar lebih peduli terhadap kondisi kesehatan diri dan lingkungan sekitar.`,
    `Website ini dikembangkan oleh **Tim KKN IDBU-26 Universitas Diponegoro** sebagai bentuk kontribusi nyata dalam mendukung edukasi kesehatan berbasis komunitas. Dengan pendekatan **interdisipliner** dan **kolaboratif**, tim kami berkomitmen untuk menyajikan konten yang informatif, relevan, dan berdampak positif bagi masyarakat.`,
    `Kami percaya bahwa **edukasi** adalah langkah awal menuju kehidupan yang lebih sehat, seimbang, dan bermakna. Bersama iHealth Edu, mari wujudkan masyarakat yang lebih sadar, peduli, dan tangguh dalam menghadapi tantangan kesehatan modern.`,
    `Kami belajar, kami berbagi, kami peduli.`,
  ];

  // Fungsi untuk ubah kata penting menjadi <strong>
  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold text-black">
          {part.replace(/\*\*/g, "")}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <div className="text-muted-foreground mx-auto max-w-4xl space-y-6 px-4 text-justify font-sans text-sm leading-relaxed sm:px-6 sm:text-base md:px-8 md:text-[17px]">
      {/* Gambar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <Image
          src="/images/assets/bg-about-us.png"
          alt="iHealth Edu"
          width={1000}
          height={600}
          className="h-28 w-auto object-contain sm:h-36 md:h-44"
          priority
        />
      </motion.div>

      {/* Paragraf Artikel */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-5"
      >
        {paragraphText.map((text, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
          >
            {formatBold(text)}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}

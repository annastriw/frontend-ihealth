"use client";

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";

// Component untuk paragraph item
function ParagraphItem({ text, index }: { text: string; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-black">
            {part.replace(/\*\*/g, "")}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.05,
      }}
    >
      {formatBold(text)}
    </motion.p>
  );
}

// Component untuk card item
function CardItem({
  item,
  index,
}: {
  item: { title: string; desc: string; image: string };
  index: number;
}) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="w-[85%] flex-shrink-0 sm:w-[60%] md:w-auto"
    >
      <Card className="h-full border-0 shadow-xl">
        <CardContent className="flex flex-col items-center gap-6 p-6">
          <Image
            src={item.image}
            alt={item.title}
            width={420}
            height={420}
            className="rounded-lg object-cover"
          />
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-xl font-bold text-emerald-700">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AboutUsWrapper() {
  const paragraphText = [
    `iHealth Edu adalah platform edukasi digital yang bertujuan untuk meningkatkan literasi masyarakat dalam bidang kesehatan, khususnya mengenai **Hipertensi**, **Diabetes Melitus**, dan **Kesehatan Mental**. Website ini menyediakan informasi yang akurat, mudah dipahami, dan berbasis ilmu **keperawatan** serta **psikologi**.`,
    `Melalui artikel, video, dan modul interaktif, iHealth Edu hadir sebagai sarana **pembelajaran** dan **pemberdayaan** bagi pasien, keluarga, maupun masyarakat umum agar lebih peduli terhadap kondisi kesehatan diri dan lingkungan sekitar.`,
    `Website ini dikembangkan oleh **Tim KKN IDBU-26 Universitas Diponegoro** sebagai bentuk kontribusi nyata dalam mendukung edukasi kesehatan berbasis komunitas. Dengan pendekatan **interdisipliner** dan **kolaboratif**, tim kami berkomitmen untuk menyajikan konten yang informatif, relevan, dan berdampak positif bagi masyarakat.`,
    `Kami percaya bahwa **edukasi** adalah langkah awal menuju kehidupan yang lebih sehat, seimbang, dan bermakna. Bersama iHealth Edu, mari wujudkan masyarakat yang lebih sadar, peduli, dan tangguh dalam menghadapi tantangan kesehatan modern.`,
    `Kami belajar, kami berbagi, kami peduli.`,
  ];

  const kelompokData = [
    {
      title: "Kelompok 1",
      desc: "Bertugas di Kelurahan Pedalangan, RT 1–7 RW 07. Kelompok ini fokus pada edukasi kesehatan dasar, pengukuran tekanan darah, pengenalan website iHealth. Selain itu kelompok ini aktif dalam sosialisasi seperti adanya program kerja Demo Masak.",
      image: "/images/assets/kelompok1.png",
    },
    {
      title: "Kelompok 2",
      desc: "Bertugas di Kelurahan Pedalangan, RT 1–10 RW 07. Mereka aktif mengadakan pemeriksaan kesehatan gratis, sosialisasi pola makan sehat, dan mendampingi warga dalam digitalisasi UMKM.",
      image: "/images/assets/kelompok2.png",
    },
    {
      title: "Kelompok 3",
      desc: "Bertugas di Kelurahan Padangsari, RT 1–13 RW 07. Fokus mereka adalah memberikan edukasi kesehatan mental terutama dalam hal mindfullness, pelatihan gaya hidup aktif, dan program monitoring kesehatan lansia.",
      image: "/images/assets/kelompok3.png",
    },
    {
      title: "Kelompok 4",
      desc: "Bertugas di Kelurahan Padangsari, RT 1–5, RW 06. Kelompok ini menginisiasi program cek kesehatan rutin, sowan kader kesehatan, hingga seminar regulasi emosi. Selain itu kelompok ini turut menyumbang program kerja seperti pembuatan website peminjaman balai, kerja bakti, dan membantu lomba 17an .",
      image: "/images/assets/kelompok4.png",
    },
  ];

  return (
    <div className="text-muted-foreground mx-auto max-w-6xl space-y-6 px-4 text-justify font-sans text-sm leading-relaxed sm:px-6 sm:text-base md:px-8 md:text-[17px]">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6"
      >
      </motion.div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
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

      {/* Paragraphs */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-5"
      >
        {paragraphText.map((text, index) => (
          <ParagraphItem key={index} text={text} index={index} />
        ))}
      </motion.div>

      {/* Cards Section */}
      <div className="py-12">
        <div className="scrollbar-hide flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible">
          {kelompokData.map((item, idx) => (
            <CardItem key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

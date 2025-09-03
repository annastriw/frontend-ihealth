"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { useInView } from "react-intersection-observer";
import SectionTitleSecondary from "@/components/atoms/typography/SectionTitleSecondary";

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

// Component untuk artikel kelompok zig-zag + nomor + divider
function ArticleItem({
  item,
  index,
}: {
  item: { title: string; desc: string; image: string };
  index: number;
}) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  });

  const isEven = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      } items-start gap-6 md:gap-10 py-6 sm:py-8 md:py-10 border-b last:border-none`}
    >
      {/* Gambar */}
      <div className="relative w-full md:w-1/3 h-52 md:h-48 lg:h-56 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      {/* Konten */}
      <div className="flex-1 space-y-4">
        {/* Nomor & Judul */}
        <div className="flex items-center gap-4">
          <span className="text-5xl md:text-6xl font-extrabold text-black/70">
            {index + 1}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-black">
            {item.title}
          </h3>
        </div>

        {/* Divider */}
        <div className="h-1 w-20 bg-black rounded-full"></div>

        {/* Deskripsi */}
        <p className="text-muted-foreground text-justify leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutUsWrapper() {
  const paragraphText = [
    `**iHealth Edu** adalah platform edukasi digital yang bertujuan untuk meningkatkan literasi masyarakat dalam bidang kesehatan, khususnya mengenai **Hipertensi**, **Diabetes Melitus**, dan **Kesehatan Mental**. Website ini menyajikan informasi yang akurat, mudah dipahami, dan berbasis ilmu **keperawatan** serta **psikologi**.`,
    `Website ini dikembangkan oleh **Tim IT iHealth Edu** untuk keperluan **KKNT IDBU-26 Universitas Diponegoro**, bekerja sama dengan **Puskesmas Padangsari**. Program ini ditujukan bagi masyarakat sekitar, khususnya **Kelurahan Padangsari** dan **Kelurahan Pedalangan**, Kecamatan Banyumanik, Kota Semarang.`,
    `Melalui artikel, video, dan modul interaktif, iHealth Edu hadir sebagai sarana **pembelajaran** sekaligus **pemberdayaan** bagi pasien, keluarga, maupun masyarakat umum agar lebih peduli terhadap kondisi kesehatan diri dan lingkungan. Dengan pendekatan **interdisipliner** dan **kolaboratif**, tim kami berkomitmen menyajikan konten yang informatif, relevan, dan berdampak positif bagi masyarakat.`,
    `Kami percaya bahwa **edukasi** adalah langkah awal menuju kehidupan yang lebih sehat, seimbang, dan bermakna. Bersama iHealth Edu, mari wujudkan masyarakat yang lebih sadar, peduli, dan tangguh dalam menghadapi tantangan kesehatan modern.`,
    `**Kami belajar, kami berbagi, kami peduli.**`,
  ];

  const kelompokData = [
    {
      title: "Kelompok 1",
      desc: "Bertugas di Kelurahan Pedalangan, RT 1–7 RW 07. Fokus utama kelompok ini adalah edukasi kesehatan dasar, cek kesehatan, serta memperkenalkan penggunaan website iHealth Edu. Selain itu, mereka juga aktif dalam kegiatan sosialisasi, termasuk program kerja seperti Demo Masak untuk mendukung pola makan sehat.",
      image: "/images/assets/kelompok1.png",
    },
    {
      title: "Kelompok 2",
      desc: "Bertugas di Kelurahan Pedalangan, RT 1–10 RW 07. Kelompok ini aktif mengadakan pemeriksaan kesehatan gratis, memberikan sosialisasi terkait pola makan sehat, serta mendampingi warga dalam proses digitalisasi UMKM guna meningkatkan kemandirian ekonomi masyarakat.",
      image: "/images/assets/kelompok2.png",
    },
    {
      title: "Kelompok 3",
      desc: "Bertugas di Kelurahan Padangsari, RT 1–13 RW 07. Fokus kegiatan kelompok ini adalah memberikan edukasi kesehatan mental, khususnya mengenai mindfulness, mendukung gaya hidup aktif melalui pelatihan, serta melaksanakan program monitoring kesehatan lansia secara rutin.",
      image: "/images/assets/kelompok3.png",
    },
    {
      title: "Kelompok 4",
      desc: "Bertugas di Kelurahan Padangsari, RT 1–5 RW 06. Kelompok ini menginisiasi program cek kesehatan rutin, melakukan kunjungan kader kesehatan, serta mengadakan seminar mengenai regulasi emosi. Selain itu, mereka juga berkontribusi dalam program kerja masyarakat, seperti pembuatan website peminjaman balai, kerja bakti, hingga membantu pelaksanaan lomba 17 Agustus.",
      image: "/images/assets/kelompok4.png",
    },
  ];

  const teamMembers = [
    {
      name: "Annas Tri Widagdo",
      role: "Fullstack Developer",
      image: "/images/foto-profile/annas.jpg",
      instagram: "https://www.instagram.com/annastriw/",
    },
    {
      name: "Rendy Akbar Permana",
      role: "Fullstack Developer",
      image: "/images/foto-profile/rendy.jpg",
      instagram: "https://www.instagram.com/rendyakbar013/",
    },
    {
      name: "Alex Bahrus Syarif",
      role: "Machine Learning Engineer",
      image: "/images/foto-profile/alex.jpg",
      instagram: "https://www.instagram.com/alex_bhrsyrf/",
    },
    {
      name: "Dhanu Satria Atmaja",
      role: "Embedded Systems Developer",
      image: "/images/foto-profile/dhanu.jpg",
      instagram: "https://www.instagram.com/dhanuatmaja_/",
    },
  ];

  return (
    <div className="text-muted-foreground mx-auto max-w-5xl space-y-8 px-4 text-justify font-sans text-sm leading-relaxed sm:px-6 sm:text-base md:px-8 md:text-[17px]">
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

      {/* Header Kelompok */}
      <div className="mt-10 mb-2 sm:mt-12 sm:mb-3">
        <SectionTitleSecondary title="Mengenal Lebih Dekat Kelompok KKNT IDBU 26" />
      </div>

      {/* Zig-Zag Editorial Style */}
      <div className="space-y-8 sm:space-y-9 md:space-y-10">
        {kelompokData.map((item, idx) => (
          <ArticleItem key={idx} item={item} index={idx} />
        ))}
      </div>

      {/* Tim IT iHealth Edu */}
      <div className="mt-16 sm:mt-20 text-center">
        <SectionTitleSecondary title="Mengenal Lebih Dekat Tim IT iHealth Edu" />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {teamMembers.map((member, index) => {
            const { ref, inView } = useInView({
              triggerOnce: false,
              threshold: 0.2,
            });

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center"
              >
                {/* Foto Profil */}
                <div className="w-full aspect-[3/4] relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Nama */}
                <p className="mt-4 text-sm sm:text-base md:text-lg font-semibold text-black">
                  {member.name}
                </p>

                {/* Role */}
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {member.role}
                </p>

                {/* Instagram */}
                <motion.a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="mt-2 flex items-center gap-2 text-blue-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base"
                >
                  <Instagram size={18} /> Instagram
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

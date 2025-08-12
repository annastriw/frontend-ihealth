"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GeneralHipertensiWrapper() {
  const paragraphs = [
    `Hipertensi, atau tekanan darah tinggi, adalah kondisi medis kronis di mana tekanan darah terhadap dinding arteri meningkat secara terus-menerus. Kondisi ini sering disebut sebagai "silent killer" karena tidak menimbulkan gejala yang jelas namun dapat menyebabkan komplikasi serius seperti serangan jantung, stroke, dan gagal ginjal. Peningkatan tekanan darah ini terjadi ketika arteri menyempit atau terjadi peningkatan volume darah dalam tubuh.`,

    `Di seluruh dunia, hipertensi merupakan salah satu penyebab utama kematian dan kecacatan. Menurut data WHO, sekitar 1,28 miliar orang dewasa berusia 30–79 tahun menderita hipertensi, dan dua pertiga dari mereka berada di negara berpenghasilan rendah dan menengah. Hal ini menunjukkan bahwa edukasi dan upaya pencegahan sangat penting untuk mengurangi dampak hipertensi dalam jangka panjang.`,

    `Faktor risiko hipertensi meliputi pola makan tinggi garam, konsumsi makanan olahan, kurangnya aktivitas fisik, obesitas, kebiasaan merokok, konsumsi alkohol, serta stres berkepanjangan. Selain itu, faktor genetik juga berperan dalam meningkatkan risiko seseorang terkena hipertensi. Sering kali, penderita tidak menyadari bahwa mereka mengidap hipertensi karena tidak ada gejala, sehingga pemeriksaan rutin menjadi sangat penting.`,

    `Pencegahan hipertensi dapat dilakukan melalui perubahan gaya hidup yang sehat, seperti mengurangi konsumsi natrium, memperbanyak asupan sayuran dan buah, berolahraga secara teratur minimal 30 menit setiap hari, menjaga berat badan ideal, serta menghindari rokok dan alkohol. Selain itu, penting untuk mengelola stres dengan baik melalui teknik relaksasi, tidur cukup, dan menjaga keseimbangan hidup.`,

    `Bagi individu yang telah terdiagnosis hipertensi, pemantauan tekanan darah secara berkala, pengobatan teratur sesuai anjuran dokter, dan kepatuhan dalam menjalani pola hidup sehat adalah kunci utama dalam mencegah komplikasi. Tidak hanya itu, dukungan dari keluarga dan lingkungan juga sangat penting dalam proses pengelolaan penyakit ini.`,

    `Hipertensi bukanlah akhir dari segalanya. Dengan kesadaran, pengetahuan, dan tindakan yang tepat, penderita dapat menjalani hidup normal dan berkualitas. iHealth Edu hadir sebagai sumber edukasi terpercaya untuk mendukung masyarakat memahami pentingnya pencegahan dan pengelolaan hipertensi sejak dini. Mari jaga tekanan darah kita, demi masa depan yang lebih sehat dan bermakna.`,
  ];

  const highlightKeywords = (text: string) => {
    const keywords = [
      "Hipertensi",
      "tekanan darah tinggi",
      "silent killer",
      "komplikasi serius",
      "stroke",
      "gagal ginjal",
      "WHO",
      "edukasi",
      "pencegahan",
      "faktor risiko",
      "gaya hidup yang sehat",
      "berolahraga",
      "pemantauan tekanan darah",
      "pengobatan teratur",
      "iHealth Edu",
    ];

    let formatted = text;
    keywords.forEach((keyword) => {
      const regExp = new RegExp(`(${keyword})`, "gi");
      formatted = formatted.replace(
        regExp,
        `<strong class="font-semibold text-black">$1</strong>`,
      );
    });

    return formatted;
  };

  return (
    <div className="text-muted-foreground mx-auto max-w-4xl space-y-8 px-4 text-justify font-sans leading-relaxed sm:px-5 md:px-6">
      {/* Gambar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <Image
          src="/images/content/hipertensi.jpg"
          alt="Hipertensi"
          width={1000}
          height={600}
          className="w-full max-w-3xl rounded-xl object-cover shadow-md"
          loading="lazy"
        />
      </motion.div>

      {/* Paragraf */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-5 text-[15px] sm:text-[16px] md:text-[17px]"
      >
        {paragraphs.map((text, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: index * 0.04,
            }}
            dangerouslySetInnerHTML={{ __html: highlightKeywords(text) }}
          />
        ))}
      </motion.div>
    </div>
  );
}

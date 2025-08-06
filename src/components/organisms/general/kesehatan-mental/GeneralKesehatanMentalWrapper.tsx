"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GeneralKesehatanMentalWrapper() {
  const paragraphs = [
    `Kesehatan mental adalah keadaan di mana individu dapat menyadari potensi dirinya, mampu mengatasi tekanan hidup normal, bekerja secara produktif, dan berkontribusi kepada komunitasnya. Kesehatan mental mencakup keseimbangan emosi, psikologis, dan sosial yang memengaruhi cara kita berpikir, merasa, dan bertindak dalam kehidupan sehari-hari.`,

    `Gangguan kesehatan mental seperti depresi, gangguan kecemasan, skizofrenia, atau gangguan stres pascatrauma dapat memengaruhi kemampuan seseorang dalam menjalani kehidupan secara optimal. Penyebabnya bisa sangat kompleks, mulai dari faktor genetik, ketidakseimbangan kimia otak, trauma masa kecil, kekerasan dalam rumah tangga, hingga tekanan sosial dan ekonomi.`,

    `Gejala gangguan mental dapat muncul dalam berbagai bentuk, seperti perasaan sedih yang berkepanjangan, kehilangan minat, gangguan tidur, perubahan nafsu makan, kesulitan berkonsentrasi, atau munculnya pikiran untuk menyakiti diri sendiri. Maka dari itu, penting untuk mengenali tanda-tandanya sejak dini dan tidak mengabaikannya.`,

    `Menjaga kesehatan mental dapat dilakukan dengan menerapkan gaya hidup sehat, seperti tidur cukup, makan bergizi, olahraga rutin, serta meluangkan waktu untuk relaksasi dan melakukan aktivitas yang menyenangkan. Selain itu, memiliki hubungan sosial yang positif dan saling mendukung juga sangat membantu dalam menjaga kestabilan emosional.`,

    `Jika menghadapi masalah yang sulit diatasi sendiri, jangan ragu untuk mencari bantuan profesional seperti psikolog, psikiater, atau konselor. Layanan kesehatan jiwa kini lebih mudah diakses dan stigma terhadap gangguan mental pun perlahan mulai berkurang.`,

    `iHealth Edu hadir untuk mengedukasi masyarakat mengenai pentingnya menjaga kesehatan mental. Melalui informasi yang akurat dan mudah dipahami, kami mendorong masyarakat untuk lebih peduli terhadap kondisi emosional dan mental, serta tidak segan untuk mencari dukungan yang dibutuhkan. Kesehatan mental bukanlah suatu kelemahan, tetapi bagian penting dari kehidupan yang sehat dan bermakna.`,
  ];

  const highlightKeywords = (text: string) => {
    const keywords = [
      "Kesehatan mental",
      "emosional",
      "psikologis",
      "sosial",
      "gangguan kesehatan mental",
      "depresi",
      "kecemasan",
      "skizofrenia",
      "trauma",
      "tekanan hidup",
      "relaksasi",
      "psikolog",
      "psikiater",
      "konselor",
      "iHealth Edu",
    ];

    let formatted = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi");
      formatted = formatted.replace(
        regex,
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
          src="/images/content/mental-health.jpg"
          alt="Kesehatan Mental"
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

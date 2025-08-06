"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GeneralDiabetesMelitusWrapper() {
  const paragraphs = [
    `Diabetes Melitus adalah gangguan metabolik kronis yang ditandai dengan peningkatan kadar glukosa dalam tubuh akibat gangguan produksi atau efektivitas hormon insulin. Kondisi ini memengaruhi jutaan orang di seluruh dunia dan menjadi salah satu penyebab utama kematian serta disabilitas jangka panjang jika tidak ditangani dengan baik.`,

    `Terdapat dua jenis utama: Diabetes Tipe 1, yang disebabkan oleh kerusakan sel beta pankreas sehingga tubuh tidak dapat memproduksi insulin, dan umumnya terjadi sejak usia anak-anak atau remaja; serta Diabetes Tipe 2, yang lebih sering dialami oleh orang dewasa dan berkaitan erat dengan pola hidup tidak sehat seperti kurang aktivitas fisik, pola makan tinggi kalori, dan obesitas.`,

    `Gejala diabetes sering kali tidak disadari pada awalnya, terutama pada Tipe 2. Namun, beberapa tanda umum yang perlu diwaspadai antara lain sering buang air kecil, rasa haus berlebihan, penurunan berat badan tanpa sebab yang jelas, mudah lelah, luka yang sulit sembuh, dan gangguan penglihatan. Diagnosis dini sangat penting untuk mencegah komplikasi.`,

    `Komplikasi dari diabetes bisa sangat serius, mencakup kerusakan ginjal, gangguan penglihatan, kerusakan saraf, risiko penyakit jantung, stroke, serta infeksi yang dapat menyebabkan amputasi. Oleh karena itu, penanganan yang tepat dan menyeluruh sangat dibutuhkan.`,

    `Manajemen diabetes melibatkan beberapa aspek penting: pola makan sehat dengan indeks glikemik rendah, aktivitas fisik rutin, pengobatan teratur, dan pemantauan kadar gula darah secara berkala. Edukasi kepada pasien dan keluarganya juga sangat krusial dalam meningkatkan kepatuhan dan kualitas hidup penderita diabetes.`,

    `Pencegahan diabetes, terutama Tipe 2, sangat memungkinkan dilakukan. Dengan menerapkan gaya hidup aktif, menjaga berat badan ideal, memperbanyak konsumsi sayuran dan buah, menghindari konsumsi makanan tinggi gula dan lemak trans, serta tidak merokok dan membatasi alkohol, risiko terkena diabetes dapat ditekan secara signifikan.`,

    `iHealth Edu hadir sebagai media edukasi yang memberikan informasi akurat dan mudah dipahami untuk mendukung masyarakat dalam memahami dan menghadapi Diabetes Melitus. Edukasi yang berkelanjutan merupakan kunci untuk menekan angka kejadian diabetes dan meningkatkan kesadaran akan pentingnya pola hidup sehat.`,
  ];

  const highlightKeywords = (text: string) => {
    const keywords = [
      "Diabetes Melitus",
      "glukosa",
      "gula darah",
      "insulin",
      "Diabetes Tipe 1",
      "Diabetes Tipe 2",
      "gejala",
      "komplikasi",
      "kerusakan ginjal",
      "kerusakan saraf",
      "gangguan penglihatan",
      "penyakit jantung",
      "stroke",
      "pola makan sehat",
      "aktivitas fisik",
      "pengobatan",
      "pemantauan kadar gula darah",
      "gaya hidup aktif",
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
          src="/images/content/diabetes.jpg"
          alt="Diabetes Melitus"
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

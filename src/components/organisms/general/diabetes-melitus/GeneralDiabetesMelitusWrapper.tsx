import Image from "next/image";

export default function GeneralDiabetesMelitusWrapper() {
  return (
    <div className="space-y-4 text-justify">
      <Image
        src={"/images/content/capd.jpeg"}
        alt="Diabetes Melitus"
        width={1000}
        height={1000}
        loading="lazy"
        className="rounded-xl md:max-w-[700px]"
      />
      <div>
        Diabetes Melitus adalah gangguan metabolik kronis yang ditandai dengan peningkatan kadar gula darah (glukosa) akibat gangguan produksi atau kerja insulin. Kondisi ini dapat menyebabkan komplikasi serius jika tidak dikelola dengan baik.
      </div>
      <div>
        Terdapat dua jenis utama: Diabetes Tipe 1, yang umumnya terjadi pada anak-anak atau dewasa muda dan membutuhkan insulin seumur hidup, serta Diabetes Tipe 2, yang sering dikaitkan dengan gaya hidup tidak sehat dan dapat dikelola melalui perubahan pola makan, olahraga, dan obat oral.
      </div>
      <div>
        Gejala umum meliputi sering buang air kecil, rasa haus berlebihan, penurunan berat badan tanpa sebab, dan kelelahan. Namun, pada banyak kasus, diabetes berkembang secara perlahan tanpa gejala yang jelas pada awalnya.
      </div>
      <div>
        Pencegahan dan pengelolaan diabetes dilakukan melalui pola makan seimbang, aktivitas fisik rutin, pemantauan kadar gula darah, serta kepatuhan terhadap pengobatan. Deteksi dini dan edukasi berperan penting untuk mencegah komplikasi seperti kerusakan ginjal, saraf, mata, dan jantung.
      </div>
    </div>
  );
}

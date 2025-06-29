import Image from "next/image";

export default function GeneralPGKWrapper() {
  return (
    <div className="flex flex-col gap-8">
      <Image
        src={"/images/content/pgk.jpg"}
        alt="Penyakit Ginjal Kronik"
        width={1000}
        height={1000}
        loading="lazy"
        className="rounded-xl md:max-w-[700px]"
      />
      <div className="text-justify">
        Penyakit ginjal kronis (PGK) adalah gangguan fungsi ginjal progresif
        yang tidak dapat pulih, menyebabkan tubuh gagal menjaga keseimbangan
        metabolisme, cairan, dan elektrolit. Penyakit ginjal kronis (PGK) adalah
        penurunan fungsi ginjal yang berlangsung lebih dari tiga bulan, ditandai
        oleh LFG kurang dari 60 ml/menit. Riskesdas pada tahun 2018 mendata
        jumlah pasien yang terdiagnosis dengan gagal ginjal kronis di Indonesia
        tercatat sebanyak 713.783 orang. Tingkat provinsi Jawa Tengah memiliki
        prevalensi penyakit ginjal yang mencapai 0,42%, dengan total penderita
        sebanyak 96.794 orang. Penderita penyakit ginjal kronis biasanya akan
        melakukan penanganan terapi pengganti ginjal seperti Hemodialisis atau
        Continuous Ambulatory Peritoneal Dialysis (CAPD).
      </div>
      <div className="text-justify">
        PGK seringkali berkembang secara perlahan dan tidak menunjukkan gejala
        pada tahap awal, sehingga banyak penderita yang baru mengetahui kondisi
        ini ketika sudah memasuki tahap lanjut. Gejala umum yang dapat muncul
        antara lain kelelahan, pembengkakan di tangan dan kaki, perubahan
        frekuensi buang air kecil, dan tekanan darah tinggi. Faktor risiko utama
        dari PGK meliputi diabetes melitus, hipertensi, riwayat penyakit ginjal
        dalam keluarga, serta gaya hidup yang tidak sehat seperti merokok,
        konsumsi alkohol, dan pola makan tinggi garam. Penting untuk melakukan
        skrining dan pemeriksaan rutin, terutama bagi individu dengan risiko
        tinggi, untuk mencegah progresivitas penyakit.
      </div>
      <div className="text-justify">
        Penanganan PGK memerlukan pendekatan multidisiplin yang mencakup
        pengelolaan penyakit penyerta, pengaturan pola makan rendah protein dan
        garam, serta pemantauan fungsi ginjal secara berkala. Pada tahap akhir,
        pasien PGK biasanya membutuhkan terapi pengganti ginjal seperti
        hemodialisis yang dilakukan beberapa kali dalam seminggu, CAPD yang
        dapat dilakukan secara mandiri di rumah, atau transplantasi ginjal jika
        tersedia donor yang cocok. Pencegahan dan edukasi masyarakat mengenai
        pentingnya menjaga kesehatan ginjal, seperti dengan cukup minum air
        putih, menghindari penggunaan obat-obatan tanpa resep secara berlebihan,
        serta menjaga tekanan darah dan gula darah tetap stabil, merupakan
        langkah krusial dalam menekan angka kejadian PGK di Indonesia.
      </div>
    </div>
  );
}

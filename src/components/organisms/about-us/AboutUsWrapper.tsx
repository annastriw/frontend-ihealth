import Image from "next/image";

export default function AboutUsWrapper() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-center">
        <Image
          src={"/images/assets/bg-about-us.png"}
          alt="iHealth Edu"
          width={1000}
          height={1000}
          className="h-30 w-auto md:h-50"
        />
      </div>
      <div className="space-y-4">
        <p>
          iHealth Edu adalah platform edukasi digital yang bertujuan untuk meningkatkan
          literasi masyarakat dalam bidang kesehatan, khususnya mengenai Hipertensi,
          Diabetes Melitus, dan Kesehatan Mental. Website ini menyediakan informasi yang
          akurat, mudah dipahami, dan berbasis ilmu keperawatan serta psikologi.
        </p>
        <p>
          Melalui artikel, video, dan modul interaktif, iHealth Edu hadir sebagai sarana
          pembelajaran dan pemberdayaan bagi pasien, keluarga, maupun masyarakat umum
          agar lebih peduli terhadap kondisi kesehatan diri dan lingkungan sekitar.
        </p>
        <p>
          Website ini dikembangkan oleh <strong>Tim KKN IDBU-26 Universitas Diponegoro </strong>
          sebagai bentuk kontribusi nyata dalam mendukung edukasi kesehatan berbasis komunitas.
          Dengan pendekatan interdisipliner dan kolaboratif, tim kami berkomitmen untuk
          menyajikan konten yang informatif, relevan, dan berdampak positif bagi masyarakat.
        </p>
        <p>
          Kami percaya bahwa edukasi adalah langkah awal menuju kehidupan yang lebih sehat,
          seimbang, dan bermakna. Bersama iHealth Edu, mari wujudkan masyarakat yang lebih
          sadar, peduli, dan tangguh dalam menghadapi tantangan kesehatan modern.
        </p>
        <p>Kami belajar, kami berbagi, kami peduli.</p>
      </div>
    </div>
  );
}

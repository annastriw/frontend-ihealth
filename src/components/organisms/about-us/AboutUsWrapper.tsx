import Image from "next/image";

export default function AboutUsWrapper() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-center">
        <Image
          src={"/images/assets/bg-about-us.png"}
          alt="Universitas Diponegoro"
          width={1000}
          height={1000}
          className="h-30 w-auto md:h-50"
        />
      </div>
      <div className="space-y-4">
        <p>
          Dialisis Connect adalah platform edukasi dan komunitas untuk pasien
          hemodialisis, keluarga, serta tenaga kesehatan. Kami menyediakan
          informasi seputar perawatan ginjal, gaya hidup sehat, dan dukungan
          emosional melalui video, artikel, dan forum interaktif.
        </p>
        <p>
          Website ini dikelola oleh Departemen Ilmu Keperawatan dan Departemen
          Teknik Komputer Universitas Diponegoro, bekerja sama dengan Ikatan
          Perawat Dialisis Indonesia (IPDI) Jawa Tengah.
        </p>
        <p>
          Kami percaya bahwa setiap pasien berhak mendapatkan edukasi yang mudah
          dipahami dan dukungan yang bermakna. Bersama Dialisis Connect, kita
          saling terhubung, saling menguatkan.
        </p>
        <p>Kami terhubung, kami peduli.</p>
      </div>
    </div>
  );
}

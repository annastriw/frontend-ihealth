import Image from "next/image";

export default function GeneralHipertensiWrapper() {
  return (
    <div className="space-y-4 text-justify">
      <Image
        src={"/images/content/pgk.jpg"}
        alt="Hipertensi"
        width={1000}
        height={1000}
        loading="lazy"
        className="rounded-xl md:max-w-[700px]"
      />
      <div>
        Hipertensi, atau tekanan darah tinggi, adalah kondisi medis kronis di mana tekanan darah terhadap dinding arteri meningkat secara terus-menerus. Kondisi ini sering disebut sebagai "silent killer" karena sering tidak menunjukkan gejala namun dapat menyebabkan komplikasi serius.
      </div>
      <div>
        Jika tidak dikendalikan, hipertensi dapat meningkatkan risiko penyakit jantung, stroke, gagal ginjal, dan masalah kesehatan lainnya. Faktor penyebabnya meliputi gaya hidup tidak sehat, konsumsi garam berlebih, obesitas, kurang olahraga, stres, serta faktor genetik.
      </div>
      <div>
        Pencegahan dan pengelolaan hipertensi dapat dilakukan melalui pola hidup sehat seperti membatasi asupan garam dan lemak, memperbanyak konsumsi buah dan sayuran, rutin berolahraga, menghindari rokok dan alkohol, serta mengelola stres dengan baik.
      </div>
      <div>
        Bagi individu dengan tekanan darah tinggi, pengobatan medis dan pemantauan rutin oleh tenaga kesehatan sangat penting untuk mencegah komplikasi jangka panjang dan menjaga kualitas hidup tetap baik.
      </div>
    </div>
  );
}

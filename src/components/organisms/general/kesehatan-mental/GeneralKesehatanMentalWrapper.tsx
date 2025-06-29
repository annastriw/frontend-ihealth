import Image from "next/image";

export default function GeneralKesehatanMentalWrapper() {
  return (
    <div className="space-y-4 text-justify">
      <Image
        src={"/images/content/hd.jpg"}
        alt="Kesehatan Mental"
        width={1000}
        height={1000}
        loading="lazy"
        className="rounded-xl md:max-w-[700px]"
      />
      <div>
        Kesehatan mental merupakan kondisi kesejahteraan emosional, psikologis, dan sosial seseorang. Ini memengaruhi cara berpikir, merasa, dan bertindak dalam menghadapi kehidupan sehari-hari. Menjaga kesehatan mental penting untuk membentuk hubungan yang sehat, mengambil keputusan, serta menangani stres.
      </div>
      <div>
        Gangguan kesehatan mental seperti depresi, kecemasan, dan stres berkepanjangan dapat berdampak buruk pada kualitas hidup seseorang. Faktor penyebabnya bisa berasal dari tekanan hidup, trauma, gangguan biologis, atau kurangnya dukungan sosial.
      </div>
      <div>
        Untuk menjaga kesehatan mental, penting untuk menerapkan gaya hidup seimbang, tidur cukup, makan dengan gizi baik, rutin berolahraga, dan tidak ragu mencari bantuan profesional seperti psikolog atau konselor bila dibutuhkan.
      </div>
      <div>
        Kesehatan mental adalah bagian tak terpisahkan dari kesehatan secara keseluruhan. Dengan menjaga kondisi mental yang baik, seseorang dapat lebih mudah menghadapi tantangan hidup, mengelola emosi, dan meningkatkan kualitas hubungan dengan orang lain.
      </div>
    </div>
  );
}

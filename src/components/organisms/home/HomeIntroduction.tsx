import SectionTitle from "@/components/atoms/typography/SectionTitle";
import CardIntroduction from "@/components/molecules/card/CardIntroduction";

export default function HomeIntroduction() {
  return (
    <div className="space-y-12">
      <SectionTitle title="Penjelasan Secara Umum" />
      <div className="flex grid grid-cols-1 place-items-center items-center justify-center">
        <CardIntroduction
          title="Hipertensi"
          description="Hipertensi atau tekanan darah tinggi adalah kondisi ketika tekanan darah terhadap dinding arteri meningkat secara kronis. Jika tidak dikendalikan, hipertensi dapat meningkatkan risiko penyakit jantung, stroke, dan komplikasi lainnya. Pencegahan dapat dilakukan dengan pola makan sehat, olahraga, dan manajemen stres."
          href="/general/hipertensi"
        />
      </div>
      <div className="flex grid grid-cols-1 place-items-center items-center justify-center gap-10 md:grid-cols-2">
        <CardIntroduction
          title="Diabetes Melitus"
          description="Diabetes Melitus adalah gangguan metabolik yang ditandai dengan kadar gula darah yang tinggi akibat gangguan produksi atau kerja insulin. Jika tidak terkontrol, diabetes dapat menyebabkan komplikasi serius pada jantung, ginjal, mata, dan saraf. Edukasi dan pengelolaan gaya hidup sangat penting dalam penanganannya."
          href="/general/diabetes-melitus"
        />
        <CardIntroduction
          title="Kesehatan Mental"
          description="Kesehatan mental mencakup kondisi emosional, psikologis, dan sosial seseorang. Gangguan seperti stres berat, depresi, dan kecemasan dapat memengaruhi kualitas hidup. Penting untuk mengenali tanda-tandanya dan mencari bantuan profesional ketika dibutuhkan. Dukungan keluarga dan lingkungan juga berperan besar."
          href="/general/kesehatan-mental"
        />
      </div>
    </div>
  );
}

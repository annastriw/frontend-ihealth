import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function DashboardGeneral() {
  return (
    <div>
      <Tabs defaultValue="hipertensi" className="w-full">
        <TabsList className="mb-4 grid w-fit grid-cols-3">
          <TabsTrigger value="hipertensi">
            <span className="block md:hidden">Hipertensi</span>
            <span className="hidden md:block">Penjelasan Hipertensi</span>
          </TabsTrigger>
          <TabsTrigger value="diabetes">
            <span className="block md:hidden">Diabetes</span>
            <span className="hidden md:block">Penjelasan Diabetes Melitus</span>
          </TabsTrigger>
          <TabsTrigger value="mental">
            <span className="block md:hidden">Mental</span>
            <span className="hidden md:block">Penjelasan Kesehatan Mental</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hipertensi">
          <div className="space-y-4 text-justify">
            <Image
              src={"/images/content/hipertensi.jpg"}
              alt="Hipertensi"
              width={1000}
              height={1000}
              loading="lazy"
              className="rounded-xl md:max-w-[700px]"
            />
            <div>
              Hipertensi adalah kondisi ketika tekanan darah dalam arteri meningkat secara kronis. Ini sering disebut sebagai “silent killer” karena dapat tidak menunjukkan gejala tetapi menyebabkan komplikasi serius seperti penyakit jantung, stroke, dan gagal ginjal.
            </div>
            <div>
              Faktor risiko hipertensi meliputi pola makan tinggi garam, kurang aktivitas fisik, stres, merokok, dan faktor genetik. Hipertensi dapat dicegah dan dikontrol dengan perubahan gaya hidup sehat serta pengobatan jika diperlukan.
            </div>
            <div>
              Pemantauan tekanan darah secara rutin, mengurangi asupan garam, menjaga berat badan ideal, serta mengelola stres merupakan bagian penting dari pencegahan dan penanganan hipertensi.
            </div>
          </div>
        </TabsContent>

        <TabsContent value="diabetes">
          <div className="space-y-4 text-justify">
            <Image
              src={"/images/content/diabetes.jpg"}
              alt="Diabetes Melitus"
              width={1000}
              height={1000}
              loading="lazy"
              className="rounded-xl md:max-w-[700px]"
            />
            <div>
              Diabetes Melitus adalah gangguan metabolik kronis yang ditandai dengan tingginya kadar gula darah. Ini terjadi karena gangguan produksi insulin atau resistensi terhadap insulin.
            </div>
            <div>
              Terdapat dua tipe utama: Diabetes Tipe 1 yang biasanya terjadi sejak anak-anak dan membutuhkan insulin seumur hidup, serta Diabetes Tipe 2 yang umumnya terjadi karena pola hidup tidak sehat.
            </div>
            <div>
              Manajemen diabetes melibatkan pola makan sehat, aktivitas fisik teratur, pengendalian berat badan, serta pemantauan kadar glukosa darah secara berkala. Pencegahan komplikasi memerlukan edukasi dan perawatan jangka panjang.
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mental">
          <div className="space-y-4 text-justify">
            <Image
              src={"/images/content/mental-health.jpg"}
              alt="Kesehatan Mental"
              width={1000}
              height={1000}
              loading="lazy"
              className="rounded-xl md:max-w-[700px]"
            />
            <div>
              Kesehatan mental adalah kondisi kesejahteraan emosional, psikologis, dan sosial seseorang. Hal ini memengaruhi cara berpikir, merasa, bertindak, serta bagaimana seseorang mengelola stres dan berinteraksi dengan orang lain.
            </div>
            <div>
              Gangguan kesehatan mental seperti depresi, kecemasan, dan stres kronis dapat berdampak negatif terhadap kualitas hidup. Faktor risiko meliputi tekanan hidup, trauma, isolasi sosial, serta kurangnya dukungan.
            </div>
            <div>
              Menjaga kesehatan mental dapat dilakukan melalui komunikasi terbuka, aktivitas fisik, tidur cukup, dan mencari bantuan profesional saat dibutuhkan. Masyarakat perlu meningkatkan kesadaran dan empati terhadap isu kesehatan mental.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

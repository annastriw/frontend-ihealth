"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function DashboardGeneral() {
  return (
    <section className="w-full px-4 py-10 md:px-12 lg:px-32 xl:px-52 2xl:px-64 bg-white">
      <Tabs defaultValue="hipertensi" className="w-full">
        {/* Tabs Trigger */}
        <TabsList className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-3 rounded-xl bg-gray-100 px-4 py-2 shadow-md backdrop-blur-sm">
          {[
            { value: "hipertensi", short: "Hipertensi", full: "Penjelasan Hipertensi" },
            { value: "diabetes", short: "Diabetes", full: "Penjelasan Diabetes Melitus" },
            { value: "mental", short: "Mental", full: "Penjelasan Kesehatan Mental" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-md px-5 py-2 text-sm font-semibold text-black transition-all duration-200 hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:text-black"
            >
              <span className="block md:hidden">{tab.short}</span>
              <span className="hidden md:block">{tab.full}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* HIPERTENSI */}
        <TabsContent value="hipertensi">
          <article className="space-y-6 px-2 md:px-4 text-justify leading-relaxed tracking-wide text-gray-800">
            <Image
              src="/images/content/hipertensi.jpg"
              alt="Hipertensi"
              width={1200}
              height={800}
              className="mx-auto rounded-xl shadow-lg"
            />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
  Apa Itu Hipertensi?
</h2>

            <p>
              Hipertensi, atau tekanan darah tinggi, adalah kondisi kronis di mana tekanan darah terhadap dinding arteri meningkat. Sering kali disebut “silent killer” karena tidak memiliki gejala yang nyata.
            </p>
            <p>
              Jika dibiarkan, hipertensi dapat memicu komplikasi serius seperti stroke, penyakit jantung, dan gagal ginjal. Nilai tekanan darah ≥140/90 mmHg dianggap sebagai hipertensi.
            </p>
            <h3 className="text-xl font-semibold">Pencegahan dan Pengelolaan</h3>
            <ul className="list-disc list-inside mt-2">
              <li>Konsumsi makanan rendah garam dan lemak</li>
              <li>Olahraga teratur minimal 30 menit per hari</li>
              <li>Kelola stres dengan teknik relaksasi</li>
              <li>Hindari merokok dan alkohol</li>
              <li>Rutin memeriksa tekanan darah</li>
            </ul>
          </article>
        </TabsContent>

        {/* DIABETES */}
        <TabsContent value="diabetes">
          <article className="space-y-6 px-2 md:px-4 text-justify leading-relaxed tracking-wide text-gray-800">
            <Image
              src="/images/content/diabetes.jpg"
              alt="Diabetes Melitus"
              width={1200}
              height={800}
              className="mx-auto rounded-xl shadow-lg"
            />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
  Apa Itu Diabetes Melitus?
</h2>

            <p>
              Diabetes Melitus adalah penyakit kronis yang ditandai dengan kadar gula darah tinggi. Terjadi karena tubuh tidak memproduksi atau tidak dapat menggunakan insulin dengan efektif.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600">
              “Gula darah yang tidak terkontrol dapat menyebabkan kerusakan jangka panjang pada berbagai organ vital.”
            </blockquote>
            <p>
              Ada dua tipe utama:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li><strong>Tipe 1:</strong> Tidak ada produksi insulin (umumnya sejak kecil)</li>
              <li><strong>Tipe 2:</strong> Produksi atau penggunaan insulin tidak efektif</li>
            </ul>

            <h3 className="text-xl font-semibold">Tips Menjaga Gula Darah</h3>
            <ul className="list-disc list-inside mt-2">
              <li>Konsumsi makanan berserat tinggi</li>
              <li>Aktivitas fisik secara teratur</li>
              <li>Kontrol gula darah harian</li>
              <li>Minum obat sesuai resep dokter</li>
              <li>Hindari stres dan tidur cukup</li>
            </ul>
          </article>
        </TabsContent>

        {/* KESEHATAN MENTAL */}
        <TabsContent value="mental">
          <article className="space-y-6 px-2 md:px-4 text-justify leading-relaxed tracking-wide text-gray-800">
            <Image
              src="/images/content/mental-health.jpg"
              alt="Kesehatan Mental"
              width={1200}
              height={800}
              className="mx-auto rounded-xl shadow-lg"
            />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
  Mengapa Kesehatan Mental Penting?
</h2>

            <p>
              Kesehatan mental memengaruhi cara kita berpikir, merasa, dan bertindak. Hal ini mencakup kesejahteraan emosional, psikologis, dan sosial.
            </p>
            <p>
              Gangguan mental seperti depresi dan kecemasan dapat dipicu oleh tekanan hidup, konflik, trauma, atau ketidakseimbangan biologis. Menjaga keseimbangan mental sama pentingnya dengan fisik.
            </p>

            <h3 className="text-xl font-semibold">Cara Menjaga Kesehatan Mental</h3>
            <ul className="list-disc list-inside mt-2">
              <li>Lakukan aktivitas menyenangkan secara rutin</li>
              <li>Tidur cukup dan teratur</li>
              <li>Jaga koneksi sosial</li>
              <li>Hindari isolasi dan cari bantuan profesional bila perlu</li>
              <li>Berlatih mindfulness atau meditasi</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Dukungan sosial dan akses ke layanan psikolog adalah kunci menjaga stabilitas emosional.
            </p>
          </article>
        </TabsContent>
      </Tabs>
    </section>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function DashboardGeneral() {
  return (
    <div>
      <Tabs defaultValue="pgk" className="w-full">
        <TabsList className="mb-4 grid w-fit grid-cols-3">
          <TabsTrigger value="pgk">
            <span className="block md:hidden">PGK</span>
            <span className="hidden md:block">Penyakit Ginjal Kronik</span>
          </TabsTrigger>
          <TabsTrigger value="capd">
            <span className="block md:hidden">CAPD</span>
            <span className="hidden md:block">Penjelasan CAPD</span>
          </TabsTrigger>
          <TabsTrigger value="hd">
            <span className="block md:hidden">HD</span>
            <span className="hidden md:block">Penjelasan HD</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pgk">
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
              Penyakit ginjal kronis (PGK) adalah gangguan fungsi ginjal
              progresif yang tidak dapat pulih, menyebabkan tubuh gagal menjaga
              keseimbangan metabolisme, cairan, dan elektrolit. Penyakit ginjal
              kronis (PGK) adalah penurunan fungsi ginjal yang berlangsung lebih
              dari tiga bulan, ditandai oleh LFG kurang dari 60 ml/menit.
              Riskesdas pada tahun 2018 mendata jumlah pasien yang terdiagnosis
              dengan gagal ginjal kronis di Indonesia tercatat sebanyak 713.783
              orang. Tingkat provinsi Jawa Tengah memiliki prevalensi penyakit
              ginjal yang mencapai 0,42%, dengan total penderita sebanyak 96.794
              orang. Penderita penyakit ginjal kronis biasanya akan melakukan
              penanganan terapi pengganti ginjal seperti Hemodialisis atau
              Continuous Ambulatory Peritoneal Dialysis (CAPD).
            </div>
            <div className="text-justify">
              PGK seringkali berkembang secara perlahan dan tidak menunjukkan
              gejala pada tahap awal, sehingga banyak penderita yang baru
              mengetahui kondisi ini ketika sudah memasuki tahap lanjut. Gejala
              umum yang dapat muncul antara lain kelelahan, pembengkakan di
              tangan dan kaki, perubahan frekuensi buang air kecil, dan tekanan
              darah tinggi. Faktor risiko utama dari PGK meliputi diabetes
              melitus, hipertensi, riwayat penyakit ginjal dalam keluarga, serta
              gaya hidup yang tidak sehat seperti merokok, konsumsi alkohol, dan
              pola makan tinggi garam. Penting untuk melakukan skrining dan
              pemeriksaan rutin, terutama bagi individu dengan risiko tinggi,
              untuk mencegah progresivitas penyakit.
            </div>
            <div className="text-justify">
              Penanganan PGK memerlukan pendekatan multidisiplin yang mencakup
              pengelolaan penyakit penyerta, pengaturan pola makan rendah
              protein dan garam, serta pemantauan fungsi ginjal secara berkala.
              Pada tahap akhir, pasien PGK biasanya membutuhkan terapi pengganti
              ginjal seperti hemodialisis yang dilakukan beberapa kali dalam
              seminggu, CAPD yang dapat dilakukan secara mandiri di rumah, atau
              transplantasi ginjal jika tersedia donor yang cocok. Pencegahan
              dan edukasi masyarakat mengenai pentingnya menjaga kesehatan
              ginjal, seperti dengan cukup minum air putih, menghindari
              penggunaan obat-obatan tanpa resep secara berlebihan, serta
              menjaga tekanan darah dan gula darah tetap stabil, merupakan
              langkah krusial dalam menekan angka kejadian PGK di Indonesia.
            </div>
          </div>
        </TabsContent>
        <TabsContent value="capd">
          <div className="space-y-4 text-justify">
            <Image
              src={"/images/content/capd.jpeg"}
              alt="CAPD"
              width={1000}
              height={1000}
              loading="lazy"
              className="rounded-xl md:max-w-[700px]"
            />
            <div>
              Continuous Ambulatory Peritoneal Dialysis (CAPD) merupakan jenis
              dialisis yang menggunakan membran peritoneal sebagai membran
              semipermeabel.(18) Metode CAPD dilakukan dengan menggunakan
              permukaan peritoneum yang luasnya 22.000 cm2 sebagai permukaan
              difusi.
            </div>
            <div>
              Metode CAPD dilakukan dengan cara mengalirkan cairan pembersih
              melalui kateter ke bagian perut, kemudian lapisan perut
              (peritoneum) akan menyaring dan membuang sisa produk yang tidak
              digunakan kembali oleh darah. Kemudian, dalam beberapa saat cairan
              yang mengandung limbah yang telah disaring akan mengalir keluar
              dan dapat dibuang. Metode CAPD dilakukan dengan cara memasukkan
              cairan dialisis ke dalam tubuh pasien sebanyak 2 liter, melalui
              kateter yang telah dipasang permanen di dalam perut pasien. Zat
              sisa yang tersebar dalam tubuh seperti urea, vitamin K, serta
              elektrolit yang berlebih akan menuju cairan dialisis yang kemudian
              akan dialirkan dan keluar serta diganti beberapa kali dalam
              sehari.
            </div>
            <div>
              Metode CAPD sebagai salah satu terapi pengganti ginjal dapat
              diberikan dengan aman dan efektif dilakukan dimana saja dengan
              mekanisme memasukkan cairan dialisat ke dalam rongga peritoneal
              dengan melalui kateter serta kantung yang terbagi menjadi dua
              yaitu kantung untung cairan masuk (dialisat solution) dan kantong
              pembuangan (drainage bag) dari peritoneal. Proses pemasukan cairan
              dialisat biasanya berlangsung selama 20-30 menit, kemudian
              dibiarkan selama 4-6 jam (dwelling time) bergantung pada
              konsentrasi cairan untuk mencapai keseimbangan. Selama fase
              dwelling time akan terjadi proses pertukaran dari cairan dialisat
              kotor menjadi cairan dialisat yang bersih melalui difusi, osmosis,
              dan transpor aktif. Walaupun memiliki keunggulan dari aspek
              kemudahan jika dibandingkan dengan terapi gagal ginjal lainnya,
              penggunaan terapi CAPD harus tetap mengedepankan tempat yang
              bersih untuk menukar cairan dialisis karena rentan adanya
              kontaminasi bakteri yang dapat menimbulkan infeksi maupun
              komplikasi jika tidak ditangani dengan baik.
            </div>
          </div>
        </TabsContent>
        <TabsContent value="hd">
          <div className="space-y-4 text-justify">
            <Image
              src={"/images/content/hd.jpg"}
              alt="Hemodialisis"
              width={1000}
              height={1000}
              loading="lazy"
              className="rounded-xl md:max-w-[700px]"
            />
            <div>
              Hemodialisis adalah suatu prosedur medis yang dilakukan oleh
              tenaga kesehatan untuk mengatasi gangguan fungsi ginjal pada
              individu yang didiagnosis mengalami masalah. Prosedur ini
              bertujuan untuk menggantikan fungsi ginjal dengan melibatkan
              proses difusi, osmosis, dan ultrafiltrasi.1 Hemodialisis merupakan
              terapi pengganti fungsi ginjal pada pasien dengan gagal ginjal
              kronis maupun akut. Terapi ini bertujuan untuk mengeliminasi
              zat-zat sisa metabolisme yang bersifat toksik, mengurangi
              kelebihan cairan tubuh, serta mengoreksi ketidakseimbangan
              elektrolit. Proses ini dilakukan melalui mekanisme osmosis dan
              difusi, menggunakan sistem dialisis eksternal maupun internal yang
              berfungsi sebagai ginjal buatan.
            </div>
            <div>
              Hemodialisis berfungsi sebagai terapi pengganti ginjal bagi pasien
              yang mengalami gagal ginjal, dengan tujuan menghilangkan sisa
              toksik, kelebihan cairan, serta memperbaiki ketidakseimbangan
              elektrolit. Proses ini dilakukan dengan menggunakan sistem
              dialisis eksternal maupun internal. Durasi hemodialisis
              disesuaikan dengan kebutuhan masing-masing individu, biasanya
              berlangsung selama 4-5 jam dan dilakukan dua kali dalam seminggu.
            </div>
            <div>
              Proses hemodialisis berfungsi untuk membersihkan darah dari
              akumulasi limbah buangan. Terapi ini digunakan untuk pasien dengan
              gagal ginjal stadium akhir atau pasien yang mengalami kondisi akut
              yang memerlukan dialisis dalam waktu singkat. Pada pasien gagal
              ginjal kronis, hemodialisis dapat mencegah risiko kematian.
              Meskipun demikian, hemodialisis tidak menyembuhkan atau memulihkan
              fungsi ginjal dan tidak dapat menggantikan aktivitas metabolik
              atau endokrin yang biasanya dilakukan oleh ginjal, serta dampaknya
              terhadap kualitas hidup.
            </div>
            <div>
              Tujuan utama dari hemodialisis adalah untuk mengembalikan
              keseimbangan cairan ekstra dan intraseluler yang seharusnya
              dipertahankan oleh ginjal yang sehat. Dalam praktiknya, mesin
              hemodialisis digunakan untuk mengeluarkan sisa metabolisme dalam
              darah seperti air, natrium, kalium, hidrogen, urea, kreatinin,
              asam urat, dan zat lainnya melalui membran semipermeabel yang
              memisahkan darah dari cairan dialisat pada mesin hemodialisis.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

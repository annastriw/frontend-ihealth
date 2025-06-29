import Image from "next/image";

export default function GeneralHemodialisisWrapper() {
  return (
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
        Hemodialisis adalah suatu prosedur medis yang dilakukan oleh tenaga
        kesehatan untuk mengatasi gangguan fungsi ginjal pada individu yang
        didiagnosis mengalami masalah. Prosedur ini bertujuan untuk menggantikan
        fungsi ginjal dengan melibatkan proses difusi, osmosis, dan
        ultrafiltrasi.1 Hemodialisis merupakan terapi pengganti fungsi ginjal
        pada pasien dengan gagal ginjal kronis maupun akut. Terapi ini bertujuan
        untuk mengeliminasi zat-zat sisa metabolisme yang bersifat toksik,
        mengurangi kelebihan cairan tubuh, serta mengoreksi ketidakseimbangan
        elektrolit. Proses ini dilakukan melalui mekanisme osmosis dan difusi,
        menggunakan sistem dialisis eksternal maupun internal yang berfungsi
        sebagai ginjal buatan.
      </div>
      <div>
        Hemodialisis berfungsi sebagai terapi pengganti ginjal bagi pasien yang
        mengalami gagal ginjal, dengan tujuan menghilangkan sisa toksik,
        kelebihan cairan, serta memperbaiki ketidakseimbangan elektrolit. Proses
        ini dilakukan dengan menggunakan sistem dialisis eksternal maupun
        internal. Durasi hemodialisis disesuaikan dengan kebutuhan masing-masing
        individu, biasanya berlangsung selama 4-5 jam dan dilakukan dua kali
        dalam seminggu.
      </div>
      <div>
        Proses hemodialisis berfungsi untuk membersihkan darah dari akumulasi
        limbah buangan. Terapi ini digunakan untuk pasien dengan gagal ginjal
        stadium akhir atau pasien yang mengalami kondisi akut yang memerlukan
        dialisis dalam waktu singkat. Pada pasien gagal ginjal kronis,
        hemodialisis dapat mencegah risiko kematian. Meskipun demikian,
        hemodialisis tidak menyembuhkan atau memulihkan fungsi ginjal dan tidak
        dapat menggantikan aktivitas metabolik atau endokrin yang biasanya
        dilakukan oleh ginjal, serta dampaknya terhadap kualitas hidup.
      </div>
      <div>
        Tujuan utama dari hemodialisis adalah untuk mengembalikan keseimbangan
        cairan ekstra dan intraseluler yang seharusnya dipertahankan oleh ginjal
        yang sehat. Dalam praktiknya, mesin hemodialisis digunakan untuk
        mengeluarkan sisa metabolisme dalam darah seperti air, natrium, kalium,
        hidrogen, urea, kreatinin, asam urat, dan zat lainnya melalui membran
        semipermeabel yang memisahkan darah dari cairan dialisat pada mesin
        hemodialisis.
      </div>
    </div>
  );
}

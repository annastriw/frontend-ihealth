import SectionTitle from "@/components/atoms/typography/SectionTitle";
import CardIntroduction from "@/components/molecules/card/CardIntroduction";

export default function HomeIntroduction() {
  return (
    <div className="space-y-12">
      <SectionTitle title="Penjelasan Secara Umum" />
      <div className="flex grid grid-cols-1 place-items-center items-center justify-center">
        <CardIntroduction
          title="Penyakit Ginjal Kronik"
          description="Penyakit ginjal kronik (PGK) adalah kondisi di mana kerusakan ginjal berlangsung lama dan mengurangi kemampuan ginjal untuk menyaring darah (LFG). Banyak pasien PGK tidak menunjukkan gejala hingga fungsi ginjal menurun di bawah 15%.(1) PGK bersifat progresif dan irreversible, sering memerlukan terapi penggantian ginjal seperti dialisis atau transplantasi. "
          href="/general/penyakit-ginjal-kronik"
        />
      </div>
      <div className="flex grid grid-cols-1 place-items-center items-center justify-center gap-10 md:grid-cols-2">
        <CardIntroduction
          title="CAPD"
          description="Pada perawatan CAPD, pasien penyakit ginjal kronik dipasangkan kateter melalui sayatan kecil di bawah umbilikus. Pemasangan kateter CAPD dilakukan dengan cara memasukkan cairan dialisis dan mengeluarkan effluent, serta keberhasilan perawatan CAPD bergantung pada pencegahan infeksi, kelancaran aliran, dan ketiadaan kebocoran kateter. "
          href="/general/capd"
        />
        <CardIntroduction
          title="Hemodialisis"
          description="Terapi hemodialisis adalah prosedur medis yang membantu menggantikan fungsi ginjal pada pasien penyakit ginjal kronik dengan menyaring darah menggunakan mesin dialisis. Proses ini membersihkan darah dari zat sisa seperti ureum dan kreatinin, serta mengontrol kadar cairan dan elektrolit dalam tubuh. Hemodialisis biasanya dilakukan 2-3 kali seminggu di unit khusus dengan durasi sekitar 4-5 jam per sesi."
          href="/general/hemodialisis"
        />
      </div>
    </div>
  );
}

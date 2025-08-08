import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningHSMBQDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningHSMBQDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening HSMBQ"
        body="Menampilkan informasi lengkap mengenai riwayat screening HSMBQ yang telah dilakukan pasien hipertensi. Paragraf ini memuat detail hasil evaluasi kebiasaan kesehatan dan manajemen tekanan darah secara menyeluruh untuk membantu pemantauan kondisi pasien."
      />
      <DashboardHistoryScreeningHSMBQDetailWrapper id={id} />
    </section>
  );
}

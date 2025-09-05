import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalHistoryScreeningHSMBQDetailWrapper from "@/components/organisms/dashboard/medical/reports/history/screening-hsmbq/DashboardMedicalHistoryScreeningHSMBQDetailWrapper";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening HSMBQ"
        body="Menampilkan informasi lengkap mengenai riwayat screening HSMBQ yang telah dilakukan oleh pasien hipertensi. Halaman ini memuat detail hasil evaluasi kebiasaan kesehatan dan manajemen tekanan darah secara menyeluruh untuk membantu pemantauan kondisi pasien."
      />
      <DashboardMedicalHistoryScreeningHSMBQDetailWrapper id={id} />
    </section>
  );
}

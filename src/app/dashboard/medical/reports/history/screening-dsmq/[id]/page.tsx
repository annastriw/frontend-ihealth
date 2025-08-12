import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalHistoryScreeningDSMQDetailWrapper from "@/components/organisms/dashboard/medical/reports/history/screening-dsmq/DashboardMedicalHistoryScreeningDSMQDetailWrapper";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DSMQ Medis"
        body="Menampilkan informasi lengkap mengenai riwayat screening DSMQ yang telah dilakukan oleh pasien diabetes. Halaman ini berisi detail hasil evaluasi manajemen diabetes secara menyeluruh untuk membantu pemantauan dan pengendalian kondisi kesehatan pasien."
      />
      <DashboardMedicalHistoryScreeningDSMQDetailWrapper id={id} />
    </section>
  );
}


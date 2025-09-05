import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalHistoryScreeningDASSDetailWrapper from "@/components/organisms/dashboard/medical/reports/history/screening-dass/DashboardMedicalHistoryScreeningDASSDetailWrapper";

interface PageProps {
  params: Promise<{id: string}>
}

export default async function Page({ params }: PageProps) {
  const { id } =  await params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DASS-21"
        body="Menampilkan informasi lengkap mengenai riwayat screening DASS-21 yang telah dilakukan oleh pengguna. Halaman ini berisi detail hasil evaluasi yang membantu memahami kondisi psikologis berdasarkan tes DASS-21 secara menyeluruh dan terperinci."
      />
      <DashboardMedicalHistoryScreeningDASSDetailWrapper id={id} />
    </section>
  );
}

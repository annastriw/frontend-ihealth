// src/app/dashboard/admin/reports/history/screening-hsmbq/[id]/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminHistoryScreeningHSMBQDetailWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-hsmbq/DashboardAdminHistoryScreeningHSMBQDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening HSMBQ"
        body="Menampilkan informasi lengkap mengenai riwayat screening HSMBQ yang telah dilakukan pasien hipertensi. Paragraf ini memuat detail hasil evaluasi kebiasaan kesehatan dan manajemen tekanan darah secara menyeluruh untuk membantu pemantauan kondisi pasien."
      />
      <DashboardAdminHistoryScreeningHSMBQDetailWrapper id={id} />
    </section>
  );
}

// src/app/dashboard/admin/reports/history/screening-dsmq/[id]/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminHistoryScreeningDSMQDetailWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-dsmq/DashboardAdminHistoryScreeningDSMQDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DSMQ"
        body="Menampilkan informasi lengkap mengenai riwayat screening DSMQ yang telah dilakukan oleh pasien diabetes. Halaman ini berisi detail hasil evaluasi manajemen diabetes secara menyeluruh untuk membantu pemantauan dan pengendalian kondisi kesehatan pasien."
      />
      <DashboardAdminHistoryScreeningDSMQDetailWrapper id={id} />
    </section>
  );
}
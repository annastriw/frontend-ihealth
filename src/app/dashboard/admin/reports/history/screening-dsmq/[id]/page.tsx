// src/app/dashboard/admin/reports/history/screening-dsmq/[id]/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminHistoryScreeningDSMQDetailWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-dsmq/DashboardAdminHistoryScreeningDSMQDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DSMQ"
        body="Menampilkan detail riwayat screening DSMQ"
      />
      <DashboardAdminHistoryScreeningDSMQDetailWrapper id={id} />
    </section>
  );
}

// src/app/dashboard/history/screening-dsmq/[id]/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningDSMQDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningDSMQDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DSMQ"
        body="Menampilkan detail riwayat screening DSMQ (Manajemen Diabetes)"
      />
      <DashboardHistoryScreeningDSMQDetailWrapper id={id} />
    </section>
  );
}

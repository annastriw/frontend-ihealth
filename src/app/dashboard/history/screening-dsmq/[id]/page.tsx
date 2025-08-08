// src/app/dashboard/history/screening-dsmq/[id]/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningDSMQDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningDSMQDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DSMQ"
        body="Menampilkan informasi lengkap mengenai riwayat screening DSMQ yang telah dilakukan oleh pasien diabetes. Paragraf ini berisi detail hasil evaluasi manajemen diabetes secara menyeluruh untuk membantu pemantauan dan pengendalian kondisi kesehatan pasien."
      />
      <DashboardHistoryScreeningDSMQDetailWrapper id={id} />
    </section>
  );
}

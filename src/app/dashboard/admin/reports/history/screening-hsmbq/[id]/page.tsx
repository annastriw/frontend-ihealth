// src/app/dashboard/admin/reports/history/screening-hsmbq/[id]/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminHistoryScreeningHSMBQDetailWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-hsmbq/DashboardAdminHistoryScreeningHSMBQDetailWrapper";

interface Params {
  params: {
    id: string;
  };
}

export default function Page({ params }: Params) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening HSMBQ"
        body="Menampilkan detail riwayat screening HSMBQ"
      />
      <DashboardAdminHistoryScreeningHSMBQDetailWrapper id={id} />
    </section>
  );
}

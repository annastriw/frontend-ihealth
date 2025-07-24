// src/app/dashboard/admin/reports/history/screening-hsmbq/[id]/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminHistoryScreeningHSMBQDetailWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-hsmbq/DashboardAdminHistoryScreeningHSMBQDetailWrapper";

// tambahkan ini untuk memastikan dynamic routing aman
export const dynamicParams = true;

export default async function Page({ params }: { params: { id: string } }) {
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

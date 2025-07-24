// src/app/dashboard/admin/reports/history/screening-dsmq/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportHistoryScreeningDSMQWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-dsmq/DashboardAdminReportHistoryScreeningDSMQWrapper";

export default function DashboardAdminReportHistoryScreeningDSMQPage() {
  return (
    <section>
      <DashboardTitle
        head="Laporan Screening DSMQ"
        body="Menampilkan daftar hasil screening DSMQ (Manajemen Diabetes) yang telah dikerjakan oleh pengguna"
      />
      <DashboardAdminReportHistoryScreeningDSMQWrapper />
    </section>
  );
}

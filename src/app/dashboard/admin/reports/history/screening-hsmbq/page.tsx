// src/app/dashboard/admin/reports/history/screening-hsmbq/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportHistoryScreeningHSMBQWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-hsmbq/DashboardAdminReportHistoryScreeningHSMBQWrapper";

export default function DashboardAdminReportHistoryScreeningHSMBQPage() {
  return (
    <section>
      <DashboardTitle
        head="Laporan Screening HSMBQ"
        body="Menampilkan daftar hasil screening HSMBQ (Hipertensi) yang telah dikerjakan oleh pengguna"
      />
      <DashboardAdminReportHistoryScreeningHSMBQWrapper />
    </section>
  );
}

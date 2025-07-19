// src/app/dashboard/admin/reports/history/screening-dass/page.tsx

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportHistoryScreeningDASSWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-dass/DashboardAdminReportHistoryScreeningDASSWrapper";

export default function DashboardAdminReportHistoryScreeningDASSPage() {
  return (
    <section>
      <DashboardTitle
        head="Laporan Screening DASS-21"
        body="Menampilkan daftar hasil screening DASS-21 yang telah dikerjakan oleh pengguna"
      />
      <DashboardAdminReportHistoryScreeningDASSWrapper />
    </section>
  );
}

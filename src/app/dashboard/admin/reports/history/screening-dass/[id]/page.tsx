// src/app/dashboard/admin/reports/history/screening-dass/[id]/page.tsx
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminHistoryScreeningDASSDetailWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-dass/DashboardAdminHistoryScreeningDASSDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DASS-21"
        body="Menampilkan detail riwayat screening DASS-21"
      />
      <DashboardAdminHistoryScreeningDASSDetailWrapper id={id} />
    </section>
  );
}

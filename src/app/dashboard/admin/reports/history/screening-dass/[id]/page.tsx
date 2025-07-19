import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminHistoryScreeningDASSDetailWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-dass/DashboardAdminHistoryScreeningDASSDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DASS"
        body="Menampilkan detail riwayat screening DASS"
      />
      <DashboardAdminHistoryScreeningDASSDetailWrapper id={id} />
    </section>
  );
}

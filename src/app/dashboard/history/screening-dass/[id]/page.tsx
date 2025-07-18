import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningDASSDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningDASSDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DASS"
        body="Menampilkan detail riwayat screening DASS"
      />
      <DashboardHistoryScreeningDASSDetailWrapper id={id} />
    </section>
  );
}

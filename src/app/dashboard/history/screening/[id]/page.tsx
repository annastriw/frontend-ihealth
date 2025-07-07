import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening"
        body="Menampilkan detail riwayat screening"
      />
      <DashboardHistoryScreeningDetailWrapper id={id} />
    </section>
  );
}

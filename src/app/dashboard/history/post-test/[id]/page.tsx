import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryPostTestDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryPostTestDetailWrapper";

interface DashboardHistoryPostTestPageParams {
  params: Promise<{ id: string }>;
}

export default async function DashboardHistoryPosTestDetailPage({
  params,
}: DashboardHistoryPostTestPageParams) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Post Test"
        body="Menampilkan detail riwayat post test"
      />
      <DashboardHistoryPostTestDetailWrapper id={id} />
    </section>
  );
}

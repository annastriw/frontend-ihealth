import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningDetailWrapper";

interface DashboardHistoryScreeningDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardHistoryScreeningDetailPage({
  params,
}: DashboardHistoryScreeningDetailPageProps) {
  const { id } = await params;
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

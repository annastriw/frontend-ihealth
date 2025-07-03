import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningDetailWrapper";

interface DashboardHistoryScreeningDetailPageProps {
  params: { id: string };
}

export default function DashboardHistoryScreeningDetailPage({
  params,
}: DashboardHistoryScreeningDetailPageProps) {
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


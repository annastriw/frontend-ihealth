import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryPreTestDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryPreTestDetailWrapper";

interface DashboardHistoryPreTestDetailParams {
  params: Promise<{ id: string }>;
}

export default async function DashboardHistoryPreTestDetailPage({
  params,
}: DashboardHistoryPreTestDetailParams) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Pre Test"
        body="Menampilkan detail riwayat pre test"
      />
      <DashboardHistoryPreTestDetailWrapper id={id} />
    </section>
  );
}

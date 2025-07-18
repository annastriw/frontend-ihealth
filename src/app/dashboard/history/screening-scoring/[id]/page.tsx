//src/app/dashboard/history/screening-scoring/[id]/page.tsx
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningScoringDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningScoringDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening Scoring"
        body="Menampilkan detail riwayat screening scoring"
      />
      <DashboardHistoryScreeningScoringDetailWrapper id={id} />
    </section>
  );
}

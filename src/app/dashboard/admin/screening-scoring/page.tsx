// src/app/dashboard/admin/screening-scoring/page.tsx
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardScreeningScoringWrapper from "@/components/organisms/dashboard/admin/screening-scoring/DashboardScreeningScoringWrapper";

export default function DashboardScreeningScoringPage() {
  return (
    <section>
      <DashboardTitle
        head="Screening Scoring"
        body="Menampilkan daftar screening scoring yang tersedia"
      />
      <DashboardScreeningScoringWrapper />
    </section>
  );
}

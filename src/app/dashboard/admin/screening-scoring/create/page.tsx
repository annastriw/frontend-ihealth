// src/app/dashboard/admin/screening-scoring/create/page.tsx
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardCreateScreeningScoringWrapper from "@/components/organisms/dashboard/admin/screening-scoring/DashboardCreateScreeningScoringWrapper";

export default function DashboardAdminCreateScreeningScoringPage() {
  return (
    <section>
      <DashboardTitle
        head="Tambah Screening Scoring"
        body="Lengkapi form berikut untuk menambahkan screening scoring baru"
      />
      <DashboardCreateScreeningScoringWrapper />
    </section>
  );
}

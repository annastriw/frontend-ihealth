// src/app/dashboard/admin/reports/history/screening-dass/[id]/page.tsx
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminHistoryScreeningDASSDetailWrapper from "@/components/organisms/dashboard/admin/reports/history/screening-dass/DashboardAdminHistoryScreeningDASSDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DASS-21"
        body="Menampilkan informasi lengkap mengenai riwayat screening DASS-21 yang telah dilakukan pengguna. Halaman ini berisi detail hasil evaluasi yang membantu memahami kondisi psikologis berdasarkan tes DASS-21 secara menyeluruh dan terperinci."
      />
      <DashboardAdminHistoryScreeningDASSDetailWrapper id={id} />
    </section>
  );
}

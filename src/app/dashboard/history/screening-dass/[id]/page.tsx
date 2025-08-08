// src/app/dashboard/history/screening-dass/[id]/page.tsx
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningDASSDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningDASSDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DASS-21"
        body="Menampilkan informasi lengkap mengenai riwayat screening DASS-21 yang telah dilakukan pengguna. Paragraf ini berisi detail hasil evaluasi yang membantu memahami kondisi psikologis berdasarkan tes DASS-21 secara menyeluruh dan terperinci."
      />
      <DashboardHistoryScreeningDASSDetailWrapper id={id} />
    </section>
  );
}

// src/app/dashboard/history/screening-dass/[id]/page.tsx
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningDASSDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningDASSDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening DASS-21"
        body="Menampilkan detail riwayat screening DASS-21"
      />
      <DashboardHistoryScreeningDASSDetailWrapper id={id} />
    </section>
  );
}

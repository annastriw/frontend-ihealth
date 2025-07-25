import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryScreeningHSMBQDetailWrapper from "@/components/organisms/dashboard/history/DashboardHistoryScreeningHSMBQDetailWrapper";

export default function Page({ params }: any) {
  const { id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening HSMBQ"
        body="Menampilkan detail riwayat screening HSMBQ (Hipertensi)"
      />
      <DashboardHistoryScreeningHSMBQDetailWrapper id={id} />
    </section>
  );
}

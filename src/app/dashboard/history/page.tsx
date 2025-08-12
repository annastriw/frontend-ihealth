import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryWrapper from "@/components/organisms/dashboard/history/DashboardHistoryWrapper";

export default function HistoryPage() {
  return (
    <section>
      <DashboardTitle
        head="Riwayat"
        body="Lihat catatan lengkap hasil tes dan screening Anda, termasuk DSMQ, HSMBQ, DASS-21, Pre Test, dan Post Test, untuk memantau perkembangan kesehatan dan pembelajaran Anda."
      />
      <DashboardHistoryWrapper />
    </section>
  );
}

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardModulesWrapper from "@/components/organisms/dashboard/modules/DashboardModulesWrapper";

export default function DashboardModulesPage() {
  return (
    <section>
      <DashboardTitle
        head="Modul Materi"
        body="Menampilkan semua modul dan materi"
      />
      <DashboardModulesWrapper />
    </section>
  );
}

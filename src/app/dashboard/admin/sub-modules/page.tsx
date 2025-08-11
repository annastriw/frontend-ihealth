import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminSubModulesWrapper from "@/components/organisms/dashboard/admin/sub-modules/DashboardAdminSubModules";

export default function DashboardAdminSubModulesPage() {
  return (
    <section>
      <DashboardTitle
        head="Materi"
        body="Menampilkan daftar materi dari modul yang tersedia"
      />
      <DashboardAdminSubModulesWrapper />
    </section>
  );
}

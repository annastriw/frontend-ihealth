import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminCreateModuleWrapper from "@/components/organisms/dashboard/admin/modules/DashboardAdminCreateModuleWrapper";

export default function DashboardAdminCreateModule() {
  return (
    <section>
      <DashboardTitle
        head="Tambah Materi Baru"
        body="Lengkapi form berikut untuk menambahkan materi baru"
      />
      <DashboardAdminCreateModuleWrapper />
    </section>
  );
}

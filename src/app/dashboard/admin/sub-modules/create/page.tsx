import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminCreateModuleContentWrapper from "@/components/organisms/dashboard/admin/module-content/DashboardAdminCreateModuleContentWrapper";

export default function DashboardAdminCreateSubModulesPage() {
  return (
    <section>
      <DashboardTitle
        head="Tambah Konten Materi"
        body="Lengkapi form berikut untuk menambahkan konten materi"
      />
      <DashboardAdminCreateModuleContentWrapper />
    </section>
  );
}

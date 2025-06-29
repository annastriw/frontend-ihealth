import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardCreateScreeningWrapper from "@/components/organisms/dashboard/admin/screening/DashboardCreateScreeningWrapper";

export default function DashboardAdminCreateScreeningPage() {
  return (
    <section>
      <DashboardTitle
        head="Tambah Screening"
        body="Lengkapi form berikut untuk menambahkan screening baru"
      />
      <DashboardCreateScreeningWrapper />
    </section>
  );
}

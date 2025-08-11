import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminTestWrapper from "@/components/organisms/dashboard/admin/test/DashboardAdminTestWrapper";

export default function DashboardAdminTestsPage() {
  return (
    <section>
      <DashboardTitle
        head="Daftar Tes"
        body="Menampilkan daftar pre-test dan post-test"
      />
      <DashboardAdminTestWrapper />
    </section>
  );
}

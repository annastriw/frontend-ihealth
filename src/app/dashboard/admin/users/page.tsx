import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminUsersWrapper from "@/components/organisms/dashboard/admin/users/DashboardAdminUsersWrapper";

export default function DashboardAdminUsersPage() {
  return (
    <section>
      <DashboardTitle
        head="Pengguna"
        body="Menampilkan daftar pengguna yang terdaftar"
      />
      <DashboardAdminUsersWrapper />
    </section>
  );
}

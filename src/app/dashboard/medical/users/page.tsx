import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalUsersWrapper from "@/components/organisms/dashboard/medical/users/DashboardMedicalUsersWrapper";

export default function DashboardMedicalUsersPage() {
  return (
    <section>
      <DashboardTitle
        head="Pengguna"
        body="Menampilkan daftar pengguna tenaga kesehatan"
      />
      <DashboardMedicalUsersWrapper />
    </section>
  );
}

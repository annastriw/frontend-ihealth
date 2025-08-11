import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminDetailUsersWrapper from "@/components/organisms/dashboard/admin/users/DashboardAdminDetailUsersWrapper";

interface DashboardAdminDetailUsersPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DashboardAdminDetailUsersPage({
  params,
}: DashboardAdminDetailUsersPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle
        head="Detail Pengguna"
        body="Menampilkan detail informasi akun dan pribadi dari pengguna"
      />
      <DashboardAdminDetailUsersWrapper id={id} />
    </section>
  );
}

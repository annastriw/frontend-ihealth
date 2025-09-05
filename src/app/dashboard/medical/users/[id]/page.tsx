import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalDetailUserWrapper from "@/components/organisms/dashboard/medical/users/DashboardMedicalDetailUserWrapper";

interface DashboardMedicalDetailUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DashboardMedicalDetailUserPage({
  params,
}: DashboardMedicalDetailUserPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle
        head="Detail Pengguna"
        body="Menampilkan detail informasi akun dan pribadi"
      />
      <DashboardMedicalDetailUserWrapper id={id} />
    </section>
  );
}

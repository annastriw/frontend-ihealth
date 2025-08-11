import DashboardAdminDetailSubModulesWrapper from "@/components/organisms/dashboard/admin/sub-modules/DashboardAdminDetailSubModules";

interface DashboardAdminSubModulesDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminSubModulesDetailPage({
  params,
}: DashboardAdminSubModulesDetailPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardAdminDetailSubModulesWrapper id={id} />
    </section>
  );
}

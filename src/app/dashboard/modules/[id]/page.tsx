import DashboardModulesDetailWrapper from "@/components/organisms/dashboard/modules/DashboardModulesDetailWrapper";

interface DashboardModulesDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardModulesDetailPage({
  params,
}: DashboardModulesDetailPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardModulesDetailWrapper id={id} />
    </section>
  );
}

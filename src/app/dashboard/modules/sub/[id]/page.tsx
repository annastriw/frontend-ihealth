import DashboardSubModulesWrapper from "@/components/organisms/dashboard/sub-modules/DashboardSubModulesWrapper";

interface DashboardSubModulePageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardSubModulePage({
  params,
}: DashboardSubModulePageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardSubModulesWrapper id={id} />
    </section>
  );
}

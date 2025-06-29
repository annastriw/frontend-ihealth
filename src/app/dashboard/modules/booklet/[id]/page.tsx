import DashboardModulesBookletWrapper from "@/components/organisms/dashboard/booklet/DashboardModulesBookletWrapper";

interface DashboardModulesBookletPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardModulesBookletPage({
  params,
}: DashboardModulesBookletPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardModulesBookletWrapper id={id} />
    </section>
  );
}

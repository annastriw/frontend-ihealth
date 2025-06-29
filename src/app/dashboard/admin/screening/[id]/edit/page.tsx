import DashboardEditScreeningWrapper from "@/components/organisms/dashboard/admin/screening/DashboardEditScreening";

interface DashboardEditScreeningPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardEditScreeningPage({
  params,
}: DashboardEditScreeningPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardEditScreeningWrapper id={id} />
    </section>
  );
}

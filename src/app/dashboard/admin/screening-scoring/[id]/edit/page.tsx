// src/app/dashboard/admin/screening-scoring/[id]/edit/page.tsx

import DashboardEditScreeningScoringWrapper from "@/components/organisms/dashboard/admin/screening-scoring/DashboardEditScreeningScoringWrapper";

interface DashboardEditScreeningScoringPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardEditScreeningScoringPage({
  params,
}: DashboardEditScreeningScoringPageProps) {
  const { id } = await params;

  return (
    <section>
      <DashboardEditScreeningScoringWrapper id={id} />
    </section>
  );
}

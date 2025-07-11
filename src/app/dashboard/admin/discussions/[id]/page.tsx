// src/app/dashboard/admin/discussions/[id]/page.tsx
import DashboardAdminDetailDiscussionWrapper from "@/components/organisms/dashboard/admin/discussions/DashboardAdminDiscussionDetailWrapper";

interface DashboardAdminDiscussionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminDiscussionDetailPage({
  params,
}: DashboardAdminDiscussionDetailPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardAdminDetailDiscussionWrapper id={id} />
    </section>
  );
}

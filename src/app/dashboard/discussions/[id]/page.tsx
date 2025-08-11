import DashboardDiscussionDetailWrapper from "@/components/organisms/dashboard/discussions/DashboardDiscussionDetailWrapper";

interface DashboardDiscussionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardDiscussionDetailPage({
  params,
}: DashboardDiscussionDetailPageProps) {
  const { id } = await params;
  return <DashboardDiscussionDetailWrapper id={id} />;
}

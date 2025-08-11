import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardAdminEditQuestionWrapper from "@/components/organisms/dashboard/admin/questions/DashboardAdminEditQuestion";

interface DashboardAdminEditQuestionPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminEditQuestionPage({
  params,
}: DashboardAdminEditQuestionPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitleBold head="Edit Soal" />
      <DashboardAdminEditQuestionWrapper id={id} />
    </section>
  );
}

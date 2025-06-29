import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardAdminDetailQuestionWrapper from "@/components/organisms/dashboard/admin/questions/DashboardDetailQuestion";

interface DashboardAdminDetailQuestionPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminDetailQuestionPage({
  params,
}: DashboardAdminDetailQuestionPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitleBold head="Detail Soal" />
      <DashboardAdminDetailQuestionWrapper id={id} />
    </section>
  );
}

import DashboardQuestionBankDetailWrapper from "@/components/organisms/dashboard/question-bank/DashboardQuestionBankDetailWrapper";

interface DashboardQuestionBankDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardQuestionBankDetailPage({
  params,
}: DashboardQuestionBankDetailPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardQuestionBankDetailWrapper id={id} />
    </section>
  );
}

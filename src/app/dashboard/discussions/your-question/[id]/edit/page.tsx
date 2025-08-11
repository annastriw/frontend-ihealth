import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardDiscussionYourQuestionEditWrapper from "@/components/organisms/dashboard/discussions/DashboardDiscussionCommentEditYourQuestion";

interface DashboardDiscussionYourQuestionEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardDiscussionYourQuestionEditPage({
  params,
}: DashboardDiscussionYourQuestionEditPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitleBold head="Edit Pertanyaan Anda" />
      <DashboardDiscussionYourQuestionEditWrapper id={id} />
    </section>
  );
}

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardDiscussionYourQuestionWrapper from "@/components/organisms/dashboard/discussions/DashboardDiscussionYourQuestionWrapper";

export default function DashboardDiscussionYourQuestionPage() {
  return (
    <section>
      <DashboardTitle
        head="Kelola Pertanyaan Anda"
        body="Kelola pertanyaan yang pernah anda buat di Forum Komunitas"
      />
      <DashboardDiscussionYourQuestionWrapper />
    </section>
  );
}

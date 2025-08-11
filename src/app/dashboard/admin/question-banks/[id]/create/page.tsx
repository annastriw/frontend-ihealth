import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardCreateQuestionWrapper from "@/components/organisms/dashboard/question-bank/DashboardCreateQuestionWrapper";

interface DashboardAdminCreateQuestionPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminCreateQuestionPage({
  params,
}: DashboardAdminCreateQuestionPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle
        head="Tambah Soal Baru"
        body="Lengkapi form berikut untuk menambahkan soal baru"
      />
      <DashboardCreateQuestionWrapper id={id} />
    </section>
  );
}

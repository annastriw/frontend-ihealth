import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminCreateQuestionBankWrapper from "@/components/organisms/dashboard/question-bank/DashboardCreateQuestionBankWrapper";

export default function DashboardAdminCreateQuestionBank() {
  return (
    <section>
      <DashboardTitle
        head="Tambah Bank Soal"
        body="Lengkapi form berikut untuk menambahkan bank soal"
      />
      <DashboardAdminCreateQuestionBankWrapper />
    </section>
  );
}

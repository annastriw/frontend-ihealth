import AlertCreateQuestionBank from "@/components/atoms/alert/AlertCreateQuestionBank";
import FormCreateQuestionBank from "@/components/molecules/form/question-banks/FormCreateQuestionBank";

export default function DashboardAdminCreateQuestionBankWrapper() {
  return (
    <div>
      <AlertCreateQuestionBank />
      <FormCreateQuestionBank />
    </div>
  );
}

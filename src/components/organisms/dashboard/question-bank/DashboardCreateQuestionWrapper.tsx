import FormCreateQuestion from "@/components/molecules/form/question/FormCreateQuestion";

interface DashboardCreateQuestionWrapperProps {
  id: string;
}

export default function DashboardCreateQuestionWrapper({
  id,
}: DashboardCreateQuestionWrapperProps) {
  return <FormCreateQuestion id={id} />;
}

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertCreateQuestionBank() {
  return (
    <Alert variant={"warning"} className="mb-4 w-full md:w-fit">
      <TriangleAlert className="!text-yellow-600" />
      <AlertTitle>Informasi</AlertTitle>
      <AlertDescription>
        <div>
          Buat bank soal secara terpisah untuk Pre Test / Post Test / Screening.
          Jangan digabung dalam satu bank soal. Contohnya,{" "}
          <b>Pre Test Manajemen Diri</b>.
        </div>
      </AlertDescription>
    </Alert>
  );
}

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

interface AlertInformationModuleProps {
  type?: string;
}

export default function AlertInformationModule({
  type,
}: AlertInformationModuleProps) {
  return (
    <Alert variant={"warning"} className="mb-4 w-full md:w-fit">
      <TriangleAlert className="!text-yellow-600" />
      <AlertTitle>Informasi</AlertTitle>
      <AlertDescription>
        <div>
          Materi yang tersedia berdasarkan pada jenis pasien, dan Anda termasuk
          jenis pasien <span className="font-semibold uppercase">{type}</span>.
        </div>
      </AlertDescription>
    </Alert>
  );
}

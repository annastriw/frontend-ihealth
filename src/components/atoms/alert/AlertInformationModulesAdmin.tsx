import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertInformationModulesAdmin() {
  return (
    <Alert variant={"warning"} className="mb-4 w-full md:w-fit">
      <TriangleAlert className="!text-yellow-600" />
      <AlertTitle>Informasi</AlertTitle>
      <AlertDescription>
        <div>
          Tambahkan modul CAPD dan HD saja. Untuk materi seperti booklet pdf,
          video dll silahkan tambahkan di menu materi.
        </div>
      </AlertDescription>
    </Alert>
  );
}

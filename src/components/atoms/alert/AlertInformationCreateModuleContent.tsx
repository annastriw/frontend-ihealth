import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertInformationCreateModuleContent() {
  return (
    <Alert variant={"warning"} className="mb-4 w-full md:w-fit">
      <TriangleAlert className="!text-yellow-600" />
      <AlertTitle>Informasi</AlertTitle>
      <AlertDescription>
        <div>
          Untuk menambahkan file booklet pdf, video, dan lain-lain silahkan klik
          detail materi dibawah terlebih dahulu.
        </div>
      </AlertDescription>
    </Alert>
  );
}

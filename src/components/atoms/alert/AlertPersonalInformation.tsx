import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertPersonalInformation() {
  return (
    <Alert variant={"warning"} className="mb-4 w-full md:w-fit">
      <TriangleAlert className="!text-yellow-600" />
      <AlertTitle>Belum Mengisi</AlertTitle>
      <AlertDescription>
        Anda belum mengisi informasi pribadi, silahkan isi terlebih dahulu
        sebelum mengakses halaman dashboard.
      </AlertDescription>
    </Alert>
  );
}

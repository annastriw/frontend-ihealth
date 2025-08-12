import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertPersonalInformation() {
  return (
    <Alert
      variant="warning"
      className="mb-4 w-full max-w-2xl border-2 md:w-fit"
    >
      <TriangleAlert className="mt-0.5 size-5 text-yellow-600" />
      <div>
        <AlertTitle>Informasi Pribadi Belum Diisi</AlertTitle>
        <AlertDescription>
          Anda belum mengisi informasi pribadi. Harap lengkapi terlebih dahulu
          sebelum mengakses halaman utama.
        </AlertDescription>
      </div>
    </Alert>
  );
}

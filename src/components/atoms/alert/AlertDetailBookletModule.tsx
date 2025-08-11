import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertDetailBookletModule() {
  return (
    <Alert variant={"warning"} className="mb-4 w-full md:w-fit">
      <TriangleAlert className="!text-yellow-600" />
      <AlertTitle>Informasi</AlertTitle>
      <AlertDescription>
        Jika browser anda tidak dapat menampilkan file booklet, silahkan klik
        download booklet dibawah atau bisa dicoba dengan browser lain.
      </AlertDescription>
    </Alert>
  );
}

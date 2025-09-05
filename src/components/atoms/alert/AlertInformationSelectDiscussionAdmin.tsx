"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertInformationSelectDiscussionAdmin() {
  return (
    <Alert variant="warning" className="mb-4 w-full md:w-fit">
      <TriangleAlert className="!text-yellow-600" />
      <AlertTitle>Informasi</AlertTitle>
      <AlertDescription>
        <div>
          Untuk melihat atau mengelola detail topik diskusi, silakan klik tombol{" "}
          <span className="font-semibold">Detail</span> pada salah satu topik
          yang tersedia.
        </div>
      </AlertDescription>
    </Alert>
  );
}

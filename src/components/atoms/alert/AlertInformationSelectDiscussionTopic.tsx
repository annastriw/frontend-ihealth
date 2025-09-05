"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function AlertInformationSelectDiscussionTopic() {
  return (
    <Alert variant="warning" className="mb-4 w-full md:w-fit">
      <Info className="!text-blue-600" />
      <AlertTitle>Informasi</AlertTitle>
      <AlertDescription>
        <div>
          Pilih salah satu topik untuk mulai berdiskusi dengan komunitas.
        </div>
      </AlertDescription>
    </Alert>
  );
}

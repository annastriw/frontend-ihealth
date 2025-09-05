"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertInformationCreateNewQuestionsOnQuestionBank() {
  return (
    <Alert variant="warning" className="mb-4 w-full md:w-fit">
      <TriangleAlert className="!text-yellow-600" />
      <AlertTitle>Informasi</AlertTitle>
      <AlertDescription>
        <div>
          Untuk menambahkan soal pada <strong>bank soal</strong> tertentu, klik
          tombol <strong>detail</strong> terlebih dahulu.
        </div>
      </AlertDescription>
    </Alert>
  );
}

// src/components/molecules/card/CardListHistoryQuestion.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryPreTestDetail } from "@/types/test/pre-test";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Check, Plus } from "lucide-react";

interface CardListHistoryQuestionProps {
  data?: HistoryPreTestDetail;
  isLoading?: boolean;
}

export default function CardListHistoryQuestion({
  data,
  isLoading = false,
}: CardListHistoryQuestionProps) {
  const optionLabels = ["A", "B", "C", "D", "E", "F"];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-10" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-5 w-3/4" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Informasi Tes Edukasi */}
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Informasi Tes Edukasi</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-1">
            <p>
              Dikerjakan pada:{" "}
              <span className="font-medium text-primary">
                {format(new Date(data.created_at), "EEEE, dd MMMM yyyy 'pukul' HH:mm", {
                  locale: idLocale,
                })}
              </span>
            </p>
            <p>
              Total Skor:{" "}
              <span className="font-semibold text-green-700 text-base">
                {data.sum_score ?? "-"}
              </span>
            </p>
            <p className="pt-2 text-foreground">
              Tes edukasi ini bertujuan untuk membantu Anda memahami materi kesehatan yang telah atau akan dipelajari.
              Melalui tes ini, diharapkan Anda dapat mengukur sejauh mana pemahaman Anda sebelum dan sesudah pembelajaran.
              Skor tidak digunakan untuk penilaian akhir, melainkan sebagai alat refleksi dan penguatan edukasi.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Daftar soal dan jawaban */}
      {data?.answer.map((answer, index) => (
        <Card key={answer.id}>
          <CardHeader>
            <CardTitle className="text-xl">{index + 1}.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h1 className="font-medium">{answer.question}</h1>
              <div className="space-y-2">
                {answer.options.map((option, idx) => {
                  const isSelected = option.id === answer.selected_option.id;
                  return (
                    <div
                      key={option.id}
                      className={`flex gap-2 items-center rounded-md ${
                        isSelected ? "text-green-600 font-semibold" : ""
                      }`}
                    >
                      <span className="font-semibold">
                        {optionLabels[idx] || String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{option.text}</span>
                      {isSelected && (
                        <div className="flex items-center gap-2">
                          <Check className="ml-1 h-4 w-4" />
                          <div className="flex items-center text-sm text-green-600">
                            <Plus className="h-4 w-4" /> {option.score ?? 0}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

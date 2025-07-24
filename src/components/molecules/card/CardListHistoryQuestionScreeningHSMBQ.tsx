"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

type Answer = {
  question_id: number;
  question_text: string;
  score: number;
};

interface Props {
  answers: Answer[];
  score: number;
  interpretation: string;
  description: string;
  createdAt?: string | Date;
  isLoading?: boolean;
}

function formatCreatedAt(value: string | Date): string {
  const dateObj = typeof value === "string" ? new Date(value) : value;
  return format(dateObj, "EEEE, dd MMMM yyyy 'pukul' HH:mm", {
    locale: idLocale,
  });
}

function getColor(level: string) {
  switch (level) {
    case "Normal":
      return { text: "text-green-600", emoji: "😀" };
    case "Ringan":
      return { text: "text-yellow-500", emoji: "🙂" };
    case "Sedang":
      return { text: "text-orange-500", emoji: "😐" };
    case "Berat":
      return { text: "text-red-500", emoji: "😟" };
    case "Sangat Berat":
      return { text: "text-red-700", emoji: "😢" };
    default:
      return { text: "text-gray-500", emoji: "❓" };
  }
}

export default function CardListHistoryQuestionScreeningHSMBQ({
  answers = [],
  score,
  interpretation,
  description,
  createdAt,
  isLoading = false,
}: Props) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    );
  }

  const color = getColor(interpretation);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Hasil Screening HSMBQ</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-4 text-muted-foreground">
          {createdAt && (
            <p>
              Dikerjakan pada:{" "}
              <span className="text-primary font-medium">
                {formatCreatedAt(createdAt)}
              </span>
            </p>
          )}
          <p className={`text-base ${color.text}`}>
            <span className="font-bold text-lg">{color.emoji}</span> Skor:{" "}
            <span className="font-semibold">{score}</span>
          </p>
          <p className={`font-semibold ${color.text}`}>
            Interpretasi: {interpretation}
          </p>
          <p>{description}</p>
        </CardContent>
      </Card>

      {answers.map((answer, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-xl">{index + 1}.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h1 className="font-medium">{answer.question_text}</h1>
              <p className="text-muted-foreground">
                Jawaban:{" "}
                <span className="text-primary font-semibold">
                  Skor {answer.score}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

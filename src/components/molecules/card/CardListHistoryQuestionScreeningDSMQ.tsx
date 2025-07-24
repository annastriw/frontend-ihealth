// src/components/molecules/card/CardListHistoryQuestionScreeningDSMQ.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DSMQ_QUESTIONS } from "@/constants/dsmq-questions";

ChartJS.register(ArcElement, Tooltip, Legend);

/* ---------- types ---------- */
type Interpretation = "Buruk" | "Cukup" | "Baik";

interface Answer {
  question_id: number;
  score: number; // Sudah dikalkulasi backend
}

interface Props {
  answers: Answer[];
  score: number; // Total 0–48
  interpretation: Interpretation;
  description: string;
  createdAt?: string | Date;
  isLoading?: boolean;
}

/* ---------- constants ---------- */
const FAVORABLE_IDS = [
  1, 2, 3, 4, 6, 8, 9, 14,
];
const NON_FAVORABLE_IDS = [
  5, 7, 10, 11, 12, 13, 15, 16,
];

const OPTION_LABELS = [
  "A. Tidak Sesuai",
  "B. Cukup Sesuai",
  "C. Sesuai",
  "D. Sangat Sesuai",
];

/* ---------- utils ---------- */
function formatCreatedAt(value: string | Date): string {
  const dateObj = typeof value === "string" ? new Date(value) : value;
  return format(dateObj, "EEEE, dd MMMM yyyy 'pukul' HH:mm", {
    locale: idLocale,
  });
}

function getColor(level: Interpretation | string) {
  switch (level) {
    case "Buruk":
      return { text: "text-red-600", chart: "#ef4444", emoji: "😟" };
    case "Cukup":
      return { text: "text-yellow-500", chart: "#eab308", emoji: "🙂" };
    case "Baik":
      return { text: "text-green-600", chart: "#22c55e", emoji: "😄" };
    default:
      return { text: "text-gray-500", chart: "#9ca3af", emoji: "❓" };
  }
}

const chartConfig = (value: number, color: string) => ({
  labels: [],
  datasets: [
    {
      data: [value, 48 - value],
      backgroundColor: [color, "#e5e7eb"],
      borderWidth: 0,
      cutout: "70%",
    },
  ],
});

/**
 * Konversi skor backend ke label jawaban (0-3 => A-D),
 * memperhitungkan apakah soal termasuk favorable atau tidak.
 */
function getLabelByQuestionType(questionId: number, score: number): string {
  if (FAVORABLE_IDS.includes(questionId)) {
    return OPTION_LABELS[score] ?? "-";
  } else if (NON_FAVORABLE_IDS.includes(questionId)) {
    const reversedScore = 3 - score;
    return OPTION_LABELS[reversedScore] ?? "-";
  } else {
    return "-";
  }
}

/* ---------- component ---------- */
export default function CardListHistoryQuestionScreeningDSMQ({
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
      {/* Ringkasan dan chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hasil Screening DSMQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          {createdAt && (
            <p>
              Dikerjakan pada:{" "}
              <span className="text-primary font-medium">
                {formatCreatedAt(createdAt)}
              </span>
            </p>
          )}

          {/* Doughnut chart */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="relative h-[120px] w-[120px]">
              <Doughnut
                data={chartConfig(score, color.chart)}
                options={{ cutout: "70%" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                {score}
              </div>
            </div>
            <p className={`text-lg font-bold ${color.text}`}>
              <span className="text-2xl">{color.emoji}</span> {interpretation}
            </p>
          </div>

          {/* Interpretasi */}
          <p className={`text-sm ${color.text}`}>{description}</p>

          <p className="pt-2 text-foreground">
            Hasil ini memberikan gambaran manajemen diri Anda terhadap diabetes.
            Konsultasikan hasil ini dengan tenaga kesehatan untuk tindak lanjut.
          </p>
        </CardContent>
      </Card>

      {/* Detail pertanyaan */}
      {DSMQ_QUESTIONS.map((question, idx) => {
        const matchedAnswer = answers.find(
          (ans) => ans.question_id === question.id
        );
        const rawScore = matchedAnswer?.score ?? -1;

        return (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-xl">{idx + 1}.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">{question.text}</p>
              <div className="space-y-2">
                {[0, 1, 2, 3].map((val) => {
                  const label = OPTION_LABELS[val];
                  let isSelected = false;

                  if (FAVORABLE_IDS.includes(question.id)) {
                    isSelected = rawScore === val;
                  } else if (NON_FAVORABLE_IDS.includes(question.id)) {
                    isSelected = rawScore === 3 - val;
                  }

                  return (
                    <div
                      key={val}
                      className={`flex items-center px-2 ${
                        isSelected
                          ? "text-green-600 font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// src/components/molecules/card/CardListHistoryQuestionScreeningDASS.tsx
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

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Level = "Normal" | "Ringan" | "Sedang" | "Parah" | "Sangat Parah";

interface Answer {
  question_id: number;
  category: string;
  score: number;
  question_text: string;
}

interface Props {
  answers: Answer[];
  scores: { depression: number; anxiety: number; stress: number };
  interpretations: { depression: Level; anxiety: Level; stress: Level };
  descriptions: { depression: string; anxiety: string; stress: string };
  createdAt?: string | Date;
  isLoading?: boolean;
}

function formatCreatedAt(value: string | Date): string {
  const dateObj = typeof value === "string" ? new Date(value) : value;
  return format(dateObj, "EEEE, dd MMMM yyyy 'pukul' HH:mm", {
    locale: idLocale,
  });
}

function getColor(level: Level) {
  if (level === "Normal") return { text: "text-green-600", chart: "#22c55e", emoji: "😀" };
  if (level === "Ringan") return { text: "text-yellow-500", chart: "#eab308", emoji: "🙂" };
  if (level === "Sedang") return { text: "text-orange-500", chart: "#f97316", emoji: "😐" };
  if (level === "Parah") return { text: "text-red-500", chart: "#ef4444", emoji: "😟" };
  return { text: "text-red-700", chart: "#b91c1c", emoji: "😢" };
}

function chartConfig(value: number, color: string) {
  return {
    labels: [],
    datasets: [
      {
        data: [value, 21 - value],
        backgroundColor: [color, "#e5e7eb"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };
}

const scoreToLabel = (score: number): string => {
  switch (score) {
    case 0:
      return "A. Tidak Pernah";
    case 1:
      return "B. Kadang-kadang";
    case 2:
      return "C. Cukup Sering";
    case 3:
      return "D. Sangat Sering";
    default:
      return "-";
  }
};

export default function CardListHistoryQuestionScreeningDASS({
  answers = [],
  scores,
  interpretations,
  descriptions,
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

  return (
    <div className="space-y-4">
      {/* Informasi dan chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hasil Screening DASS-21</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-4">
          {createdAt && (
            <p>
              Dikerjakan pada:{" "}
              <span className="font-medium text-primary">
                {formatCreatedAt(createdAt)}
              </span>
            </p>
          )}

          {/* Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center text-center">
            {(["depression", "anxiety", "stress"] as const).map((dimensiKey) => {
              const dimensi =
                dimensiKey === "depression"
                  ? "Depresi"
                  : dimensiKey === "anxiety"
                  ? "Kecemasan"
                  : "Stres";
              const level = interpretations[dimensiKey];
              const color = getColor(level);

              return (
                <div key={dimensiKey} className="space-y-2">
                  <h4 className="font-semibold">{dimensi}:</h4>
                  <p className={`text-lg font-bold ${color.text}`}>{level}</p>
                  <div className="w-[100px] h-[100px] mx-auto relative">
                    <Doughnut
                      data={chartConfig(scores[dimensiKey], color.chart)}
                      options={{ cutout: "70%" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                      {scores[dimensiKey]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interpretasi & deskripsi */}
          <div className="space-y-6 text-left pt-6">
            {(["depression", "anxiety", "stress"] as const).map((dimensiKey) => {
              const dimensi =
                dimensiKey === "depression"
                  ? "Depresi"
                  : dimensiKey === "anxiety"
                  ? "Kecemasan"
                  : "Stres";
              const level = interpretations[dimensiKey];
              const color = getColor(level);

              return (
                <div key={dimensiKey} className="flex gap-3 items-start">
                  <span className="text-3xl">{color.emoji}</span>
                  <div>
                    <h5 className="font-bold mb-1">
                      {dimensi}: <span className={color.text}>{level}</span>
                    </h5>
                    <p className={`text-sm ${color.text}`}>
                      {descriptions[dimensiKey]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="pt-2 text-foreground">
            Tes DASS-21 ini bertujuan memberikan gambaran awal tentang kondisi psikologis Anda,  
            termasuk tingkat stres, kecemasan, dan depresi.  
            Hasil tes ini bukan pengganti diagnosis dari tenaga medis profesional.  
            Jika Anda merasa terbebani, segera konsultasikan dengan tenaga kesehatan.
          </p>
        </CardContent>
      </Card>

      {/* Daftar pertanyaan & semua opsi jawaban */}
      {answers.map((answer, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-xl">{index + 1}.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h1 className="font-medium">{answer.question_text}</h1>
              <div className="space-y-2">
                {[0, 1, 2, 3].map((optScore) => {
                  const label = scoreToLabel(optScore);
                  const isSelected = answer.score === optScore;
                  return (
                    <div
  key={optScore}
  className={`flex items-center px-2 ${
    isSelected ? "text-green-600 font-medium" : "text-muted-foreground"
  }`}
>
  <span>{label}</span>
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

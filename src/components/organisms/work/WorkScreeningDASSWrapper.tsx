// src/components/organisms/work/WorkScreeningDASSWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DialogConfirmSubmit from "@/components/atoms/dialog/DialogConfirmSubmitPreTest";
import BreadcrumbWorkScreeningDASS from "@/components/atoms/breadcrumb/BreadcrumbWorkScreeningDASS";

// Hanya frontend statis, tanpa panggilan API
const staticQuestions = [
  {
    id: 1,
    question_text: "Saya merasa kesulitan untuk rileks",
    category: "Stres" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 2,
    question_text: "Saya merasa takut tanpa alasan yang jelas",
    category: "Kecemasan" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  // Tambahkan total 21 soal sesuai struktur
];

export default function WorkScreeningDASSWrapper() {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [answers, setAnswers] = useState<number[]>(Array(staticQuestions.length).fill(-1));
  const isAllAnswered = answers.every((val) => val !== -1);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Jawaban Anda akan hilang jika halaman ditutup.";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const handleAnswer = (score: number) => {
    const updated = [...answers];
    updated[selectedQuestionIndex] = score;
    setAnswers(updated);
    if (selectedQuestionIndex < staticQuestions.length - 1) {
      setSelectedQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    toast.success("Hasil DASS berhasil disubmit (simulasi).");
    router.replace("/dashboard/mental-health");
  };

  return (
    <>
      <SidebarProvider>
        <SidebarInset>
          <BreadcrumbWorkScreeningDASS
            onBack={() => {
              if (selectedQuestionIndex > 0) {
                setSelectedQuestionIndex((prev) => prev - 1);
              } else {
                router.push("/dashboard/mental-health");
              }
            }}
            currentIndex={selectedQuestionIndex}
            totalQuestions={staticQuestions.length}
          />

          <div className="pad-x-xl pt-28 space-y-4">
            <p className="text-xl font-semibold capitalize">
              {staticQuestions[selectedQuestionIndex].question_text}
            </p>

            <ul className="space-y-3">
              {staticQuestions[selectedQuestionIndex].options.map((option) => {
                const isSelected = answers[selectedQuestionIndex] === option.score;
                return (
                  <li
                    key={option.id}
                    className={`p-3 rounded-md cursor-pointer font-semibold ${
                      isSelected
                        ? "bg-primary/10 border border-primary text-black"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    }`}
                    onClick={() => handleAnswer(option.score)}
                  >
                    {option.option_text}
                  </li>
                );
              })}
            </ul>

            {selectedQuestionIndex === staticQuestions.length - 1 && isAllAnswered && (
              <div className="pt-4">
                <Button onClick={() => setConfirmDialogOpen(true)} className="w-full">
                  Selesai
                </Button>
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>

      <DialogConfirmSubmit
        open={isConfirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        unansweredNumbers={answers
          .map((a, i) => ({ index: i + 1, answered: a !== -1 }))
          .filter((x) => !x.answered)
          .map((x) => x.index)}
        onConfirm={() => {
          handleSubmit();
          setConfirmDialogOpen(false);
        }}
      />
    </>
  );
}

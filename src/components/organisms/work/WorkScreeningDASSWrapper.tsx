// src/components/organisms/work/WorkScreeningDASSWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import DialogConfirmSubmit from "@/components/atoms/dialog/DialogConfirmSubmitPreTest";
import BreadcrumbWorkScreeningDASS from "@/components/atoms/breadcrumb/BreadcrumbWorkScreeningDASS";
import { useSubmitScreeningDASS } from "@/http/screening-dass/submit-screening-dass";
import { ScreeningDASSAnswer } from "@/types/screening-dass/screening-dass";
import { SubmitScreeningDASSValidatorType } from "@/validators/screening-dass/submit-screening-dass-validator";


const staticQuestions = [
  {
    id: 1,
    question_text: "Saya sama sekali tidak dapat merasakan perasaan positif (contoh: merasa gembira, bangga, dsb).",
    category: "Depresi" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 2,
    question_text: "Saya merasa sulit berinisiatif melakukan sesuatu.",
    category: "Depresi" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 3,
    question_text: "Saya merasa tidak ada lagi yang bisa saya harapkan.",
    category: "Depresi" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 4,
    question_text: "Saya merasa sedih dan tertekan.",
    category: "Depresi" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 5,
    question_text: "Saya tidak bisa merasa antusias terhadap hal apapun.",
    category: "Depresi" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 6,
    question_text: "Saya merasa diri saya tidak berharga.",
    category: "Depresi" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 7,
    question_text: "Saya merasa hidup ini tidak berarti.",
    category: "Depresi" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 8,
    question_text: "Saya merasa rongga mulut saya kering.",
    category: "Kecemasan" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 9,
    question_text: "Saya merasa kesulitan bernafas (misalnya seringkali terengah-engah atau tidak dapat bernafas padahal tidak melakukan aktivitas fisik sebelumnya).",
    category: "Kecemasan" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 10,
    question_text: "Saya merasa gemetar (misalnya pada tangan).",
    category: "Kecemasan" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 11,
    question_text: "Saya merasa khawatir dengan situasi dimana saya mungkin menjadi panik dan mempermalukan diri sendiri.",
    category: "Kecemasan" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 12,
    question_text: "Saya merasa hampir panik.",
    category: "Kecemasan" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 13,
    question_text: "Saya menyadari kondisi jantung saya (seperti meningkatnya atau melemahnya detak jantung) meskipun sedang tidak melakukan aktivitas fisik.",
    category: "Kecemasan" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 14,
    question_text: "Saya merasa ketakutan tanpa alasan yang jelas.",
    category: "Kecemasan" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 15,
    question_text: "Saya merasa sulit untuk beristirahat.",
    category: "Stres" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 16,
    question_text: "Saya cenderung menunjukkan reaksi berlebihan terhadap suatu situasi.",
    category: "Stres" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 17,
    question_text: "Saya merasa energi saya terkuras karena terlalu cemas.",
    category: "Stres" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 18,
    question_text: "Saya merasa gelisah.",
    category: "Stres" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 19,
    question_text: "Saya merasa sulit untuk merasa tenang.",
    category: "Stres" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 20,
    question_text: "Saya sulit untuk bersabar dalam menghadapi gangguan yang terjadi ketika sedang melakukan sesuatu.",
    category: "Stres" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
  {
    id: 21,
    question_text: "Perasaan saya mudah tergugah atau tersentuh.",
    category: "Stres" as const,
    options: [
      { id: 1, option_text: "Tidak pernah", score: 0 },
      { id: 2, option_text: "Kadang-kadang", score: 1 },
      { id: 3, option_text: "Cukup sering", score: 2 },
      { id: 4, option_text: "Sangat sering", score: 3 },
    ],
  },
];

export default function WorkScreeningDASSWrapper() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const historyId = searchParams.get("id");

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(staticQuestions.length).fill(-1)
  );
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const isAllAnswered = answers.every((val) => val !== -1);

 const mutation = useSubmitScreeningDASS({
  onSuccess: (res) => {
    console.log("Submit success response:", res);
    toast.success("Berhasil submit hasil DASS!");
    router.replace(`/dashboard/history/screening-dass/${res.data.id}`);
  },
  onError: (error) => {
    console.error("Submit error response:", error);
    toast.error("Gagal submit hasil DASS.");
  },
});


  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Jawaban Anda akan hilang jika meninggalkan halaman ini.";
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
  if (!session?.user?.id) {
    toast.error("User belum login.");
    return;
  }

  const answerPayload: SubmitScreeningDASSValidatorType = {
    user_id: session.user.id, // atau props.userId
    answers: staticQuestions.map((q, index) => ({
      question_id: q.id,
      category: q.category,
      score: answers[index],
    })),
  };

  mutation.mutate(answerPayload);
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
                const isSelected =
                  answers[selectedQuestionIndex] === option.score;
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

            {selectedQuestionIndex === staticQuestions.length - 1 &&
              isAllAnswered && (
                <div className="pt-4">
                  <Button
                    onClick={() => setConfirmDialogOpen(true)}
                    className="w-full"
                    disabled={mutation.isPending}
                  >
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

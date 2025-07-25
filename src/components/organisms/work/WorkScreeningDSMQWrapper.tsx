// src/components/organisms/work/WorkScreeningDSMQWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import DialogConfirmSubmit from "@/components/atoms/dialog/DialogConfirmSubmitPreTest";
import BreadcrumbWorkScreeningDSMQ from "@/components/atoms/breadcrumb/BreadcrumbWorkScreeningDSMQ";
import { useSubmitScreeningDSMQ } from "@/http/screening-dsmq/submit-screening-dsmq";
import { SubmitScreeningDSMQValidatorType } from "@/validators/screening-dsmq/submit-screening-dsmq-validator";

const staticQuestions = [
  {
    id: 1,
    question_text: "Saya memeriksa kadar gula darah sendiri secara hati-hati dan teliti.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 0 },
      { id: 2, option_text: "Cukup sesuai", score: 1 },
      { id: 3, option_text: "Sesuai", score: 2 },
      { id: 4, option_text: "Sangat sesuai", score: 3 },
    ],
  },
  {
    id: 2,
    question_text: "Makanan yang saya pilih untuk dikonsumsi memudahkan pengontrolan kadar gula darah optimal.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 0 },
      { id: 2, option_text: "Cukup sesuai", score: 1 },
      { id: 3, option_text: "Sesuai", score: 2 },
      { id: 4, option_text: "Sangat sesuai", score: 3 },
    ],
  },
    {
    id: 3,
    question_text: "Saya mematuhi semua anjuran dokter yang direkomendasikan untuk perawatan diabetes saya.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 0 },
      { id: 2, option_text: "Cukup sesuai", score: 1 },
      { id: 3, option_text: "Sesuai", score: 2 },
      { id: 4, option_text: "Sangat sesuai", score: 3 },
    ],
  },
    {
    id: 4,
    question_text: "Saya mengonsumsi obat diabetes (obat oral atau injeksi insulin) sesuai yang diresepkan.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 0 },
      { id: 2, option_text: "Cukup sesuai", score: 1 },
      { id: 3, option_text: "Sesuai", score: 2 },
      { id: 4, option_text: "Sangat sesuai", score: 3 },
    ],
  },
    {
    id: 5,
    question_text: "Kadang-kadang, saya mengonsumsi banyak makanan manis atau yang mengandung karbohidrat tinggi.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 3 },
      { id: 2, option_text: "Cukup sesuai", score: 2 },
      { id: 3, option_text: "Sesuai", score: 1 },
      { id: 4, option_text: "Sangat sesuai", score: 0 },
    ],
  },
    {
    id: 6,
    question_text: "Saya mencatat hasil pemeriksaan kadar gula darah saya secara teratur.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 0 },
      { id: 2, option_text: "Cukup sesuai", score: 1 },
      { id: 3, option_text: "Sesuai", score: 2 },
      { id: 4, option_text: "Sangat sesuai", score: 3 },
    ],
  },
    {
    id: 7,
    question_text: "Saya cenderung menghindari jadwal pemeriksaan dokter sehubungan penyakit diabetes saya.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 3 },
      { id: 2, option_text: "Cukup sesuai", score: 2 },
      { id: 3, option_text: "Sesuai", score: 1 },
      { id: 4, option_text: "Sangat sesuai", score: 0 },
    ],
  },
    {
    id: 8,
    question_text: "Saya melakukan aktivitas fisik secara teratur untuk mencapai kadar gula darah optimal.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 0 },
      { id: 2, option_text: "Cukup sesuai", score: 1 },
      { id: 3, option_text: "Sesuai", score: 2 },
      { id: 4, option_text: "Sangat sesuai", score: 3 },
    ],
  },
    {
    id: 9,
    question_text: "Saya secara ketat mengikuti rekomendasi diet yang diberikan oleh dokter terkait penyakit diabetes saya.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 0 },
      { id: 2, option_text: "Cukup sesuai", score: 1 },
      { id: 3, option_text: "Sesuai", score: 2 },
      { id: 4, option_text: "Sangat sesuai", score: 3 },
    ],
  },
    {
    id: 10,
    question_text: "Saya tidak mengecek kadar gula darah saya secara rutin seperti yang diperlukan untuk mencapai kontrol gula darah yang baik.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 3 },
      { id: 2, option_text: "Cukup sesuai", score: 2 },
      { id: 3, option_text: "Sesuai", score: 1 },
      { id: 4, option_text: "Sangat sesuai", score: 0 },
    ],
  },
    {
    id: 11,
    question_text: "Saya menghindari melakukan aktivitas fisik, meskipun hal tersebut dapat memperbaiki kondisi penyakit saya.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 3 },
      { id: 2, option_text: "Cukup sesuai", score: 2 },
      { id: 3, option_text: "Sesuai", score: 1 },
      { id: 4, option_text: "Sangat sesuai", score: 0 },
    ],
  },
    {
    id: 12,
    question_text: "Saya cenderung lupa untuk mengonsumsi obat diabetes (obat oral atau injeksi insulin) sesuai anjuran dokter.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 3 },
      { id: 2, option_text: "Cukup sesuai", score: 2 },
      { id: 3, option_text: "Sesuai", score: 1 },
      { id: 4, option_text: "Sangat sesuai", score: 0 },
    ],
  },
    {
    id: 13,
    question_text: "Terkadang saya mengalami keinginan makan yang berlebihan (bukan karena kondisi oleh hipoglikemia).",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 3 },
      { id: 2, option_text: "Cukup sesuai", score: 2 },
      { id: 3, option_text: "Sesuai", score: 1 },
      { id: 4, option_text: "Sangat sesuai", score: 0 },
    ],
  },
    {
    id: 14,
    question_text: "Saya harus sering bertemu dengan dokter terkait perawatan diabetes saya.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 0 },
      { id: 2, option_text: "Cukup sesuai", score: 1 },
      { id: 3, option_text: "Sesuai", score: 2 },
      { id: 4, option_text: "Sangat sesuai", score: 3 },
    ],
  },
    {
    id: 15,
    question_text: "Saya cenderung melewatkan aktivitas fisik yang sudah direncanakan Perawatan diri terkait penyakit diabetes saya tergolong rendah.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 3 },
      { id: 2, option_text: "Cukup sesuai", score: 2 },
      { id: 3, option_text: "Sesuai", score: 1 },
      { id: 4, option_text: "Sangat sesuai", score: 0 },
    ],
  },
    {
    id: 16,
    question_text: "Perawatan diri terkait penyakit diabetes saya tergolong rendah.",
    options: [
      { id: 1, option_text: "Tidak sesuai", score: 3 },
      { id: 2, option_text: "Cukup sesuai", score: 2 },
      { id: 3, option_text: "Sesuai", score: 1 },
      { id: 4, option_text: "Sangat sesuai", score: 0 },
    ],
  },
];

export default function WorkScreeningDSMQWrapper() {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(staticQuestions.length).fill(-1)
  );
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const isAllAnswered = answers.every((val) => val !== -1);

  const mutation = useSubmitScreeningDSMQ({
    onSuccess: (res) => {
      toast.success("Berhasil submit hasil DSMQ!");
      router.replace(`/dashboard/history/screening-dsmq/${res.data.id}`);
    },
    onError: () => {
      toast.error("Gagal submit hasil DSMQ.");
    },
  });

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Jawaban Anda akan hilang jika meninggalkan halaman ini.";
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

    const answerPayload: SubmitScreeningDSMQValidatorType = {
      user_id: session.user.id,
      answers: staticQuestions.map((q, index) => ({
        question_id: q.id,
        score: answers[index],
      })),
    };

    mutation.mutate(answerPayload);
  };

  return (
    <>
      <SidebarProvider>
        <SidebarInset>
          <BreadcrumbWorkScreeningDSMQ
            onBack={() => {
              if (selectedQuestionIndex > 0) {
                setSelectedQuestionIndex((prev) => prev - 1);
              } else {
                router.push("/dashboard/diabetes-melitus");
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

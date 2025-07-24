// src/components/organisms/work/WorkScreeningHSMBQWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import DialogConfirmSubmit from "@/components/atoms/dialog/DialogConfirmSubmitPreTest";
import BreadcrumbWorkScreeningHSMBQ from "@/components/atoms/breadcrumb/BreadcrumbWorkScreeningHSMBQ";
import { useSubmitScreeningHSMBQ } from "@/http/screening-hsmbq/submit-screening-hsmbq";
import { SubmitScreeningHSMBQValidatorType } from "@/validators/screening-hsmbq/submit-screening-hsmbq-validator";

const staticQuestions = [
  {
    id: 1,
    question_text: "Saya mempertimbangkan porsi dan pilihan makanan ketika saya makan.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 2,
    question_text: "Saya makan buah, sayur, gandum, dan kacang-kacangan lebih banyak daripada yang saya makan saat saya tidak mengalami hipertensi.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 3,
    question_text: "Saya mengurangi makanan yang mengandung lemak jenuh (misalnya keju, minyak kelapa, daging kambing, dll.) semenjak didiagnosis hipertensi.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 4,
    question_text: "Saya memikirkan tekanan darah saya saat memilih makanan.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 5,
    question_text: "Saya mencoba berhenti minum minuman beralkohol.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 6,
    question_text: "Saya mengurangi porsi makanan setiap kali saya makan untuk menurunkan berat badan.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 7,
    question_text: "Saya memilih makanan rendah garam.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 8,
    question_text: "Saya berolahraga untuk menurunkan berat badan (misalnya jalan, joging/lari, atau bersepeda) sekitar 30-60 menit setiap hari.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 9,
    question_text: "Saya berpikir bahwa hipertensi adalah bagian dari hidup saya.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 10,
    question_text: "Saya melakukan rutinitas saya sesuai dengan hal-hal yang harus saya lakukan untuk mengontrol hipertensi saya (misalnya pekerjaan dan periksa ke dokter).",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 11,
    question_text: "Saya berhenti merokok / saya mencoba berhenti merokok.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 12,
    question_text: "Saya mencoba mengontrol emosi saya dengan mendengarkan musik, istirahat dan berbicara dengan keluarga atau teman saya.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 13,
    question_text: "Saya tidak pernah menggunakan garam yang berlebih untuk membumbui makanan semenjak saya terkena hipertensi.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 14,
    question_text: "Saya mengetahui kenapa tekanan darah saya berubah.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 15,
    question_text: "Saya mengenali tanda dan gejala tekanan darah tinggi.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 16,
    question_text: "Saya mengontrol tanda dan gejala hipertensi dengan tepat.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 17,
    question_text: "Saya mengenali tanda dan gejala tekanan darah rendah.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 18,
    question_text: "Saya mengontrol tanda dan gejala hipotensi (tekanan darah rendah) dengan tepat.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 19,
    question_text: "Saya menentukan tujuan saya untuk mengontrol tekanan darah.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 20,
    question_text: "Saya membuat rencana tindakan untuk mencapai tujuan saya mengontrol tekanan darah.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 21,
    question_text: "Saya membandingkan tekanan darah saya saat ini dengan tekanan darah yang saya targetkan (inginkan).",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 22,
    question_text: "Saya mengontrol keadaan yang mungkin dapat meningkatkan tekanan darah saya.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 23,
    question_text: "Saya mendiskusikan rencana pengobatan saya dengan dokter atau perawat.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 24,
    question_text: "Saya memberikan masukan pada dokter untuk mengubah rencana pengobatan jika saya tidak bisa menyesuaikan diri dengan rencana tersebut.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 25,
    question_text: "Saya bertanya pada dokter atau perawat ketika ada hal-hal yang tidak saya pahami.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 26,
    question_text: "Saya membantu dokter atau perawat mencari tahu kenapa tekanan darah saya tidak terkontrol dengan baik.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 27,
    question_text: "Saya mendiskusikan dengan dokter atau perawat saat tekanan darah saya terlalu tinggi atau rendah.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 28,
    question_text: "Saya bertanya pada dokter atau perawat dari mana saya bisa belajar lebih jauh tentang hipertensi.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 29,
    question_text: "Saya meminta bantuan orang lain (misal teman, tetangga atau pasien lain) terkait hipertensi yang saya alami.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 30,
    question_text: "Saya meminta bantuan orang lain (misal teman, tetangga atau pasien lain) untuk membantu mengontrol tekanan darah saya.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 31,
    question_text: "Saya bertanya pada orang lain (misal teman, tetangga atau pasien lain) apa cara yang mereka gunakan untuk mengontrol tekanan darah tinggi.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 32,
    question_text: "Saya pergi ke dokter untuk mengecek tekanan darah saya saat merasakan tanda dan gejala tekanan darah tinggi.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 33,
    question_text: "Saya pergi ke dokter untuk mengetahui tekanan darah saya saat saya merasa sakit.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 34,
    question_text: "Saya pergi ke dokter untuk mengecek tekanan darah saya saat merasakan tanda dan gejala tekanan darah rendah.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 35,
    question_text: "Saya mengecek tekanan darah saya secara teratur untuk membantu saya membuat keputusan manajemen diri.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 36,
    question_text: "Saya sangat ketat dalam minum obat anti-hipertensi.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 37,
    question_text: "Saya minum obat anti-hipertensi sesuai dengan dosis yang diberikan dokter.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 38,
    question_text: "Saya minum obat anti-hipertensi dalam waktu yang benar.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 39,
    question_text: "Saya periksa ke dokter sesuai dengan waktu yang dijadwalkan.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
  {
    id: 40,
    question_text: "Saya mengikuti saran dokter atau perawat dalam mengontrol tekanan darah saya.",
    options: [
      { id: 1, option_text: "Tidak dilakukan", score: 0 },
      { id: 2, option_text: "Tidak pernah", score: 1 },
      { id: 3, option_text: "Jarang", score: 2 },
      { id: 4, option_text: "Kadang-kadang", score: 3 },
      { id: 5, option_text: "Selalu", score: 4 },
    ],
  },
];

export default function WorkScreeningHSMBQWrapper() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(staticQuestions.length).fill(-1)
  );
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const isAllAnswered = answers.every((val) => val !== -1);

  const mutation = useSubmitScreeningHSMBQ({
    onSuccess: (res) => {
      toast.success("Berhasil submit hasil HSMBQ!");
      router.replace(`/dashboard/history/screening-hsmbq/${res.data.id}`);
    },
    onError: () => {
      toast.error("Gagal submit hasil HSMBQ.");
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

    const answerPayload: SubmitScreeningHSMBQValidatorType = {
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
          <BreadcrumbWorkScreeningHSMBQ
            onBack={() => {
              if (selectedQuestionIndex > 0) {
                setSelectedQuestionIndex((prev) => prev - 1);
              } else {
                router.push("/dashboard/hipertensi");
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

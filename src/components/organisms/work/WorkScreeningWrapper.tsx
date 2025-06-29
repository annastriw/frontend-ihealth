"use client";

import { useSession } from "next-auth/react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import BreadcrumbNavWork from "@/components/atoms/breadcrumb/BreadcrumbWork";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DialogConfirmSubmit from "@/components/atoms/dialog/DialogConfirmSubmitPreTest";
import { useGetDetailScreening } from "@/http/screening/get-detail-screening";
import { useAddSubmitScreening } from "@/http/screening/submit-screening";
import { SubmitScreening } from "@/types/screening/screening";
import { Button } from "@/components/ui/button";

interface WorkScreeningProps {
  id: string;
}

export default function WorkScreeningWrapper({ id }: WorkScreeningProps) {
  const { data: session, status } = useSession();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const openConfirmDialog = () => setConfirmDialogOpen(true);
  const closeConfirmDialog = () => setConfirmDialogOpen(false);
  const router = useRouter();

  const { data, isLoading } = useGetDetailScreening(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!session?.access_token,
    },
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Jawaban Anda akan hilang jika halaman direfresh.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const questions = data?.data?.questions ?? [];

  const [answers, setAnswers] = useState<SubmitScreening[]>([]);

  const { mutate: submitScreening } = useAddSubmitScreening({
    onSuccess: () => {
      toast.success("Screening berhasil disubmit!");
      router.push(`/dashboard/screening`);
    },
    onError: () => {
      toast.error("Gagal submit screening. Silakan coba lagi.");
    },
  });

  return (
    <>
      <SidebarProvider>
        <SidebarInset>
          {data?.data && (
            <BreadcrumbNavWork
              data={data.data}
              onBack={() => {
                if (selectedQuestionIndex > 0) {
                  setSelectedQuestionIndex((prev) => prev - 1);
                }
              }}
              currentIndex={selectedQuestionIndex}
              totalQuestions={data.data.questions.length}
            />
          )}
          <div className="pad-x-xl pt-28">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-10 w-full rounded-md" />
                  ))}
                </div>
              </div>
            ) : questions.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xl font-semibold capitalize">
                  {questions[selectedQuestionIndex].question_text}
                </p>

                <ul className="space-y-3">
                  {questions[selectedQuestionIndex].options.map((option) => {
                    const isSelected = answers.find(
                      (ans) =>
                        ans.question_id ===
                          questions[selectedQuestionIndex].id &&
                        ans.selected_option_id === option.id,
                    );

                    return (
                      <li
                        key={option.id}
                        className={`bg-muted hover:bg-primary/10 cursor-pointer rounded-md p-3 font-semibold capitalize hover:text-black ${
                          isSelected
                            ? "bg-primary/10 hover:bg-primary/10 border-primary border text-black"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => {
                          const updated = [...answers];
                          const existingIndex = updated.findIndex(
                            (a) =>
                              a.question_id ===
                              questions[selectedQuestionIndex].id,
                          );

                          if (existingIndex !== -1) {
                            updated[existingIndex].selected_option_id =
                              option.id;
                          } else {
                            updated.push({
                              question_id: questions[selectedQuestionIndex].id,
                              selected_option_id: option.id,
                            });
                          }

                          setAnswers(updated);

                          if (selectedQuestionIndex < questions.length - 1) {
                            setSelectedQuestionIndex((prev) => prev + 1);
                          }
                        }}
                      >
                        {option.option_text}
                      </li>
                    );
                  })}
                </ul>
                {selectedQuestionIndex === questions.length - 1 &&
                  answers.length === questions.length && (
                    <div className="pt-4">
                      <Button onClick={openConfirmDialog} className="w-full">
                        Selesai
                      </Button>
                    </div>
                  )}
              </div>
            ) : (
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-10 w-full rounded-md" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
      <DialogConfirmSubmit
        open={isConfirmDialogOpen}
        onClose={closeConfirmDialog}
        unansweredNumbers={questions
          .map((q, index) => ({
            number: index + 1,
            isAnswered: answers.some((a) => a.question_id === q.id),
          }))
          .filter((q) => !q.isAnswered)
          .map((q) => q.number)}
        onConfirm={() => {
          submitScreening({
            screening_id: id,
            answers,
          });
          setConfirmDialogOpen(false);
        }}
      />
    </>
  );
}

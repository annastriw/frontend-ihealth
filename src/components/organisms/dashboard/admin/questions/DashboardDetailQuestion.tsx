"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDetailQuestion } from "@/http/question/get-detail-question";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";

interface DashboardAdminDetailQuestionWrapperProps {
  id: string;
}

export default function DashboardAdminDetailQuestionWrapper({
  id,
}: DashboardAdminDetailQuestionWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailQuestion(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="leading-loose">
            {isPending ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <>
                <p>Pertanyaan</p>
                <p className="font-normal">{data?.data.question_text}</p>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-semibold">Opsi Jawaban</p>
          <div className="space-y-2">
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-5 w-full" />
                ))
              : data?.data.options.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <p
                      className={
                        option.is_correct ? "font-semibold text-green-500" : ""
                      }
                    >
                      {alphabet[index]}. {option.option_text}
                    </p>
                    {option.is_correct && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

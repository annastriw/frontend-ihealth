import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryPreTestDetail } from "@/types/test/pre-test";
import { Check, Plus } from "lucide-react";

interface CardListHistoryQuestionAdminProps {
  data?: HistoryPreTestDetail;
  isLoading?: boolean;
  searchQuery?: string;
}

export default function CardListHistoryQuestionAdmin({
  data,
  isLoading = false,
  searchQuery,
}: CardListHistoryQuestionAdminProps) {
  const optionLabels = ["A", "B", "C", "D", "E", "F"];

  const filteredAnswers = data?.answer.filter((answer) =>
    answer.question.toLowerCase().includes(searchQuery?.toLowerCase() || ""),
  );

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
      {filteredAnswers?.map((answer, index) => (
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
                      className={`flex gap-2 rounded-md ${
                        isSelected ? "text-green-500" : ""
                      }`}
                    >
                      <span className="font-semibold">
                        {optionLabels[idx] || String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{option.text}</span>
                      {isSelected && (
                        <div className="flex items-center gap-2">
                          <Check className="ml-1 h-4 w-4" />
                          <div className="flex items-center text-sm text-green-500">
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

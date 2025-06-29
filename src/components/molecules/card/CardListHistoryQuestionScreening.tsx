import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryPreTestDetail } from "@/types/test/pre-test";

interface CardListHistoryQuestionScreeningProps {
  data?: HistoryPreTestDetail;
  isLoading?: boolean;
  searchQuery?: string;
}

export default function CardListHistoryQuestionScreening({
  data,
  isLoading = false,
  searchQuery,
}: CardListHistoryQuestionScreeningProps) {
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
                      className={`flex items-center gap-2 rounded-md ${
                        isSelected ? "text-green-600" : ""
                      }`}
                    >
                      <span className="font-semibold">
                        {optionLabels[idx] || String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{option.text}</span>
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

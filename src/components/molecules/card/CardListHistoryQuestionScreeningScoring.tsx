// src/components/molecules/card/CardListHistoryQuestionScreeningScoring.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Plus } from "lucide-react";

interface Option {
  id: string;
  text: string;
  score: number;
}

interface Answer {
  question: string;
  options: Option[];
  selected_option: Option;
  answer_text?: string | null;
}

interface Props {
  answers: Answer[];
  isLoading?: boolean;
  searchQuery?: string;
  score?: number;
}

export default function CardListHistoryQuestionScreeningScoring({
  answers = [],
  isLoading = false,
  searchQuery = "",
  score,
}: Props) {
  const optionLabels = ["A", "B", "C", "D", "E", "F"];

  const filteredAnswers = answers.filter((answer) =>
    answer.question.toLowerCase().includes(searchQuery.toLowerCase()),
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
      {filteredAnswers.map((answer, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-xl">{index + 1}.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h1 className="font-medium">{answer.question}</h1>
              <div className="space-y-2">
                {answer.options.map((option, idx) => {
                  const isSelected = option.id === answer.selected_option?.id;
                  return (
                    <div
                      key={option.id}
                      className={`flex items-center gap-2 rounded-md ${
                        isSelected ? "text-green-600 font-semibold" : ""
                      }`}
                    >
                      <span>
                        {optionLabels[idx] || String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{option.text}</span>
                      {isSelected && (
                        <div className="flex items-center gap-2 text-sm text-green-600 ml-2">
                          <Check className="h-4 w-4" />
                          <span className="flex items-center gap-1">
                            <Plus className="h-4 w-4" />
                            {option.score}
                          </span>
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

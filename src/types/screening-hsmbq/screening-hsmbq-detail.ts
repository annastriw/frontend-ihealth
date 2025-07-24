export type LevelHSMBQ = "Kurang" | "Cukup" | "Baik";

export interface ScreeningHSMBQDetail {
  id: string;
  created_at: string;
  score: number;
  interpretation: LevelHSMBQ;
  description: string;
  answers: {
    question_id: number;
    score: number;
    question_text: string;
  }[];
}

export type LevelHSMBQ = "Kurang" | "Cukup" | "Baik";

export interface User {
  id: string;
  name: string;
}

export interface Answer {
  question_id: number;
  score: number;
  question_text: string;
}

export interface ScreeningHSMBQDetail {
  id: string;
  created_at: string;
  user: User;
  score: number;
  interpretation: LevelHSMBQ;
  description: string;
  answers: Answer[];
}

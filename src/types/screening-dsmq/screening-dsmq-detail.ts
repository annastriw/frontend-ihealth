export type LevelDSMQ = "Buruk" | "Cukup" | "Baik";

export interface User {
  id: string;
  name: string;
}

export interface Answer {
  question_id: number;
  score: number;
  question_text: string;
}

export interface ScreeningDSMQDetail {
  id: string;
  created_at: string;
  user: User | null;
  score: number;
  interpretation: LevelDSMQ;
  description: string;
  answers: Answer[];
}

export type LevelDSMQ = "Buruk" | "Cukup" | "Baik";

export interface ScreeningDSMQDetail {
  id: string;
  created_at: string;
  score: number;
  interpretation: LevelDSMQ;
  description: string;
  answers: {
    question_id: number;
    score: number;
    question_text: string;
  }[];
}

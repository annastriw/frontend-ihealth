export interface AdminScreeningDSMQHistoryItem {
  history_id: string;
  submitted_at: string;
  user_id: string;
  name: string;
  email: string;
}

export interface AdminScreeningDSMQDetail {
  id: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  score: number;
  interpretation: string;
  description: string;
  answers: AdminScreeningDSMQAnswer[];
}

export interface AdminScreeningDSMQAnswer {
  question_id: number;
  score: number;
  question_text: string;
}

export type DSMQInterpretationLevel = "Buruk" | "Cukup" | "Baik";

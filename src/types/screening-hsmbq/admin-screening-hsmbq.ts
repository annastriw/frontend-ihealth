// src/types/screening-hsmbq/admin-screening-hsmbq.ts

export interface AdminScreeningHSMBQHistoryItem {
  history_id: string;
  submitted_at: string;
  user_id: string;
  name: string;
  email: string;
}

export interface AdminScreeningHSMBQDetail {
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
  answers: AdminScreeningHSMBQAnswer[];
}

export interface AdminScreeningHSMBQAnswer {
  question_id: number;
  score: number;
  question_text: string;
}

export type HSMBQInterpretationLevel = "Kurang" | "Cukup" | "Baik";

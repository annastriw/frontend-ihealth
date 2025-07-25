// src/types/screening-dass/admin-screening-dass.ts

export interface AdminScreeningDASSHistoryItem {
  history_id: string;
  submitted_at: string;
  user_id: string;
  name: string;
  email: string;
}

export interface AdminScreeningDASSDetail {
  id: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  scores: Record<"Depresi" | "Kecemasan" | "Stres", number>;
  interpretation: Record<"Depresi" | "Kecemasan" | "Stres", string>;
  descriptions: Record<"Depresi" | "Kecemasan" | "Stres", string>;
  answers: AdminScreeningDASSAnswer[];
}

export interface AdminScreeningDASSAnswer {
  question_id: number;
  category: "Depresi" | "Kecemasan" | "Stres";
  score: number;
  question_text: string;
}

export type Level = "Normal" | "Ringan" | "Sedang" | "Parah" | "Sangat Parah";

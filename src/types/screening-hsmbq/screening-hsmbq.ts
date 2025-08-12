// src/types/screening-hsmbq/screening-hsmbq.ts

export interface ScreeningHSMBQ {
  id: string;
  name: string;
  // tambahkan jika perlu, misalnya: description, etc.
}

export interface UserHistoryScreeningHSMBQ {
  id: string;
  screening: ScreeningHSMBQ;
  created_at: string;
  // tambahkan jika perlu
}

export interface UserHistoryScreeningHSMBQDetail {
  id: number;
  user_id: string;
  answers: number[];
  created_at: string;
}

export type ScreeningHSMBQAnswer = {
  question_id: number;
  score: number;
};

export type HSMBQInterpretation = "Kurang" | "Cukup" | "Baik";

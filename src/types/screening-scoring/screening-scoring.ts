// src/types/screening-scoring/screening-scoring.ts

import { Question } from "../questions/question";
import { User } from "../user/user";

/**
 * Tipe Screening Scoring untuk PASIEN
 */
export type ScreeningScoring = {
  id: string;
  name: string;
  type: "HT" | "DM";
  created_at: Date;
  updated_at: Date;
};

export type ScreeningScoringDetail = {
  id: string;
  name: string;
  type: "HT" | "DM";
  questions: Question[];
};

/**
 * Jawaban pasien saat submit screening scoring
 */
export type SubmitScreeningScoring = {
  screening_scoring_id: string;
  answers: {
    question_id: string;
    selected_option_id: string;
  }[];
};

/**
 * Riwayat pengerjaan screening scoring oleh user login
 */
export type UserHistoryScreeningScoring = {
  id: string;
  created_at: Date;
  screening: ScreeningScoring;
  user: User;
};

/**
 * Detail jawaban dan skor pada riwayat screening scoring
 */
export type UserAnswerOption = {
  id: string;
  text: string;
  score: number;
};

export type UserAnswerQuestion = {
  id: string;
  question: string;
  options: UserAnswerOption[];
  selected_option: UserAnswerOption;
};

export type UserHistoryScreeningScoringDetail = {
  id: string;
  sum_score: number;
  created_at: Date;
  answer: UserAnswerQuestion[];
  user: User;
};

/**
 * Tipe untuk ADMIN saat melihat semua riwayat pengguna
 */
export type AdminUserHistoryScreeningScoring = {
  id: string;
  created_at: Date;
  user: User;
  screening: ScreeningScoring;
};

export type AdminUserHistoryScreeningScoringByScreening = {
  id: string;
  created_at: Date;
  user: User;
};


import { Question } from "../questions/question";
import { User } from "../user/user";

/**
 * Tipe Screening Scoring untuk PASIEN dan ADMIN
 */
export type ScreeningScoring = {
  id: string;
  question_set_id: string;
  name: string;
  type: "HT" | "DM";
  created_at: string | Date;
  updated_at: string | Date;
};

/**
 * Detail screening scoring (untuk pasien saat kerjakan)
 * ✅ DISAMAKAN DENGAN RESPONSE API: tambahkan `question_set.questions`
 */
export type ScreeningScoringDetail = {
  id: string;
  question_set_id: string;
  name: string;
  type: "HT" | "DM";
  created_at: string | Date;
  updated_at: string | Date;
  question_set: {
    id: string;
    name: string;
    created_at: string | Date;
    updated_at: string | Date;
    questions: Question[];
  };
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
  created_at: string | Date;
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
  created_at: string | Date;
  answers: UserAnswerQuestion[];
  user: User;
};

/**
 * Tipe untuk ADMIN saat melihat semua riwayat pengguna
 */
export type AdminUserHistoryScreeningScoring = {
  id: string;
  created_at: string | Date;
  user: User;
  screening: ScreeningScoring;
};

export interface AdminUserHistoryScreeningScoringByScreening {
  id: string;
  screening_scoring_id: string; // ✅ penting untuk link
  user: {
    id: string;
    name: string;
  };
  score: number; // ✅ skor hasil screening
  created_at: string;
  updated_at: string;
}

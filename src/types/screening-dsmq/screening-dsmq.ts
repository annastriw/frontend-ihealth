export interface ScreeningDSMQ {
  id: string;
  name: string;
  // tambahkan jika perlu, misalnya: description, etc.
}

export interface UserHistoryScreeningDSMQ {
  id: string;
  screening: ScreeningDSMQ;
  created_at: string;
  // tambahkan jika perlu
}

export interface UserHistoryScreeningDSMQDetail {
  id: number;
  user_id: string;
  answers: number[];
  created_at: string;
}

export type ScreeningDSMQAnswer = {
  question_id: number;
  score: number;
};

export type DSMQInterpretation = "Buruk" | "Cukup" | "Baik";

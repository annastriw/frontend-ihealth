import { Question } from "../questions/question";
import { User } from "../user/user";

export type Screening = {
  id: string;
  question_set_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type ScreeningDetail = {
  id: string;
  name: string;
  questions: Question[];
};

export type SubmitScreening = {
  question_id: string;
  selected_option_id: string;
};

export type HistoryScreening = {
  id: string;
  created_at: Date;
  screening: Screening;
  user: User;
};

export type HistoryOptionAnswer = {
  id: string;
  text: string;
  score: number;
};

export type SelectionOption = {
  id: string;
  text: string;
  score: number;
};

export type HistoryQuestionAnswer = {
  id: string;
  question: string;
  options: HistoryOptionAnswer[];
  selected_option: SelectionOption;
};

export type HistoryScreeningDetail = {
  id: string;
  sum_score: number;
  created_at: Date;
  answer: HistoryQuestionAnswer[];
  user: User;
};

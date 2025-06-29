import { SubModules } from "../modules/modules";
import { User } from "../user/user";

export type PreTest = {
  id: string;
  module_id: string;
  sub_module_id: string;
  question_set_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  sub_module: SubModules;
};

export type SubmitPreTest = {
  question_id: string;
  selected_option_id: string;
};

export type HistoryPreTest = {
  id: string;
  sum_score: number;
  created_at: Date;
  pre_test: PreTest;
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

export type HistoryPreTestDetail = {
  id: string;
  sum_score: number;
  created_at: Date;
  answer: HistoryQuestionAnswer[];
  user: User;
};

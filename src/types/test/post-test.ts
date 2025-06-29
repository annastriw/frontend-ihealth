import { SubModules } from "../modules/modules";
import { User } from "../user/user";

export type PostTest = {
  id: string;
  module_id: string;
  sub_module_id: string;
  question_set_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  sub_module: SubModules;
};

export type HistoryPostTest = {
  id: string;
  sum_score: number;
  created_at: Date;
  post_test: PostTest;
  user: User;
};

export type SubmitPostTest = {
  question_id: string;
  selected_option_id: string;
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

export type HistoryPostTestDetail = {
  id: string;
  sum_score: number;
  created_at: Date;
  answer: HistoryQuestionAnswer[];
  user: User;
};

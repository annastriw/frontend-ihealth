import { Question } from "../questions/question";

export type QuestionBank = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type QuestionBankDetail = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  questions: Question[];
};

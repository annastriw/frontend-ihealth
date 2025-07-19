import { Question } from "../questions/question";

export type ScreeningScoringDetail = {
  id: string;
  question_set_id: string;
  name: string;
  type: "HT" | "DM";
  questions: Question[]; // diasumsikan ini berasal dari relasi question_set
  created_at: string;
  updated_at: string;
};

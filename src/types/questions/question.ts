export type Question = {
  id: string;
  question_set_id: string;
  type: string;
  question_text: string;
  answer_key: string;
  created_at: Date;
  updated_at: Date;
  options: Options[];
};

export type Options = {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  score: number | null;
  created_at: Date;
  updated_at: Date;
  option_index: number;
};

import { SubModules } from "../modules/modules";
import { Question } from "../questions/question";

export type TesDetail = {
  id: string;
  module_id: string;
  question_set_id: string;
  subModule: SubModules;
  name: string;
  questions: Question[];
};

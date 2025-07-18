export type Level = "Normal" | "Ringan" | "Sedang" | "Parah" | "Sangat Parah";

export interface ScreeningDASSDetail {
  id: string;
  created_at: string;
  scores: {
    depression: number;
    anxiety: number;
    stress: number;
  };
  interpretations: {
    depression: Level;
    anxiety: Level;
    stress: Level;
  };
  descriptions: {
    depression: string;
    anxiety: string;
    stress: string;
  };
  answers: {
    question_id: number;
    category: "Depresi" | "Kecemasan" | "Stres";
    score: number;
    question_text: string;
  }[];
}

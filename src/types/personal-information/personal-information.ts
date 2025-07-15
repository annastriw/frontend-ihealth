// src/types/personal-information/personal-information.ts
export type PersonalInformation = {
  id: string;
  user_id: string;
  name: string;
  place_of_birth: string;
  date_of_birth: Date;
  age: string;
  work: string;
  gender: "0" | "1";
  is_married: boolean;
  last_education: string;
  origin_disease: string;

  disease_duration: string;
  history_therapy: string;
  smoking_history:
    | "perokok aktif"
    | "mantan perokok"
    | "tidak pernah merokok"
    | "tidak ada informasi";
  bmi: string;
  heart_disease_history: "0" | "1";
  height: string;
  weight: string;
};

export type CheckPersonalInformation = {
  is_completed: boolean;
};

export type PersonalInformation = {
  id: string;
  user_id: string;
  name: string;
  place_of_birth: string;
  date_of_birth: Date;
  age: string;
  work: string;
  gender: string;
  is_married: boolean;
  last_education: string;
  origin_disease: string;
  patient_type: string;
  disease_duration: string;
  history_therapy: string;
};

export type CheckPersonalInformation = {
  is_completed: boolean;
};

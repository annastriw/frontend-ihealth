export interface User {
  id: string;
  login: string;
  username: string;
  phone_number: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  disease_type: "HT" | "DM" | "KM" | "";
}

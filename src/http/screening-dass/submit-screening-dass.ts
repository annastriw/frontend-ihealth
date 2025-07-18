import axios from "axios";

export type DASSCategory = "Stres" | "Kecemasan" | "Depresi";

export interface ScreeningDASSAnswer {
  question_id: number;
  answer: number;
  type: DASSCategory;
}

export interface SubmitScreeningDASSRequest {
  answers: ScreeningDASSAnswer[];
}

export interface SubmitScreeningDASSResponse {
  history_id: number;
}

export async function submitScreeningDASS(
  token: string,
  data: SubmitScreeningDASSRequest
): Promise<SubmitScreeningDASSResponse> {
  const response = await axios.post("/api/screening-dass", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

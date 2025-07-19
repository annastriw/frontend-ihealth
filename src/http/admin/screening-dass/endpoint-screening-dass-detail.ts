import axios from "axios";
import { ScreeningDASSDetail } from "@/types/screening-dass/screening-dass-detail";

export async function getScreeningDASSDetail(
  id: string,
  token: string,
): Promise<ScreeningDASSDetail> {
  const res = await axios.get(
    `http://localhost:8000/api/admin/screening-dass-histories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = res.data.data;

  return {
    id: data.id,
    created_at: data.created_at,
    scores: {
      depression: data.scores.Depresi,
      anxiety: data.scores.Kecemasan,
      stress: data.scores.Stres,
    },
    interpretations: {
      depression: data.interpretation.Depresi,
      anxiety: data.interpretation.Kecemasan,
      stress: data.interpretation.Stres,
    },
    descriptions: {
      depression: data.descriptions.Depresi,
      anxiety: data.descriptions.Kecemasan,
      stress: data.descriptions.Stres,
    },
    answers: data.answers,
  };
}

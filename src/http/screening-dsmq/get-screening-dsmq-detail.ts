// src/http/screening-dsmq/get-screening-dsmq-detail.ts
import axios from "axios";
import { ScreeningDSMQDetail } from "@/types/screening-dsmq/screening-dsmq-detail";

export async function getScreeningDSMQDetail(
  id: string,
  token: string,
): Promise<ScreeningDSMQDetail> {
  const res = await axios.get(
    `http://localhost:8000/api/screening-dsmq-histories/${id}`,
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
    score: data.score,
    interpretation: data.interpretation,
    description: data.description,
    answers: data.answers,
  };
}

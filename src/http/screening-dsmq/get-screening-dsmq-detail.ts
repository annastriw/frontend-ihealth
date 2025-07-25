// src/http/screening-dsmq/get-screening-dsmq-detail.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { ScreeningDSMQDetail } from "@/types/screening-dsmq/screening-dsmq-detail";

export async function getScreeningDSMQDetail(
  id: string,
  token: string,
): Promise<ScreeningDSMQDetail> {
  const res = await api.get(`/screening-dsmq-histories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
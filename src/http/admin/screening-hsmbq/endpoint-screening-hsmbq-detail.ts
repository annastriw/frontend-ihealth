// src/http/admin/screening-hsmbq/endpoint-screening-hsmbq-detail.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { ScreeningHSMBQDetail } from "@/types/screening-hsmbq/screening-hsmbq-detail";

export async function getScreeningHSMBQDetail(
  id: string,
  token: string,
): Promise<ScreeningHSMBQDetail> {
  const res = await api.get(`/admin/screening-hsmbq-histories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = res.data.data;

  return {
    id: data.id,
    created_at: data.created_at,
    user: {
      id: data.user.id,
      name: data.user.name,
    },
    score: data.score,
    interpretation: data.interpretation,
    description: data.description,
    answers: data.answers,
  };
}

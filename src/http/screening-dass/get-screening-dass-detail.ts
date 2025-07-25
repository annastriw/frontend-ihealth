// src/http/screening-dass/get-screening-dass-detail.ts

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { ScreeningDASSDetail } from "@/types/screening-dass/screening-dass-detail";

export async function getScreeningDASSDetail(
  id: string,
  token: string,
): Promise<ScreeningDASSDetail> {
  const res = await api.get(`/screening-dass-histories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
// src/http/screening-scoring/submit-screening-scoring.ts

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { SubmitScreeningScoringType } from "@/validators/screening-scoring/submit-screening-scoring-validator";
import { UserHistoryScreeningScoringDetail } from "@/types/screening-scoring/screening-scoring";

interface SubmitScreeningScoringResponse {
  history_id: string;
  data: UserHistoryScreeningScoringDetail;
}

/**
 * Handler POST /screening-scorings/submit
 */
export const submitScreeningScoringHandler = async (
  body: SubmitScreeningScoringType,
  token: string
): Promise<SubmitScreeningScoringResponse> => {
  const { data } = await api.post("/screening-scorings/submit", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

/**
 * Hook React Query untuk submit screening scoring
 */
export const useSubmitScreeningScoring = (
  options?: UseMutationOptions<
    SubmitScreeningScoringResponse,
    AxiosError<SubmitScreeningScoringResponse>,
    SubmitScreeningScoringType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: SubmitScreeningScoringType) =>
      submitScreeningScoringHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

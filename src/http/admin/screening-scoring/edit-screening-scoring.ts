// src/http/admin/screening-scoring/edit-screening-scoring.ts

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ScreeningScoringType } from "@/validators/screening-scoring/screening-scoring-validator";
import { ScreeningScoring } from "@/types/screening-scoring/screening-scoring";

interface EditScreeningScoringResponse {
  data: ScreeningScoring;
}

/**
 * Handler PUT /screening-scorings/{id}
 */
export const editScreeningScoringHandler = async (
  id: string,
  body: ScreeningScoringType,
  token: string
): Promise<EditScreeningScoringResponse> => {
  const { data } = await api.put(`/screening-scorings/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

/**
 * Hook React Query untuk Admin: edit screening scoring
 */
export const useEditScreeningScoring = (
  options?: UseMutationOptions<
    EditScreeningScoringResponse,
    AxiosError,
    { id: string; body: ScreeningScoringType }
  >
) => {
  const { data: sessionData } = useSession();

  return useMutation({
    mutationFn: ({ id, body }) =>
      editScreeningScoringHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};

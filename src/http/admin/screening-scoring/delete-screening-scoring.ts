// src/http/admin/screening-scoring/delete-screening-scoring.ts

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ScreeningScoring } from "@/types/screening-scoring/screening-scoring";

interface DeleteScreeningScoringPayload {
  id: string;
  token: string;
}

interface DeleteScreeningScoringResponse {
  data: ScreeningScoring;
}

/**
 * Handler DELETE /screening-scorings/{id} (Admin)
 */
export const deleteScreeningScoringHandler = async ({
  id,
  token,
}: DeleteScreeningScoringPayload): Promise<DeleteScreeningScoringResponse> => {
  const { data } = await api.delete(`/screening-scorings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

/**
 * Hook React Query untuk Admin: hapus screening scoring
 */
export const useDeleteScreeningScoring = (
  options?: UseMutationOptions<
    DeleteScreeningScoringResponse,
    AxiosError,
    DeleteScreeningScoringPayload
  >
) => {
  return useMutation({
    mutationFn: deleteScreeningScoringHandler,
    ...options,
  });
};

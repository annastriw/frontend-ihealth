// src/http/history/screening-scoring/delete-history-screening-scoring.ts

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { UserHistoryScreeningScoring } from "@/types/screening-scoring/screening-scoring";

interface DeleteUserHistoryScreeningScoringPayload {
  id: string;
  token: string;
}

interface DeleteUserHistoryScreeningScoringResponse {
  data: UserHistoryScreeningScoring;
}

/**
 * Handler DELETE /history/screening-scorings/users/history/{id}
 */
export const deleteUserHistoryScreeningScoringHandler = async ({
  id,
  token,
}: DeleteUserHistoryScreeningScoringPayload): Promise<DeleteUserHistoryScreeningScoringResponse> => {
  const { data } = await api.delete(
    `/history/screening-scorings/users/history/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

/**
 * Hook React Query untuk menghapus satu riwayat screening scoring user (admin)
 */
export const useDeleteUserHistoryScreeningScoring = (
  options?: UseMutationOptions<
    DeleteUserHistoryScreeningScoringResponse,
    AxiosError,
    DeleteUserHistoryScreeningScoringPayload
  >
) => {
  return useMutation({
    mutationFn: deleteUserHistoryScreeningScoringHandler,
    ...options,
  });
};

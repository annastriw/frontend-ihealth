import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryScreening } from "@/types/screening/screening";

interface DeleteUserHistoryScreeningPayload {
  id: string;
  token: string;
}

interface DeleteUserHistoryScreeningResponse {
  data: HistoryScreening;
}

export const DeleteUserHistoryScreeningHandler = async ({
  id,
  token,
}: DeleteUserHistoryScreeningPayload): Promise<DeleteUserHistoryScreeningResponse> => {
  const { data } = await api.delete(`/history/screening/users/history/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteUserHistoryScreening = (
  options?: UseMutationOptions<
    DeleteUserHistoryScreeningResponse,
    AxiosError,
    DeleteUserHistoryScreeningPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteUserHistoryScreeningHandler,
    ...options,
  });
};

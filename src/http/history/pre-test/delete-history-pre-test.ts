import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryPreTest } from "@/types/test/pre-test";

interface DeleteUserHistoryPreTestPayload {
  id: string;
  token: string;
}

interface DeleteUserHistoryPreTestResponse {
  data: HistoryPreTest;
}

export const DeleteUserHistoryPreTestHandler = async ({
  id,
  token,
}: DeleteUserHistoryPreTestPayload): Promise<DeleteUserHistoryPreTestResponse> => {
  const { data } = await api.delete(`/history/pre-test/users/history/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteUserHistoryPreTest = (
  options?: UseMutationOptions<
    DeleteUserHistoryPreTestResponse,
    AxiosError,
    DeleteUserHistoryPreTestPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteUserHistoryPreTestHandler,
    ...options,
  });
};

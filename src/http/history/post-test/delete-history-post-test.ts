import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { HistoryPostTest } from "@/types/test/post-test";

interface DeleteUserHistoryPostTestPayload {
  id: string;
  token: string;
}

interface DeleteUserHistoryPostTestResponse {
  data: HistoryPostTest;
}

export const DeleteUserHistoryPostTestHandler = async ({
  id,
  token,
}: DeleteUserHistoryPostTestPayload): Promise<DeleteUserHistoryPostTestResponse> => {
  const { data } = await api.delete(`/history/post-test/users/history/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteUserHistoryPostTest = (
  options?: UseMutationOptions<
    DeleteUserHistoryPostTestResponse,
    AxiosError,
    DeleteUserHistoryPostTestPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteUserHistoryPostTestHandler,
    ...options,
  });
};

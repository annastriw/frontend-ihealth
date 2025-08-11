import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { PreTest } from "@/types/test/pre-test";

interface DeletePreTestPayload {
  id: string;
  token: string;
}

interface DeletePreTestResponse {
  data: PreTest;
}

export const DeletePreTestHandler = async ({
  id,
  token,
}: DeletePreTestPayload): Promise<DeletePreTestResponse> => {
  const { data } = await api.delete(`/pre-test/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeletePreTest = (
  options?: UseMutationOptions<
    DeletePreTestResponse,
    AxiosError,
    DeletePreTestPayload
  >,
) => {
  return useMutation({
    mutationFn: DeletePreTestHandler,
    ...options,
  });
};

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { PostTest } from "@/types/test/post-test";

interface DeletePostTestPayload {
  id: string;
  token: string;
}

interface DeletePostTestResponse {
  data: PostTest;
}

export const DeletePostTestHandler = async ({
  id,
  token,
}: DeletePostTestPayload): Promise<DeletePostTestResponse> => {
  const { data } = await api.delete(`/post-test/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeletePostTest = (
  options?: UseMutationOptions<
    DeletePostTestResponse,
    AxiosError,
    DeletePostTestPayload
  >,
) => {
  return useMutation({
    mutationFn: DeletePostTestHandler,
    ...options,
  });
};

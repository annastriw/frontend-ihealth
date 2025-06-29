import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface DeleteUserPayload {
  id: string;
  token: string;
}

interface DeleteUserResponse {
  data: User;
}

export const DeleteUserHandler = async ({
  id,
  token,
}: DeleteUserPayload): Promise<DeleteUserResponse> => {
  const { data } = await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteUser = (
  options?: UseMutationOptions<
    DeleteUserResponse,
    AxiosError,
    DeleteUserPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteUserHandler,
    ...options,
  });
};

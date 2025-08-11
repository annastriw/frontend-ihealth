import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { User } from "@/types/user/user";

interface ResetPasswordUsersHandlerParams {
  id: string;
}

interface ResetPasswordUsersResponse {
  data: User;
}

export const addResetPasswordUsersHandler = async (
  params: ResetPasswordUsersHandlerParams,
  token: string,
): Promise<ResetPasswordUsersResponse> => {
  const { id } = params;
  const { data } = await api.post(
    `/users/${id}/reset-password`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

export const useAddResetPasswordUsers = (
  options?: UseMutationOptions<
    ResetPasswordUsersResponse,
    AxiosError<ResetPasswordUsersResponse>,
    ResetPasswordUsersHandlerParams
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (params) =>
      addResetPasswordUsersHandler(params, sessionData?.access_token as string),
    ...options,
  });
};

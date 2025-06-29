import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { UpdateAccountType } from "@/validators/auth/update-account-validator";
import { User } from "@/types/user/user";

interface UpdateAccountResponse {
  data: User;
}

export const updateAccountHandler = async (
  body: UpdateAccountType,
  token: string,
): Promise<UpdateAccountResponse> => {
  const { data } = await api.put("/auth/update-account", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateAccount = (
  options?: UseMutationOptions<
    UpdateAccountResponse,
    AxiosError<UpdateAccountResponse>,
    UpdateAccountType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: UpdateAccountType) =>
      updateAccountHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

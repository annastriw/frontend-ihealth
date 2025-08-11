import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PreTestType } from "@/validators/test/pre-test-validator";
import { PreTest } from "@/types/test/pre-test";

interface EditPreTestResponse {
  data: PreTest;
}

export const EditPreTestHandler = async (
  id: string,
  body: PreTestType,
  token: string,
): Promise<EditPreTestResponse> => {
  const { data } = await api.put(`/pre-test/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditPreTest = (
  options?: UseMutationOptions<
    EditPreTestResponse,
    AxiosError,
    { id: string; body: PreTestType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      EditPreTestHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};

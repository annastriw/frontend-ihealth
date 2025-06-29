import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PreTest } from "@/types/test/pre-test";
import { PreTestType } from "@/validators/test/pre-test-validator";

interface NewPreTestResponse {
  data: PreTest;
}

export const addNewPreTestHandler = async (
  body: PreTestType,
  token: string,
): Promise<NewPreTestResponse> => {
  const { data } = await api.post("/pre-test", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewPreTest = (
  options?: UseMutationOptions<
    NewPreTestResponse,
    AxiosError<NewPreTestResponse>,
    PreTestType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: PreTestType) =>
      addNewPreTestHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

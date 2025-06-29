import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PreTest } from "@/types/test/pre-test";
import { SubmitPreTestType } from "@/validators/test/submit-pre-test-validator";

interface SubmitPretestResponse {
  data: PreTest;
}

export const addSubmitPretestHandler = async (
  body: SubmitPreTestType,
  token: string,
): Promise<SubmitPretestResponse> => {
  const { data } = await api.post("/pre-test/submit", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddSubmitPretest = (
  options?: UseMutationOptions<
    SubmitPretestResponse,
    AxiosError<SubmitPretestResponse>,
    SubmitPreTestType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: SubmitPreTestType) =>
      addSubmitPretestHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

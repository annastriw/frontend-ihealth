import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PreTest } from "@/types/test/pre-test";
import { SubmitPostTestType } from "@/validators/test/submit-post-test-validator";

interface SubmitPostTestResponse {
  data: PreTest;
}

export const addSubmitPostTestHandler = async (
  body: SubmitPostTestType,
  token: string,
): Promise<SubmitPostTestResponse> => {
  const { data } = await api.post("/post-test/submit", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddSubmitPostTest = (
  options?: UseMutationOptions<
    SubmitPostTestResponse,
    AxiosError<SubmitPostTestResponse>,
    SubmitPostTestType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: SubmitPostTestType) =>
      addSubmitPostTestHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

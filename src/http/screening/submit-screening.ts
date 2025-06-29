import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { SubmitScreeningType } from "@/validators/screening/submit-screening-validator";
import { Screening } from "@/types/screening/screening";

interface SubmitScreeningResponse {
  data: Screening;
}

export const addSubmitScreeningHandler = async (
  body: SubmitScreeningType,
  token: string,
): Promise<SubmitScreeningResponse> => {
  const { data } = await api.post("/screening/submit", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddSubmitScreening = (
  options?: UseMutationOptions<
    SubmitScreeningResponse,
    AxiosError<SubmitScreeningResponse>,
    SubmitScreeningType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: SubmitScreeningType) =>
      addSubmitScreeningHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

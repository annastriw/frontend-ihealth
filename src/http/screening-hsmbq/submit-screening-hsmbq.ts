// src/http/screening-hsmbq/submit-screening-hsmbq.ts
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubmitScreeningHSMBQValidatorType } from "@/validators/screening-hsmbq/submit-screening-hsmbq-validator";

export interface SubmitScreeningHSMBQResponse {
  data: {
    id: string; // UUID hasil screening
  };
}

export const submitScreeningHSMBQHandler = async (
  body: SubmitScreeningHSMBQValidatorType,
): Promise<SubmitScreeningHSMBQResponse> => {
  const { data } = await api.post("/screening-hsmbq/submit", body); // no token
  return data;
};

export const useSubmitScreeningHSMBQ = (
  options?: UseMutationOptions<
    SubmitScreeningHSMBQResponse,
    AxiosError<SubmitScreeningHSMBQResponse>,
    SubmitScreeningHSMBQValidatorType
  >,
) => {
  return useMutation({
    mutationFn: submitScreeningHSMBQHandler,
    ...options,
  });
};

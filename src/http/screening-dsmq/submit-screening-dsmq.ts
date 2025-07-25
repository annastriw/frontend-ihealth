// src/http/screening-dsmq/submit-screening-dsmq.ts
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubmitScreeningDSMQValidatorType } from "@/validators/screening-dsmq/submit-screening-dsmq-validator";

export interface SubmitScreeningDSMQResponse {
  data: {
    id: string; // UUID hasil screening
  };
}

export const submitScreeningDSMQHandler = async (
  body: SubmitScreeningDSMQValidatorType,
): Promise<SubmitScreeningDSMQResponse> => {
  const { data } = await api.post("/screening-dsmq/submit", body); // no token
  return data;
};

export const useSubmitScreeningDSMQ = (
  options?: UseMutationOptions<
    SubmitScreeningDSMQResponse,
    AxiosError<SubmitScreeningDSMQResponse>,
    SubmitScreeningDSMQValidatorType
  >,
) => {
  return useMutation({
    mutationFn: submitScreeningDSMQHandler,
    ...options,
  });
};

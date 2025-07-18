// ❌ JANGAN pakai session token untuk authorization
// ✅ LANGSUNG kirim user_id dari form / props

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubmitScreeningDASSValidatorType } from "@/validators/screening-dass/submit-screening-dass-validator";
import { UserHistoryScreeningDASSDetail } from "@/types/screening-dass/screening-dass";

// Response dari backend
export interface SubmitScreeningDASSResponse {
  historyId: number;
  data: UserHistoryScreeningDASSDetail;
}

// Fungsi POST
export const submitScreeningDASSHandler = async (
  body: SubmitScreeningDASSValidatorType
): Promise<SubmitScreeningDASSResponse> => {
  const { data } = await api.post("/screening-dass/submit", body); // no token needed
  return data;
};

// React Query Hook
export const useSubmitScreeningDASS = (
  options?: UseMutationOptions<
    SubmitScreeningDASSResponse,
    AxiosError<SubmitScreeningDASSResponse>,
    SubmitScreeningDASSValidatorType
  >
) => {
  return useMutation({
    mutationFn: submitScreeningDASSHandler,
    ...options,
  });
};

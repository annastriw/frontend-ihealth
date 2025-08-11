import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Screening } from "@/types/screening/screening";
import { ScreeningType } from "@/validators/screening/screening-validator";

interface EditScreeningResponse {
  data: Screening;
}

export const EditScreeningHandler = async (
  id: string,
  body: ScreeningType,
  token: string,
): Promise<EditScreeningResponse> => {
  const { data } = await api.put(`/screening/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditScreening = (
  options?: UseMutationOptions<
    EditScreeningResponse,
    AxiosError,
    { id: string; body: ScreeningType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      EditScreeningHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};

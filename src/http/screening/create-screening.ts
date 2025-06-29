import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PostTest } from "@/types/test/post-test";
import { ScreeningType } from "@/validators/screening/screening-validator";

interface NewScreeningResponse {
  data: PostTest;
}

export const addNewScreeningHandler = async (
  body: ScreeningType,
  token: string,
): Promise<NewScreeningResponse> => {
  const { data } = await api.post("/screening", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewScreening = (
  options?: UseMutationOptions<
    NewScreeningResponse,
    AxiosError<NewScreeningResponse>,
    ScreeningType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: ScreeningType) =>
      addNewScreeningHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

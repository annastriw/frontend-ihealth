import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DM } from "@/types/sub-modules/sub-modules";
import { DMType } from "@/validators/sub-modules/dm-validator";

interface NewDMResponse {
  data: DM;
}

export const addNewDMHandler = async (
  body: DMType,
  token: string,
): Promise<NewDMResponse> => {
  const { data } = await api.post("/dms", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewDM = (
  options?: UseMutationOptions<
    NewDMResponse,
    AxiosError<NewDMResponse>,
    DMType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: DMType) =>
      addNewDMHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

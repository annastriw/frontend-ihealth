import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { CAPD } from "@/types/sub-modules/sub-modules";
import { CAPDType } from "@/validators/sub-modules/capd-validator";

interface NewCAPDResponse {
  data: CAPD;
}

export const addNewCAPDHandler = async (
  body: CAPDType,
  token: string,
): Promise<NewCAPDResponse> => {
  const { data } = await api.post("/capds", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewCAPD = (
  options?: UseMutationOptions<
    NewCAPDResponse,
    AxiosError<NewCAPDResponse>,
    CAPDType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: CAPDType) =>
      addNewCAPDHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

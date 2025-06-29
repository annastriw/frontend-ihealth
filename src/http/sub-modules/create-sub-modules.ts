import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { SubModuleType } from "@/validators/sub-modules/sub-modules-validator";
import { SubModules } from "@/types/modules/modules";

interface NewSubModulesResponse {
  data: SubModules;
}

export const addNewSubModulesHandler = async (
  body: SubModuleType,
  token: string,
): Promise<NewSubModulesResponse> => {
  const { data } = await api.post("/sub-modules", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewSubModules = (
  options?: UseMutationOptions<
    NewSubModulesResponse,
    AxiosError<NewSubModulesResponse>,
    SubModuleType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: SubModuleType) =>
      addNewSubModulesHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

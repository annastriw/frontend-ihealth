import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { SubModules } from "@/types/modules/modules";
import { SubModuleType } from "@/validators/sub-modules/sub-modules-validator";

interface EditSubModulesResponse {
  data: SubModules;
}

export const EditSubModulesHandler = async (
  id: string,
  body: SubModuleType,
  token: string,
): Promise<EditSubModulesResponse> => {
  const { data } = await api.put(`/sub-modules/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditSubModules = (
  options?: UseMutationOptions<
    EditSubModulesResponse,
    AxiosError,
    { id: string; body: SubModuleType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      EditSubModulesHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};

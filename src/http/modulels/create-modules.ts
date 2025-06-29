import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ModuleType } from "@/validators/modules/module-validator";
import { Modules } from "@/types/modules/modules";

interface NewModuleResponse {
  data: Modules;
}

export const addNewModuleHandler = async (
  body: ModuleType,
  token: string,
): Promise<NewModuleResponse> => {
  const { data } = await api.post("/modules", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewModule = (
  options?: UseMutationOptions<
    NewModuleResponse,
    AxiosError<NewModuleResponse>,
    ModuleType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: ModuleType) =>
      addNewModuleHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

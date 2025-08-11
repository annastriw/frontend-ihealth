import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { SubModules } from "@/types/modules/modules";

interface DeleteSubModulesPayload {
  id: string;
  token: string;
}

interface DeleteSubModulesResponse {
  data: SubModules;
}

export const DeleteSubModulesHandler = async ({
  id,
  token,
}: DeleteSubModulesPayload): Promise<DeleteSubModulesResponse> => {
  const { data } = await api.delete(`/sub-modules/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteSubModules = (
  options?: UseMutationOptions<
    DeleteSubModulesResponse,
    AxiosError,
    DeleteSubModulesPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteSubModulesHandler,
    ...options,
  });
};

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ModuleContent } from "@/types/modules/modules";

interface DeleteModuleContentPayload {
  id: string;
  token: string;
}

interface DeleteModuleContentResponse {
  data: ModuleContent;
}

const deleteModuleContentHandler = async ({
  id,
  token,
}: DeleteModuleContentPayload): Promise<DeleteModuleContentResponse> => {
  const { data } = await api.delete(`/module-contents/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteModuleContent = (
  options?: UseMutationOptions<
    DeleteModuleContentResponse,
    AxiosError,
    DeleteModuleContentPayload
  >,
) => {
  return useMutation({
    mutationFn: deleteModuleContentHandler,
    ...options,
  });
};

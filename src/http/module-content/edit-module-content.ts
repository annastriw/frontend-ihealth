import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ModuleContent } from "@/types/modules/modules";

interface EditModuleContentPayload {
  id: string;
  token: string;
  body: FormData;
}

interface EditModuleContentResponse {
  data: ModuleContent;
}

const editModuleContentHandler = async ({
  id,
  token,
  body,
}: EditModuleContentPayload): Promise<EditModuleContentResponse> => {
  const { data } = await api.post(`/module-contents/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useEditModuleContent = (
  options?: UseMutationOptions<
    EditModuleContentResponse,
    AxiosError,
    EditModuleContentPayload
  >,
) => {
  return useMutation({
    mutationFn: editModuleContentHandler,
    ...options,
  });
};

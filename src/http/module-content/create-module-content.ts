import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ModuleContent } from "@/types/modules/modules";
import { ModuleContentType } from "@/validators/module-contents/module-content-validator";

interface NewModuleContentResponse {
  data: ModuleContent;
}

export const addNewModuleContentHandler = async (
  body: ModuleContentType,
  token: string,
): Promise<NewModuleContentResponse> => {
  const formData = new FormData();

  formData.append("sub_module_id", body.sub_module_id);
  formData.append("name", body.name);
  formData.append("content", body.content);
  formData.append("video_url", body.video_url);
  formData.append("type", body.type);

  if (body.file_path) {
    formData.append("file_path", body.file_path);
  }

  const { data } = await api.post("/module-content", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useAddNewModuleContent = (
  options?: UseMutationOptions<
    NewModuleContentResponse,
    AxiosError<NewModuleContentResponse>,
    ModuleContentType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: ModuleContentType) =>
      addNewModuleContentHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

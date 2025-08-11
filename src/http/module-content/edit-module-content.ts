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
  console.log("📤 [editModuleContentHandler] Payload ID:", id);

  // Inject `_method` ke FormData untuk override menjadi PUT
  body.append("_method", "PUT");

  // Debug isi FormData (manual)
  for (const [key, value] of body.entries()) {
    console.log(`📄 FormData -> ${key}:`, value);
  }

  const response = await api.post(`/module-content/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("✅ [editModuleContentHandler] Response:", response.data);

  return response.data;
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

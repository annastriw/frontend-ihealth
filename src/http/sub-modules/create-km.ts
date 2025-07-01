import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { KM } from "@/types/sub-modules/sub-modules";
import { KMType } from "@/validators/sub-modules/km-validator";

interface NewKMResponse {
  data: KM;
}

export const addNewKMHandler = async (
  body: KMType,
  token: string,
): Promise<NewKMResponse> => {
  const formData = new FormData();

  formData.append("module_id", body.module_id);
  formData.append("name", body.name);
  formData.append("content", body.content);

  if (body.file_path) {
    formData.append("file_path", body.file_path);
  }

  const { data } = await api.post("/kms", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddNewKM = (
  options?: UseMutationOptions<
    NewKMResponse,
    AxiosError<NewKMResponse>,
    KMType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: KMType) =>
      addNewKMHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

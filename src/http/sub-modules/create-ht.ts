import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { HT } from "@/types/sub-modules/sub-modules";
import { HTType } from "@/validators/sub-modules/ht-validator";

interface NewHTResponse {
  data: HT;
}

export const addNewHTHandler = async (
  body: HTType,
  token: string,
): Promise<NewHTResponse> => {
  const formData = new FormData();

  formData.append("module_id", body.module_id);
  formData.append("name", body.name);
  formData.append("content", body.content);

  if (body.file_path) {
    formData.append("file_path", body.file_path);
  }

  const { data } = await api.post("/hts", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddNewHT = (
  options?: UseMutationOptions<
    NewHTResponse,
    AxiosError<NewHTResponse>,
    HTType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: HTType) =>
      addNewHTHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
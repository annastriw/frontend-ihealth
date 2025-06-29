import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { HD } from "@/types/sub-modules/sub-modules";
import { HDType } from "@/validators/sub-modules/hd-validator";

interface NewHDResponse {
  data: HD;
}

export const addNewHDHandler = async (
  body: HDType,
  token: string,
): Promise<NewHDResponse> => {
  const formData = new FormData();

  formData.append("module_id", body.module_id);
  formData.append("name", body.name);
  formData.append("content", body.content);

  if (body.file_path) {
    formData.append("file_path", body.file_path);
  }

  const { data } = await api.post("/hds", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useAddNewHD = (
  options?: UseMutationOptions<
    NewHDResponse,
    AxiosError<NewHDResponse>,
    HDType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: HDType) =>
      addNewHDHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PostTest } from "@/types/test/post-test";
import { PostTestType } from "@/validators/test/post-test-validator";

interface EditPostTestResponse {
  data: PostTest;
}

export const EditPostTestHandler = async (
  id: string,
  body: PostTestType,
  token: string,
): Promise<EditPostTestResponse> => {
  const { data } = await api.put(`/post-test/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditPostTest = (
  options?: UseMutationOptions<
    EditPostTestResponse,
    AxiosError,
    { id: string; body: PostTestType }
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      EditPostTestHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PostTest } from "@/types/test/post-test";
import { PostTestType } from "@/validators/test/post-test-validator";

interface NewPostTestResponse {
  data: PostTest;
}

export const addNewPostTestHandler = async (
  body: PostTestType,
  token: string,
): Promise<NewPostTestResponse> => {
  const { data } = await api.post("/post-test", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewPostTest = (
  options?: UseMutationOptions<
    NewPostTestResponse,
    AxiosError<NewPostTestResponse>,
    PostTestType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: PostTestType) =>
      addNewPostTestHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

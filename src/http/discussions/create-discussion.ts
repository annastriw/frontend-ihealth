import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Discussion } from "@/types/discussions/discussion";
import { DiscussionType } from "@/validators/discussion/discussion-validator";

interface NewDiscussionResponse {
  data: Discussion;
}

export const addNewDiscussionHandler = async (
  body: DiscussionType,
  token: string,
): Promise<NewDiscussionResponse> => {
  const { data } = await api.post("/discussion", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewDiscussion = (
  options?: UseMutationOptions<
    NewDiscussionResponse,
    AxiosError<NewDiscussionResponse>,
    DiscussionType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: DiscussionType) =>
      addNewDiscussionHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DiscussionComment } from "@/types/discussions/discussion";
import { DiscussionMessageType } from "@/validators/discussion/discussion-message-validator";

interface NewDiscussionMesaggeResponse {
  data: DiscussionComment;
}

export const addNewDiscussionMesaggeHandler = async (
  body: DiscussionMessageType,
  token: string,
): Promise<NewDiscussionMesaggeResponse> => {
  const formData = new FormData();

  formData.append("discussion_id", body.discussion_id);
  formData.append("comment", body.comment);
  formData.append("is_private", body.is_private ? "1" : "0");

  if (body.is_private && body.medical_id) {
    formData.append("medical_id", body.medical_id);
  }

  if (body.image) {
    formData.append("image", body.image);
  }

  const { data } = await api.post("/discussion/comment", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useAddNewDiscussionMesagge = (
  options?: UseMutationOptions<
    NewDiscussionMesaggeResponse,
    AxiosError<NewDiscussionMesaggeResponse>,
    DiscussionMessageType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: DiscussionMessageType) =>
      addNewDiscussionMesaggeHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

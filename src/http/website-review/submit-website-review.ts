import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";

export interface WebsiteReviewPayload {
  answers: number[];
  suggestion?: string;
}

export interface WebsiteReviewResponse {
  id: number;
  user_id: number;
  answers: number[];
  suggestion?: string;
  created_at: string;
  updated_at: string;
}

export const addWebsiteReviewHandler = async (
  body: WebsiteReviewPayload,
  token: string
): Promise<WebsiteReviewResponse> => {
  const { data } = await api.post("/website-reviews", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data; // backend kita return { message, data }, jadi ambil data
};

export const useAddWebsiteReview = (
  options?: UseMutationOptions<
    WebsiteReviewResponse,
    AxiosError<any>,
    WebsiteReviewPayload
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: WebsiteReviewPayload) =>
      addWebsiteReviewHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

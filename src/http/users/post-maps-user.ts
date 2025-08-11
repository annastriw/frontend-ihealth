import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PostTest } from "@/types/test/post-test";
import { MapsType } from "@/validators/maps/maps-validator";

interface PostMapResponse {
  data: PostTest;
}

export const addPostMapHandler = async (
  body: MapsType,
  token: string,
): Promise<PostMapResponse> => {
  const { data } = await api.post("/users/location", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddPostMap = (
  options?: UseMutationOptions<
    PostMapResponse,
    AxiosError<PostMapResponse>,
    MapsType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: MapsType) =>
      addPostMapHandler(body, sessionData?.access_token as string),
    ...options,
  });
};

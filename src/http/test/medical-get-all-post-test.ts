import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { PostTest } from "@/types/test/post-test";

interface GetAllPostTestResponse {
  data: PostTest[];
}

export const GetAllPostTestHandler = async (
  token: string,
): Promise<GetAllPostTestResponse> => {
  const { data } = await api.get<GetAllPostTestResponse>("/post-test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllPostTest = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllPostTestResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["post-test-list"],
    queryFn: () => GetAllPostTestHandler(token),
    ...options,
  });
};

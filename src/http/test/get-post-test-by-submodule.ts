import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { PostTest } from "@/types/test/post-test";

interface GetAllPostTestBySubModuleResponse {
  data: PostTest[];
}

export const GetAllPostTestBySubModuleHandler = async (
  id: string,
  token: string,
): Promise<GetAllPostTestBySubModuleResponse> => {
  const { data } = await api.get<GetAllPostTestBySubModuleResponse>(
    `/post-test/sub/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllPostTestBySubModule = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllPostTestBySubModuleResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["post-test-sub", id],
    queryFn: () => GetAllPostTestBySubModuleHandler(id, token),
    ...options,
  });
};

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetDetailUserResponse {
  data: User;
}

export const GetDetailUserHandler = async (
  id: string,
  token: string,
): Promise<GetDetailUserResponse> => {
  const { data } = await api.get<GetDetailUserResponse>(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetDetailUser = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailUserResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["user-detail", id],
    queryFn: () => GetDetailUserHandler(id, token),
    ...options,
  });
};

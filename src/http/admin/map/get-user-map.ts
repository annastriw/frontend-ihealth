import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { PersonalInformation } from "@/types/personal-information/personal-information";

interface GetAllUserMapResponse {
  data: PersonalInformation[];
}

export const GetAllUserMapHandler = async (
  token: string,
): Promise<GetAllUserMapResponse> => {
  const { data } = await api.get<GetAllUserMapResponse>("/users/location/maps", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllUserMap = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllUserMapResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["users-list-maps"],
    queryFn: () => GetAllUserMapHandler(token),
    ...options,
  });
};

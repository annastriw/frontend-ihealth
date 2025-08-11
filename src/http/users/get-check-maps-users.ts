import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { CheckPersonalInformation } from "@/types/personal-information/personal-information";

interface GetCheckMapsUserResponse {
  data: CheckPersonalInformation;
}

export const GetCheckMapsUserHandler = async (
  token: string,
): Promise<GetCheckMapsUserResponse> => {
  const { data } = await api.get<GetCheckMapsUserResponse>(
    "/users/location/check",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetCheckMapsUser = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetCheckMapsUserResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["check-map-user"],
    queryFn: () => GetCheckMapsUserHandler(token),
    ...options,
  });
};

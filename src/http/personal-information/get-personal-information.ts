import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { PersonalInformation } from "@/types/personal-information/personal-information";

interface GetPersonalInformationUserResponse {
  data: PersonalInformation;
}

export const GetPersonalInformationUserHandler = async (
  token: string,
): Promise<GetPersonalInformationUserResponse> => {
  const { data } = await api.get<GetPersonalInformationUserResponse>(
    "/personal/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetPersonalInformationUser = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetPersonalInformationUserResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["personal-information-me"],
    queryFn: () => GetPersonalInformationUserHandler(token),
    ...options,
  });
};

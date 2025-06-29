import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { PersonalInformation } from "@/types/personal-information/personal-information";

interface GetPersonalInformationByUserIdResponse {
  data: PersonalInformation;
}

export const GetPersonalInformationByUserIdHandler = async (
  id: string,
  token: string,
): Promise<GetPersonalInformationByUserIdResponse> => {
  const { data } = await api.get<GetPersonalInformationByUserIdResponse>(
    `/personal/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetPersonalInformationByUserId = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetPersonalInformationByUserIdResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["personal-information-by-user-id", id],
    queryFn: () => GetPersonalInformationByUserIdHandler(token, id),
    ...options,
  });
};

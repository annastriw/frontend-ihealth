import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { CheckPersonalInformation } from "@/types/personal-information/personal-information";

interface GetCheckPersonalInformationResponse {
  data: CheckPersonalInformation;
}

export const GetCheckPersonalInformationHandler = async (
  token: string,
): Promise<GetCheckPersonalInformationResponse> => {
  const { data } = await api.get<GetCheckPersonalInformationResponse>(
    "/personal/check",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetCheckPersonalInformation = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetCheckPersonalInformationResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["check-personal-information"],
    queryFn: () => GetCheckPersonalInformationHandler(token),
    ...options,
  });
};

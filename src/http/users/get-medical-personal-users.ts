import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetAllMedicalPersonalUsersResponse {
  data: User[];
}

export const GetAllMedicalPersonalUsersHandler = async (
  token: string,
): Promise<GetAllMedicalPersonalUsersResponse> => {
  const { data } = await api.get<GetAllMedicalPersonalUsersResponse>(
    "/users/medical-personal",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllMedicalPersonalUsers = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllMedicalPersonalUsersResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["medical-personal-users-list"],
    queryFn: () => GetAllMedicalPersonalUsersHandler(token),
    ...options,
  });
};

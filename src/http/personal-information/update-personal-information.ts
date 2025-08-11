import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { User } from "@/types/user/user";
import { PersonalInformationType } from "@/validators/personal-information/personal-information-validator";

interface UpdatePersonalInformationResponse {
  data: User;
}

export const UpdatePersonalInformationHandler = async (
  body: PersonalInformationType,
  token: string,
): Promise<UpdatePersonalInformationResponse> => {
  const { data } = await api.put("/personal", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdatePersonalInformation = (
  options?: UseMutationOptions<
    UpdatePersonalInformationResponse,
    AxiosError<UpdatePersonalInformationResponse>,
    PersonalInformationType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: PersonalInformationType) =>
      UpdatePersonalInformationHandler(
        body,
        sessionData?.access_token as string,
      ),
    ...options,
  });
};

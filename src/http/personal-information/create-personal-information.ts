import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PersonalInformation } from "@/types/personal-information/personal-information";
import { PersonalInformationType } from "@/validators/personal-information/personal-information-validator";

interface NewPersonalInformationResponse {
  data: PersonalInformation;
}

export const addNewPersonalInformationHandler = async (
  body: PersonalInformationType,
  token: string,
): Promise<NewPersonalInformationResponse> => {
  const { data } = await api.post("/personal", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewPersonalInformation = (
  options?: UseMutationOptions<
    NewPersonalInformationResponse,
    AxiosError<NewPersonalInformationResponse>,
    PersonalInformationType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: PersonalInformationType) =>
      addNewPersonalInformationHandler(
        body,
        sessionData?.access_token as string,
      ),
    ...options,
  });
};

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Screening } from "@/types/screening/screening";

interface DeleteScreeningPayload {
  id: string;
  token: string;
}

interface DeleteScreeningResponse {
  data: Screening;
}

export const DeleteScreeningHandler = async ({
  id,
  token,
}: DeleteScreeningPayload): Promise<DeleteScreeningResponse> => {
  const { data } = await api.delete(`/screening/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteScreening = (
  options?: UseMutationOptions<
    DeleteScreeningResponse,
    AxiosError,
    DeleteScreeningPayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteScreeningHandler,
    ...options,
  });
};

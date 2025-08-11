import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { AdminScreeningDSMQHistoryItem } from "@/types/screening-dsmq/admin-screening-dsmq";

// Payload yang dikirim ke handler
interface DeleteAdminHistoryScreeningDSMQPayload {
  id: string;
  token: string;
}

// Respons dari backend
type DeleteAdminHistoryScreeningDSMQResponse = {
  data: AdminScreeningDSMQHistoryItem;
};

// Fungsi delete request
export const deleteAdminHistoryScreeningDSMQHandler = async ({
  id,
  token,
}: DeleteAdminHistoryScreeningDSMQPayload): Promise<DeleteAdminHistoryScreeningDSMQResponse> => {
  const { data } = await api.delete<DeleteAdminHistoryScreeningDSMQResponse>(
    `/medical/screening-dsmq-histories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

// React Query mutation hook
export const useDeleteAdminHistoryScreeningDSMQ = (
  options?: UseMutationOptions<
    DeleteAdminHistoryScreeningDSMQResponse,
    AxiosError,
    DeleteAdminHistoryScreeningDSMQPayload
  >,
) => {
  return useMutation({
    mutationFn: deleteAdminHistoryScreeningDSMQHandler,
    ...options,
  });
};
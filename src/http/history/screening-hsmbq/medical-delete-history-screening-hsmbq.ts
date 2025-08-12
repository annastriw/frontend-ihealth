import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { AdminScreeningHSMBQHistoryItem } from "@/types/screening-hsmbq/admin-screening-hsmbq";

// Payload yang dikirim ke handler
interface DeleteAdminHistoryScreeningHSMBQPayload {
  id: string;
  token: string;
}

// Respons dari backend
type DeleteAdminHistoryScreeningHSMBQResponse = {
  data: AdminScreeningHSMBQHistoryItem;
};

// Fungsi delete request
export const deleteAdminHistoryScreeningHSMBQHandler = async ({
  id,
  token,
}: DeleteAdminHistoryScreeningHSMBQPayload): Promise<DeleteAdminHistoryScreeningHSMBQResponse> => {
  const { data } = await api.delete<DeleteAdminHistoryScreeningHSMBQResponse>(
    `/medical/screening-hsmbq-histories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

// React Query mutation hook
export const useDeleteAdminHistoryScreeningHSMBQ = (
  options?: UseMutationOptions<
    DeleteAdminHistoryScreeningHSMBQResponse,
    AxiosError,
    DeleteAdminHistoryScreeningHSMBQPayload
  >,
) => {
  return useMutation({
    mutationFn: deleteAdminHistoryScreeningHSMBQHandler,
    ...options,
  });
};

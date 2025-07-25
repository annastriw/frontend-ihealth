// src/http/history/screening-dass/delete-history-screening-dass.ts

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { AdminScreeningDASSHistoryItem } from "@/types/screening-dass/admin-screening-dass";

// Payload yang dikirim ke handler
interface DeleteAdminHistoryScreeningDASSPayload {
  id: string;
  token: string;
}

// Respons yang dikembalikan oleh backend
type DeleteAdminHistoryScreeningDASSResponse = {
  data: AdminScreeningDASSHistoryItem;
};

// Fungsi untuk melakukan delete request
export const deleteAdminHistoryScreeningDASSHandler = async ({
  id,
  token,
}: DeleteAdminHistoryScreeningDASSPayload): Promise<DeleteAdminHistoryScreeningDASSResponse> => {
  const { data } = await api.delete<DeleteAdminHistoryScreeningDASSResponse>(
    `/admin/screening-dass-histories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

// React Query mutation hook
export const useDeleteAdminHistoryScreeningDASS = (
  options?: UseMutationOptions<
    DeleteAdminHistoryScreeningDASSResponse,
    AxiosError,
    DeleteAdminHistoryScreeningDASSPayload
  >,
) => {
  return useMutation({
    mutationFn: deleteAdminHistoryScreeningDASSHandler,
    ...options,
  });
};

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ModuleContent } from "@/types/modules/modules";

interface GetDetailBookletResponse {
  data: ModuleContent;
}

export const GetDetailBookletHandler = async (
  id: string,
  token: string,
): Promise<GetDetailBookletResponse> => {
  const { data } = await api.get<GetDetailBookletResponse>(
    `/module-content/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/pdf",
      },
    },
  );

  return data;
};

export const useGetDetailBooklet = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailBookletResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["module-content-detail", id],
    queryFn: () => GetDetailBookletHandler(id, token),
    ...options,
  });
};

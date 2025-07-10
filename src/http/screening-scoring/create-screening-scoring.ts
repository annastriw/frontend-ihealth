import { api } from "@/lib/axios";
import { ScreeningScoringType } from "@/validators/screening-scoring/screening-scoring-validator";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";

interface NewScreeningScoringResponse {
  data: {
    id: string;
    name: string;
    type: "HT" | "DM";
    question_set_id: string;
    created_at: string;
    updated_at: string;
  };
}

/**
 * Fungsi untuk membuat screening scoring baru
 * Digunakan untuk endpoint: POST /screening-scorings
 */
export const createScreeningScoring = async (
  body: ScreeningScoringType,
  token: string
): Promise<NewScreeningScoringResponse> => {
  const { data } = await api.post("/screening-scorings", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

/**
 * React Query Hook untuk membuat screening scoring baru
 */
export const useAddNewScreeningScoring = (
  options?: UseMutationOptions<
    NewScreeningScoringResponse,
    AxiosError,
    ScreeningScoringType
  >
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (body: ScreeningScoringType) =>
      createScreeningScoring(body, session?.access_token as string),
    ...options,
  });
};

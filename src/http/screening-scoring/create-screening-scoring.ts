// src/http/screening-scoring/create-screening-scoring.ts

import { api } from "@/lib/axios";
import { ScreeningScoringType } from "@/validators/screening-scoring/screening-scoring-validator";

interface NewScreeningScoringResponse {
  data: {
    id: string;
    name: string;
    type: "HT" | "DM";
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

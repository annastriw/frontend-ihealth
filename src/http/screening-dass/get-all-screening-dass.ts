// src/http/screening-dass/get-all-screening-dass.ts
import axios from "axios";

export interface ScreeningDASSLatest {
  id: number; // ← ini akan diisi dari `history_id`
  latest_submitted_at: string | null; // ← ini akan diisi dari `created_at`
}

export async function getLatestScreeningDASS(token: string, user_id: string): Promise<ScreeningDASSLatest> {
  const response = await axios.get("/api/screening-dass/latest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      user_id,
    },
  });

  const { history_id, created_at } = response.data;

  return {
    id: history_id,
    latest_submitted_at: created_at,
  };
}

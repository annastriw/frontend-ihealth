// src/http/screening-dass/get-all-screening-dass.ts
import axios from "axios";

export interface ScreeningDASSLatest {
  id: number; // ← Tambahkan ID agar bisa digunakan di komponen Dialog
  latest_submitted_at: string | null;
}

export async function getLatestScreeningDASS(token: string): Promise<ScreeningDASSLatest> {
  const response = await axios.get("/api/screening-dass/latest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

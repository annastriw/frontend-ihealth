// src/types/screening-dass/screening-dass.ts
export interface ScreeningDASS {
  id: string;
  name: string;
  // tambahkan jika perlu
}

export interface UserHistoryScreeningDASS {
  id: string;
  screening: ScreeningDASS;
  created_at: string;
  // tambahkan jika perlu
}

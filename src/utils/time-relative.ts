import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";

/**
 * Format waktu menjadi "1 jam yang lalu", "2 hari yang lalu", dll.
 * @param date Objek Date
 * @returns Waktu dalam format relatif (contoh: "1 jam yang lalu")
 */
export function formatRelativeTime(date?: Date | string): string {
  if (!date) return "Baru saja";

  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) return "Tanggal tidak valid";

  return formatDistanceToNowStrict(parsedDate, {
    addSuffix: true,
    locale: id,
  });
}

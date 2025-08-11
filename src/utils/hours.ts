import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

export function formatTime(dateOrStr: Date | string | undefined): string {
  if (!dateOrStr) return "Waktu tidak tersedia";

  const date = typeof dateOrStr === "string" ? parseISO(dateOrStr) : dateOrStr;

  return format(date, "EEEE, dd MMMM yyyy, HH:mm", { locale: id });
}

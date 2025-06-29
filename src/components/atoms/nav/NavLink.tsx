import Link from "next/link";
import { cn } from "@/lib/utils";

interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function NavLink({ href, label, active }: Link) {
  return (
    <Link
      href={href}
      className={cn("flex items-center rounded font-medium", {
        "hover:text-primary": !active,
        "text-primary": active,
      })}
    >
      {label}
    </Link>
  );
}

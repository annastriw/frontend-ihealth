import Link from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps {
  href: string;
  label: string;
  active?: boolean;
}

export default function NavLink({ href, label, active }: LinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-block text-sm font-medium transition-colors duration-300 px-1",
        {
          "text-primary": active,
          "text-muted-foreground hover:text-primary": !active,
        },
        // Animated underline elegan
        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
      )}
    >
      {label}
    </Link>
  );
}

import { TabsTrigger } from "@/components/ui/tabs";
import { twMerge } from "tailwind-merge";
import type { ComponentProps } from "react";

export default function StyledTabTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      {...props}
      className={twMerge(
        // Layout & Typography (menyesuaikan teks)
        "inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm font-semibold rounded-lg whitespace-nowrap",

        // Base color
        "bg-muted text-muted-foreground",

        // Hover style
        "hover:bg-accent hover:text-accent-foreground hover:shadow-md",

        // Active tab style
        "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
        "data-[state=active]:shadow-lg data-[state=active]:scale-[1.03]",

        // Transition & ring
        "transition-all duration-300 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

        className
      )}
    />
  );
}

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// Variants class untuk alert box
const alertVariants = cva(
  "relative w-full rounded-xl border px-4 md:px-6 py-4 md:py-5 shadow-sm grid grid-cols-[auto_1fr] gap-x-4 items-start transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default:
          "bg-card text-card-foreground border-border [&>svg]:text-foreground",
        destructive:
          "bg-red-50 text-red-800 border-red-300 [&>svg]:text-red-600",
        warning:
          "bg-yellow-50 text-yellow-900 border-yellow-300 [&>svg]:text-yellow-600",
        success:
          "bg-green-50 text-green-900 border-green-300 [&>svg]:text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    dismissible?: boolean;
  }) {
  const [visible, setVisible] = React.useState(true);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
    }, 400); // durasi animasi fade-out harus sama dengan CSS
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(
        isClosing ? "animate-fade-out" : "animate-fade-in",
        alertVariants({ variant }),
        className,
      )}
      {...props}
    >
      {children}
      <button
        onClick={handleClose}
        className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3 transition-colors"
        aria-label="Close alert"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Komponen judul Alert
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 text-sm leading-snug font-semibold sm:text-base md:text-lg",
        className,
      )}
      {...props}
    />
  );
}

// Komponen deskripsi Alert
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 mt-1 text-sm leading-relaxed md:text-base",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };

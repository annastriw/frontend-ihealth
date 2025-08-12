"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DropdownProps } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-xl border shadow-md p-4 bg-white dark:bg-zinc-900"
    >
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-2", className)}
        classNames={{
          months: "flex flex-col sm:flex-row gap-4",
          month: "space-y-4 w-full",
          caption:
            "flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-2 relative z-10",
          caption_label:
            "text-base font-semibold tracking-tight text-primary transition-all duration-300",
          caption_dropdowns: "flex items-center justify-center gap-2 w-full md:w-auto",
          nav: "flex gap-2 items-center md:ml-auto",
          nav_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 text-muted-foreground hover:text-primary p-0 border rounded-lg transition-all duration-200"
          ),
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground w-9 font-medium text-xs text-center",
          row: "flex w-full mt-1",
          cell: "text-center text-sm p-0 relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal rounded-full transition-all duration-300 ease-in-out hover:bg-muted/50 focus-visible:ring-2"
          ),
          day_selected:
            "bg-primary text-white font-medium hover:bg-primary/90 ring-2 ring-offset-2 ring-primary rounded-full",
          day_today:
            "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white border border-green-600 font-bold",
          day_outside: "text-muted-foreground opacity-40",
          day_disabled: "text-muted-foreground opacity-30",
          day_range_middle:
            "bg-accent text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          Dropdown: ({
            value,
            onChange,
            children,
            ...props
          }: DropdownProps) => {
            const options = React.Children.toArray(
              children
            ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
            const selected = options.find(
              (child) => child.props.value === value
            );
            const handleChange = (value: string) => {
              const changeEvent = {
                target: { value },
              } as React.ChangeEvent<HTMLSelectElement>;
              onChange?.(changeEvent);
            };
            return (
              <Select
                value={value?.toString()}
                onValueChange={(value) => handleChange(value)}
              >
                <SelectTrigger className="pr-2 rounded-lg border focus:ring-0 bg-background hover:bg-muted/50 text-xs font-medium h-8 min-w-[5rem]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" className="z-50">
                  <ScrollArea className="h-64">
                    {options.map((option, id: number) => (
                      <SelectItem
                        key={`${option.props.value}-${id}`}
                        value={option.props.value?.toString() ?? ""}
                        className="text-xs"
                      >
                        {option.props.children}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            );
          },
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </motion.div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

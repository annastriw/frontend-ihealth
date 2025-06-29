"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { TesDetail } from "@/types/test/test-detail";
import { Skeleton } from "@/components/ui/skeleton";

interface AppSidebarWorkProps {
  data?: TesDetail;
  isLoading: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function AppSidebarWork({
  data,
  isLoading,
  selectedIndex,
  onSelect,
}: AppSidebarWorkProps) {
  return (
    <>
      <Sidebar side="right">
        <SidebarContent className="py-20">
          <SidebarGroup>
            <SidebarGroupLabel>Navigasi Soal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="grid grid-cols-3 place-content-center place-items-center gap-y-4">
                {isLoading
                  ? Array.from({ length: 10 }).map((_, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton>
                          <Skeleton className="h-5 w-5 rounded-full" />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  : data?.questions.map((_, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                          onClick={() => onSelect(index)}
                          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium shadow-lg ${
                            selectedIndex === index
                              ? "bg-primary hover:bg-primary text-white hover:text-white"
                              : "bg-white"
                          }`}
                        >
                          {index + 1}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

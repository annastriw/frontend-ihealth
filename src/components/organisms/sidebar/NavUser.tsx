"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { ChevronsUpDown, Home, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { generateFallbackFromName } from "@/utils/generate-name";

interface NavUserProps {
  session: Session;
}

export function NavUser({ session }: NavUserProps) {
  const { isMobile } = useSidebar();
  const [menuOpen, setMenuOpen] = useState(false);
  const isOnline = true;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-gradient-to-tr from-primary to-primary/90 text-primary-foreground hover:shadow-xl transition-all duration-200 ease-in-out rounded-xl px-3 py-2 gap-3"
            >
              <div className="relative">
                <Avatar className="h-8 w-8 rounded-lg bg-white text-primary ring-2 ring-primary">
                  <AvatarFallback className="rounded-lg font-bold text-sm">
                    {generateFallbackFromName(session?.user.name)}
                  </AvatarFallback>
                </Avatar>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white dark:ring-black animate-pulse" />
                )}
              </div>
              <div className="flex-1 text-left leading-tight text-sm">
                <span className="block truncate font-semibold text-primary-foreground">
                  {session?.user.name}
                </span>
                <span className="block truncate text-xs text-primary-foreground/70">
                  {session?.user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 text-primary-foreground/70 transition-transform duration-200 ease-in-out" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
            className="min-w-64 rounded-2xl border border-border bg-background text-foreground shadow-2xl p-2 space-y-1 overflow-hidden z-[9999] isolate"
          >
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <div className="relative">
                        <Avatar className="h-9 w-9 rounded-lg bg-accent-green-100 text-accent-green-700 ring-1 ring-muted">
                          <AvatarFallback className="rounded-lg font-bold">
                            {generateFallbackFromName(session?.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        {isOnline && (
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white dark:ring-background animate-pulse" />
                        )}
                      </div>
                      <div className="grid text-sm">
                        <span className="truncate font-semibold">
                          {session?.user.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {session?.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer gap-2 py-2 rounded-lg hover:bg-accent-green-50 transition-colors">
                        <Home className="text-primary" size={18} />
                        <span className="font-medium text-sm">Halaman Beranda</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="cursor-pointer text-destructive hover:bg-destructive/10 py-2 rounded-lg flex items-center gap-2 transition-all"
                  >
                    <LogOut size={18} />
                    <span className="font-medium text-sm">Log out</span>
                  </DropdownMenuItem>
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

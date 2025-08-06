"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";

import { ChevronsUpDown, Home, LogOut } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  SidebarMenuItem,
  SidebarMenuButton,
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
              className="from-primary to-primary/90 text-primary-foreground gap-3 rounded-xl bg-gradient-to-tr px-3 py-2 transition-all duration-200 ease-in-out hover:shadow-xl"
            >
              <div className="relative">
                <Avatar className="text-primary ring-primary h-8 w-8 rounded-lg bg-white ring-2">
                  <AvatarFallback className="rounded-lg text-sm font-bold">
                    {generateFallbackFromName(session?.user.name)}
                  </AvatarFallback>
                </Avatar>
                {isOnline && (
                  <span className="absolute right-0 bottom-0 h-2 w-2 animate-pulse rounded-full bg-green-500 ring-2 ring-white dark:ring-black" />
                )}
              </div>
              <div className="flex-1 truncate text-left text-sm leading-tight">
                <span className="text-primary-foreground block font-semibold">
                  {session?.user.name}
                </span>
                <span className="text-primary-foreground/70 block truncate text-xs">
                  {session?.user.email}
                </span>
              </div>
              <motion.div
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronsUpDown className="text-primary-foreground/70 h-4 w-4" />
              </motion.div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
            className="border-border text-foreground z-[9999] min-w-64 overflow-hidden rounded-2xl border bg-white p-2 shadow-2xl"
          >
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <div className="relative">
                        <Avatar className="bg-accent-green-100 text-accent-green-700 ring-muted h-9 w-9 rounded-lg ring-1">
                          <AvatarFallback className="rounded-lg font-bold">
                            {generateFallbackFromName(session?.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        {isOnline && (
                          <span className="dark:ring-background absolute right-0 bottom-0 h-2 w-2 animate-pulse rounded-full bg-green-500 ring-2 ring-white" />
                        )}
                      </div>
                      <div className="grid text-sm">
                        <span className="truncate font-semibold">
                          {session?.user.name}
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                          {session?.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <Link href="/dashboard" passHref>
                      <DropdownMenuItem className="hover:bg-accent-green-50 cursor-pointer gap-2 rounded-lg py-2 transition-colors">
                        <Home className="text-primary" size={18} />
                        <span className="text-sm font-medium">
                          Halaman Beranda
                        </span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-destructive hover:bg-destructive/10 flex cursor-pointer items-center gap-2 rounded-lg py-2 transition-all"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Log out</span>
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

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Search,
  Book,
  History,
  BookOpen,
  ClipboardPen,
  User,
  ClipboardList,
  NotebookText,
  SearchCheck,
  Settings2,
  Users,
  CircleHelp,
  UserRoundSearch,
  Map,
  Syringe,
  HeartPulse ,
  Brain
} from "lucide-react";
import { NavUser } from "./NavUser";
import { useGetCheckPersonalInformation } from "@/http/personal-information/get-check-personal-information";
import { useGetCheckMapsUser } from "@/http/users/get-check-maps-users";

interface AppSidebarProps {
  session: Session;
}

export function AppSidebar({ session }: AppSidebarProps) {
  const pathname = usePathname();

  const buttonClass = (href: string) =>
    `hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
      pathname.startsWith(href)
        ? "bg-primary/10 text-primary dark:bg-slate-800"
        : ""
    }`;

  const shouldCheckInformation = session?.user.role !== "admin";

const { data: personalInfoData } = useGetCheckPersonalInformation(
  session.access_token as string,
  {
    enabled: shouldCheckInformation && !!session.access_token,
  }
);

const { data: mapsData } = useGetCheckMapsUser(
  session.access_token as string,
  {
    enabled:
      shouldCheckInformation &&
      !!session.access_token &&
      (personalInfoData?.data.is_completed ?? false), 
  }
);

const isCompleted =
  ["admin", "medical_personal"].includes(session?.user.role) ||
  ((personalInfoData?.data.is_completed ?? false) &&
   (mapsData?.data.is_completed ?? false));

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="h-14 cursor-default justify-center border-b bg-white dark:bg-slate-950">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="ml-2 flex items-center gap-x-3">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Image
                  src={"/images/assets/bg-about-us.png"}
                  alt="iHealth Edu"
                  width={37}
                  height={37}
                />
                <h1 className="font-semibold tracking-tight">
                  iHealth Edu
                </h1>
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white dark:bg-slate-950">
        <SidebarGroup>
          <SidebarGroupLabel>Beranda</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
                    pathname ===
                    (session?.user.role === "admin"
                      ? "/dashboard/admin"
                      : "/dashboard")
                      ? "bg-primary/10 text-primary dark:bg-slate-800"
                      : ""
                  }`}
                >
                  <Link
                    href={
                      session?.user.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard"
                    }
                  >
                    <LayoutDashboard />
                    <span>
                      {session?.user.role === "admin"
                        ? "Dashboard Admin"
                        : "Beranda"}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCompleted ? null : (
          <>
            {session?.user.role === "user" && (
              <>
                {/* Menu utama */}
                <SidebarGroup>
                  <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {session?.user.role === "user" && (
                        <>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              asChild
                              className={buttonClass("/dashboard/screening")}
                            >
                              <Link href="/dashboard/screening">
                                <Search />
                                <span>Screening</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              asChild
                              className={buttonClass("/dashboard/modules")}
                            >
                              <Link href="/dashboard/modules">
                                <NotebookText />
                                <span>Modul Materi</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
<SidebarMenuItem>
  <SidebarMenuButton asChild className={buttonClass("/dashboard/modules")}>
    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
      <Syringe />
      <span>Diabetes Melitus</span>
    </a>
  </SidebarMenuButton>
</SidebarMenuItem>

                          <SidebarMenuItem>
                            <SidebarMenuButton
                              asChild
                              className={buttonClass("/dashboard/hipertensi")}
                            >
                              <Link href="/dashboard/hipertensi">
                                <HeartPulse />
                                <span>Hipertensi</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              asChild
                              className={buttonClass("/dashboard/mental-health")}
                            >
                              <Link href="/dashboard/mental-health">
                                <Brain />
                                <span>Kesehatan Mental</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </>
                      )}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}

            {/* Admin-only groups */}
            {session?.user.role === "admin" && (
              <>
                {/* Konten */}
                <SidebarGroup>
                  <SidebarGroupLabel>Manajemen Konten</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass(
                            "/dashboard/admin/question-banks",
                          )}
                        >
                          <Link href="/dashboard/admin/question-banks">
                            <BookOpen />
                            <span>Bank Soal</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass("/dashboard/admin/modules")}
                        >
                          <Link href="/dashboard/admin/modules">
                            <Book />
                            <span>Modul</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass(
                            "/dashboard/admin/sub-modules",
                          )}
                        >
                          <Link href="/dashboard/admin/sub-modules">
                            <NotebookText />
                            <span>Materi</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass("/dashboard/admin/screening")}
                        >
                          <Link href="/dashboard/admin/screening">
                            <SearchCheck />
                            <span>Screening</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass("/dashboard/admin/tests")}
                        >
                          <Link href="/dashboard/admin/tests">
                            <ClipboardPen />
                            <span>Pre & Post Test</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass(
                            "/dashboard/admin/discussions",
                          )}
                        >
                          <Link href="/dashboard/admin/discussions">
                            <Users />
                            <span>Forum Komunitas</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass("/dashboard/admin/faqs")}
                        >
                          <Link href="/dashboard/admin/faqs">
                            <CircleHelp />
                            <span>FAQ</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Laporan */}
                <SidebarGroup>
                  <SidebarGroupLabel>Laporan</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass("/dashboard/admin/reports")}
                        >
                          <Link href="/dashboard/admin/reports">
                            <ClipboardList />
                            <span>Laporan Keseluruhan</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Pengguna */}
                <SidebarGroup>
                  <SidebarGroupLabel>Manajemen Pengguna</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass("/dashboard/admin/users")}
                        >
                          <Link href="/dashboard/admin/users">
                            <User />
                            <span>Pengguna</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                        <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={buttonClass("/dashboard/admin/maps")}
                        >
                          <Link href="/dashboard/admin/maps">
                            <Map />
                            <span>Lokasi Persebaran</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}

            {/* Medical personal groups */}
            {session?.user.role === "medical_personal" && (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>Diskusi</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={
                            pathname === "/dashboard/medical/discussions"
                              ? "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary dark:bg-slate-800"
                              : "hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900"
                          }
                        >
                          <Link href="/dashboard/medical/discussions">
                            <Users />
                            <span>Forum Komunitas</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={
                            pathname ===
                            "/dashboard/medical/discussions/private"
                              ? "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary dark:bg-slate-800"
                              : "hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900"
                          }
                        >
                          <Link href="/dashboard/medical/discussions/private">
                            <UserRoundSearch />
                            <span>Pertanyaan Private</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}

            {/* Untuk role user */}
            {session?.user.role === "user" && (
              <SidebarGroup>
                <SidebarGroupLabel>Informasi</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={buttonClass("/dashboard/general")}
                      >
                        <Link href="/dashboard/general">
                          <Book />
                          <span>Penjelasan Umum</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={buttonClass("/dashboard/history")}
                      >
                        <Link href="/dashboard/history">
                          <History />
                          <span>Riwayat</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {session?.user.role === "user" && (
              <SidebarGroup>
                <SidebarGroupLabel>Diskusi</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={buttonClass("/dashboard/discussions")}
                      >
                        <Link href="/dashboard/discussions">
                          <Users />
                          <span>Forum Komunitas</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            <SidebarGroup>
              <SidebarGroupLabel>Pengaturan Akun</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-900 ${
                        pathname === "/dashboard/settings"
                          ? "bg-primary/10 text-primary dark:bg-slate-800"
                          : ""
                      }`}
                    >
                      <Link href="/dashboard/settings">
                        <Settings2 />
                        <span>Pengaturan</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/organisms/sidebar/app-sidebar";
import BreadcrumbNav from "@/components/atoms/breadcrumb/Breadcrumb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientDashboardWrapper from "@/components/organisms/client/ClientDashboardWrapper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/login");

  return (
    <SidebarProvider>
      <AppSidebar session={session!} />
      <SidebarInset>
        <BreadcrumbNav />
        <ClientDashboardWrapper
          accessToken={session.access_token}
          role={session.user.role}
        >
          <div className="px-5 pt-20 pb-6">{children}</div>
        </ClientDashboardWrapper>
      </SidebarInset>
    </SidebarProvider>
  );
}
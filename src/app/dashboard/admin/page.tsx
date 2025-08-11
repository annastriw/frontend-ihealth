import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminWrapper from "@/components/organisms/dashboard/admin/DashboardAdminWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin | iHealth Edu",
};

export default function DashboardAdminPage() {
  return (
    <>
      <DashboardTitle
        head="Beranda Admin"
        body="Selamat datang di halaman beranda admin iHealth Edu"
      />
      <DashboardAdminWrapper />
    </>
  );
}

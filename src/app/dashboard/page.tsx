import DashboardWrapper from "@/components/organisms/dashboard/DashboardWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | iHealth Edu",
};

export default function DashboardPage() {
  return <DashboardWrapper />;
}

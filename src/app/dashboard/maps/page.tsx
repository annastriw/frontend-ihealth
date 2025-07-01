import dynamic from "next/dynamic";

const DashboardMapsWrapper = dynamic(
  () => import("@/components/organisms/dashboard/maps/DashboardMapsWrapper"),
  { ssr: false }
);

export default function DashboardMapsPage() {
  return <DashboardMapsWrapper />;
}

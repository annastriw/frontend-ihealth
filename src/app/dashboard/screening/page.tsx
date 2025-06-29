import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardScreeningWrapper from "@/components/organisms/dashboard/screening/DashboardScreeningWrapper";

export default function ScreeningPage() {
  return (
    <section>
      <DashboardTitle head="Screening" body="Menampilkan halaman screening" />
      <DashboardScreeningWrapper />
    </section>
  );
}

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardScreeningWrapper from "@/components/organisms/dashboard/admin/screening/DashboardScreeningWrapper";

export default function DashboardScreeningPage() {
  return (
    <section>
      <DashboardTitle
        head="Screening"
        body="Menampikan daftar screening yang tersedia"
      />
      <DashboardScreeningWrapper />
    </section>
  );
}

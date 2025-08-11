import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalWrapper from "@/components/organisms/dashboard/medical/DashboardMedicalWrapper";

export default function MedicalDashboardPage() {
  return (
    <section>
      <DashboardTitle
        head="Beranda Nakes"
        body="Selamat datang di halaman beranda Nakes iHealth Edu"
      />
      <DashboardMedicalWrapper />
    </section>
  );
}

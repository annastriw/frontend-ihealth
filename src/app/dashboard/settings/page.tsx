import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import AuthUpdateAccountWrapper from "@/components/organisms/dashboard/auth/AuthUpdateAccountWrapper";

export default function DashboardSettingsPage() {
  return (
    <section>
      <DashboardTitle
        head="Pengaturan Akun"
        body="Menampilkan data akun anda dan pengaturan yang dapat dilakukan"
      />
      <AuthUpdateAccountWrapper />
    </section>
  );
}

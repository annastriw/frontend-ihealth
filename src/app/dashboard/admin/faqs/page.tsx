import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminFAQWrapper from "@/components/organisms/dashboard/admin/faq/DashboardAdminFAQWrapper";

export default function DashboardAdminFAQs() {
  return (
    <section>
      <DashboardTitle head="FAQ" body="Menampilkan daftar pertanyaan di FAQ" />
      <DashboardAdminFAQWrapper />
    </section>
  );
}

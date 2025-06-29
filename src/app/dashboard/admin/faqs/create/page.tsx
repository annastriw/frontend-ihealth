import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardAdminCreateFAQWrapper from "@/components/organisms/dashboard/admin/faq/DashboardAdminCreateFAQWrapper";

export default function DashboardAdminCreateFAQPage() {
  return (
    <section>
      <DashboardTitleBold head="Tambah FAQ" />
      <DashboardAdminCreateFAQWrapper />
    </section>
  );
}

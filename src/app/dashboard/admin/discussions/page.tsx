import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminDiscussionWrapper from "@/components/organisms/dashboard/admin/discussions/DashboardAdminDiscussions";

export default function DashboardAdminDiscussionsPage() {
  return (
    <section>
      <DashboardTitle
        head="Forum Komunitas"
        body="Menampilkan daftar topik diskusi di forum komunitas"
      />
      <DashboardAdminDiscussionWrapper />
    </section>
  );
}

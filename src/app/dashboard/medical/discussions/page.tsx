import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalDiscussionWrapper from "@/components/organisms/dashboard/medical/discussions/DashboardMedicalDiscussionWrapper";

export default function DashboardMedicalDiscussionPage() {
  return (
    <section>
      <DashboardTitle
        head="Forum Komunitas"
        body="Menampilkan topik diskusi di forum komunitas"
      />
      <DashboardMedicalDiscussionWrapper />
    </section>
  );
}

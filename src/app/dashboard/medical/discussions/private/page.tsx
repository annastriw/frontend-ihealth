import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalDiscussionPrivateWrapper from "@/components/organisms/dashboard/medical/discussions/DashboardMedicalDiscussionPrivateWrapper";

export default function DashboardMedicalDiscussionPrivatePage() {
  return (
    <section>
      <DashboardTitle
        head="Pertanyaan Private Forum Komunitas"
        body="Menampilkan pertanyaan private dari Forum Komunitas"
      />
      <DashboardMedicalDiscussionPrivateWrapper />
    </section>
  );
}

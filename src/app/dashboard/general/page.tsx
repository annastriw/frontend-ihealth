import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardGeneral from "@/components/organisms/dashboard/general/DashboardGeneral";

export default function GeneralPage() {
  return (
    <section>
      <DashboardTitle
        head="Penjelasan Umum"
        body=""
      />
      <DashboardGeneral />
    </section>
  );
}

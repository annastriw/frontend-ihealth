import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardSubModulesByTypeWrapper from "@/components/organisms/dashboard/modules/DashboardSubModulesByTypeWrapper";

export default function Page() {
  return (
    <>
      <DashboardTitle
        head="Modul Materi Kesehatan Mental"
        body="Menampilkan semua submodul dan materi untuk Kesehatan Mental"
      />
      <DashboardSubModulesByTypeWrapper type="mental-health" />
    </>
  );
}

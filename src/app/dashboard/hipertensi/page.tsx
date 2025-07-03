import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardSubModulesByTypeWrapper from "@/components/organisms/dashboard/modules/DashboardSubModulesByTypeWrapper";

export default function Page() {
  return (
    <>
      <DashboardTitle
        head="Modul Materi Hipertensi"
        body="Menampilkan semua submodul dan materi untuk Hipertensi"
      />
      <DashboardSubModulesByTypeWrapper type="hipertensi" />
    </>
  );
}

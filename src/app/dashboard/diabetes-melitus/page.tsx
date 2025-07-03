import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardSubModulesByTypeWrapper from "@/components/organisms/dashboard/modules/DashboardSubModulesByTypeWrapper";

export default function Page() {
  return (
    <>
      <DashboardTitle
        head="Modul Materi Diabetes Melitus"
        body="Menampilkan semua submodul dan materi untuk Diabetes Melitus"
      />
      <DashboardSubModulesByTypeWrapper type="diabetes-melitus" />
    </>
  );
}

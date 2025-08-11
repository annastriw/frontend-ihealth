import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalUsersMapWrapper from "@/components/organisms/dashboard/medical/maps/DashboardMedicalUsersMapWrapper";

export default function DashboardMedicalMapPage() {
  return (
    <>
      <DashboardTitle
        head="Lokasi Persebaran Tenaga Medis"
        body="Menampilkan lokasi persebaran tenaga medis"
      />
      <DashboardMedicalUsersMapWrapper />
    </>
  );
}

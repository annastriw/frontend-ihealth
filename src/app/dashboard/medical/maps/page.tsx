import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalUsersMapWrapper from "@/components/organisms/dashboard/medical/maps/DashboardMedicalUsersMapWrapper";

export default function DashboardMedicalMapPage() {
  return (
    <>
      <DashboardTitle
        head="Lokasi Persebaran"
        body="Menampilkan lokasi persebaran terdiagnosa Hipertensi dan Diabetes Melitus di Kelurahan Padangsari dan Pedalangan"
      />
      <DashboardMedicalUsersMapWrapper />
    </>
  );
}

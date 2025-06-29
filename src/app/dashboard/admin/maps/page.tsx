import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminUsersMapsWrapper from "@/components/organisms/dashboard/admin/maps/DashboardAdminUsersMapWrapper";

export default function DashboardAdminMapPage(){
    return(
        <>
        <DashboardTitle head="Lokasi Persebaran" body="Menampilkan lokasi persebaran"/>
        <DashboardAdminUsersMapsWrapper/>
        </>
    )
}
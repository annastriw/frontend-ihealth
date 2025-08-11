import CardCAPDMaterialCount from "@/components/molecules/card/CardDashboardTitle";
import { CircleHelp, NotepadText, User, Users } from "lucide-react";

export default function DashboardAdminWrapper() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <CardCAPDMaterialCount
          title="Forum Komunitas"
          icon={Users}
          link="admin/discussions"
        />
        <CardCAPDMaterialCount
          title="Laporan Keseluruhan"
          icon={NotepadText}
          link="admin/reports"
        />
        <CardCAPDMaterialCount
          title="Manajemen Pengguna"
          link="admin/users"
          icon={User}
        />
        <CardCAPDMaterialCount
          title="FAQ"
          link="admin/faqs"
          icon={CircleHelp}
        />
      </div>
    </div>
  );
}

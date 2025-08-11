import CardCAPDMaterialCount from "@/components/molecules/card/CardDashboardTitle";
import { Map, NotepadText, User, Users } from "lucide-react";

export default function DashboardAdminWrapper() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <CardCAPDMaterialCount
          title="Forum Komunitas"
          icon={Users}
          link="admin/discussions"
          description="Wadah diskusi dan pertukaran informasi antara pasien, tenaga kesehatan, dan admin."
        />
        <CardCAPDMaterialCount
          title="Laporan Keseluruhan"
          icon={NotepadText}
          link="admin/reports"
          description="Akses riwayat lengkap screening dan tes pasien seperti DASS-21, HSMBQ, DSMQ, serta Pre dan Post Test materi."
        />
        <CardCAPDMaterialCount
          title="Manajemen Pengguna"
          icon={User}
          link="admin/users"
          description="Kelola data pribadi dan profil pasien yang terdaftar di platform."
        />
        <CardCAPDMaterialCount
          title="Lokasi Persebaran"
          icon={Map}
          link="admin/maps"
          description="Peta interaktif yang menampilkan distribusi pasien Hipertensi dan Diabetes Melitus di platform."
        />
      </div>
    </div>
  );
}

import { Users, Stethoscope, NotepadText, User, UserRoundSearch, Map } from "lucide-react";
import CardCAPDMaterialCount from "@/components/molecules/card/CardDashboardTitle";

export default function DashboardMedicalWrapper() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <CardCAPDMaterialCount
          title="Input Cek Kesehatan"
          icon={Stethoscope}
          link="medical/screening/diabetes-melitus"
          description="Masukkan data hasil cek kesehatan pasien Hipertensi dan Diabetes Melitus."
        />
        <CardCAPDMaterialCount
          title="Forum Komunitas"
          icon={Users}
          link="medical/discussions"
          description="Wadah diskusi dan berbagi informasi antara pasien, tenaga kesehatan, dan admin."
        />
        <CardCAPDMaterialCount
          title="Jawab Pertanyaan Private"
          icon={UserRoundSearch}
          link="medical/discussions/private"
          description="Fasilitas untuk menjawab pertanyaan pribadi dari pasien secara langsung dan rahasia."
        />
        <CardCAPDMaterialCount
          title="Laporan Keseluruhan"
          icon={NotepadText}
          link="medical/reports"
          description="Akses riwayat lengkap screening dan tes pasien seperti DASS-21, HSMBQ, DSMQ, serta Pre dan Post Test materi."
        />
        <CardCAPDMaterialCount
          title="Manajemen Pengguna"
          icon={User}
          link="medical/users"
          description="Kelola data pribadi dan profil pasien yang terdaftar di platform."
        />
        <CardCAPDMaterialCount
          title="Lokasi Persebaran"
          icon={Map}
          link="medical/maps"
          description="Peta interaktif yang menampilkan distribusi pasien Hipertensi dan Diabetes Melitus di platform."
        />
      </div>
    </div>
  );
}

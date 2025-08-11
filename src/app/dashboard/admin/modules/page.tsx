import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminModulesWrapper from "@/components/organisms/dashboard/admin/modules/DashboardAdminModules";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardAdminModulesPage() {
  return (
    <section className="space-y-4">
      <DashboardTitle
        head="Modul"
        body="Menampilkan semua daftar modul yang tersedia"
      />

      <div className="flex justify-end">
        <Link href="/dashboard/admin/modules/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Modul
          </Button>
        </Link>
      </div>

      <DashboardAdminModulesWrapper />
    </section>
  );
}

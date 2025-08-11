import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardQuestionBankWrapper from "@/components/organisms/dashboard/question-bank/DashboardQuestionBankWrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardAdminQuestionBankPage() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <DashboardTitle head="Bank Soal" body="Menampilkan daftar bank soal" />
        <div>
          <Link href={`/dashboard/admin/question-banks/create`}>
            <Button>
              <Plus />
              Tambah Bank Soal
            </Button>
          </Link>
        </div>
      </div>
      <DashboardQuestionBankWrapper />
    </section>
  );
}

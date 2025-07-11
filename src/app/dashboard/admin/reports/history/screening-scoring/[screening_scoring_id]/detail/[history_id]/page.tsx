import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminReportScreeningScoringDetailWrapper from "@/components/organisms/dashboard/admin/reports/screening-scoring/DashboardAdminReportScreeningScoringDetailWrapper";

export const metadata: Metadata = {
  title: "Detail Riwayat Screening",
};

interface Props {
  params: {
    screening_scoring_id: string;
    history_id: string;
  };
}

export default async function Page({
  params,
}: {
  params: { screening_scoring_id: string; history_id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const { screening_scoring_id, history_id } = params;

  return (
    <section>
      <DashboardTitle
        head="Detail Riwayat Screening Skoring"
        body="Menampilkan jawaban pengguna dan total skor"
      />
      <DashboardAdminReportScreeningScoringDetailWrapper
        screeningScoringId={screening_scoring_id}
        historyId={history_id}
      />
    </section>
  );
}


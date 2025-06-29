"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardListModuleContent from "@/components/molecules/card/CardListModuleContent";
import CardListPreTest from "@/components/molecules/card/CardListPreTest";
import { useGetDetailSubModule } from "@/http/sub-modules/get-detail-sub-module";
import { useGetAllPreTestBySubModule } from "@/http/test/get-pre-test-by-submodule";
import { useSession } from "next-auth/react";
import { useGetAllPostTestBySubModule } from "@/http/test/get-post-test-by-submodule";
import CardListPostTest from "@/components/molecules/card/CardListPostTest";
import { useGetAllHistoryPreTest } from "@/http/test/get-history-pre-test";
import { useGetAllHistoryPostTest } from "@/http/history/post-test/get-history-post-test";

interface DashboardSubModulesWrapper {
  id: string;
}

export default function DashboardSubModulesWrapper({
  id,
}: DashboardSubModulesWrapper) {
  const { data: session, status } = useSession();

  const { data: preTest, isPending: preTestIsPending } =
    useGetAllPreTestBySubModule(id, session?.access_token as string, {
      enabled: status === "authenticated",
    });

  const { data, isPending } = useGetDetailSubModule(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: postTest, isPending: postTestIsPending } =
    useGetAllPostTestBySubModule(id, session?.access_token as string, {
      enabled: status === "authenticated",
    });

  const { data: historyPreTest } = useGetAllHistoryPreTest(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: HistoryPostTest } = useGetAllHistoryPostTest(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const preTestIds = preTest?.data.map((p) => p.id) || [];

  const completedPreTests =
    historyPreTest?.data.filter((h) => preTestIds.includes(h.pre_test.id)) ||
    [];

  const isPreTestCompleted = completedPreTests.length === preTestIds.length;

  return (
    <div>
      <DashboardTitle
        head={data?.data.name ?? "Detail Sub Materi"}
        body={`Menampilkan detail sub materi dari ${data?.data.name ?? ""}`}
      />
      <div className="space-y-4">
        <CardListPreTest
          data={preTest?.data || []}
          isLoading={preTestIsPending}
          history={historyPreTest?.data || []}
        />
        <CardListModuleContent
          data={data?.data.module_contents}
          isLoading={isPending}
          isLocked={!isPreTestCompleted}
        />
        <CardListPostTest
          data={postTest?.data || []}
          isLoading={postTestIsPending}
          history={HistoryPostTest?.data || []}
          isLocked={!isPreTestCompleted}
        />
      </div>
    </div>
  );
}

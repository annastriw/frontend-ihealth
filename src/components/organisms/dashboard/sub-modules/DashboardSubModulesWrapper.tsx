// src/components/organisms/dashboard/sub-modules/DashboardSubModulesWrapper.tsx
"use client";

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

export default function DashboardSubModulesWrapper({ id }: DashboardSubModulesWrapper) {
  const { data: session, status } = useSession();

  const { data: preTest, isPending: preTestIsPending } = useGetAllPreTestBySubModule(
    id,
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const { data, isPending } = useGetDetailSubModule(
    id,
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const { data: postTest, isPending: postTestIsPending } = useGetAllPostTestBySubModule(
    id,
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const { data: historyPreTest } = useGetAllHistoryPreTest(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const { data: historyPostTest } = useGetAllHistoryPostTest(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const isLocked = data?.data?.isLocked ?? true;

  return (
    <div>
      <div className="space-y-4">
        {/* Pretest */}
        <CardListPreTest
          data={preTest?.data || []}
          isLoading={preTestIsPending}
          history={historyPreTest?.data || []}
        />

        {/* Materi - tetap tampil meskipun terkunci */}
        <CardListModuleContent
          data={data?.data.module_contents || []}
          isLoading={isPending}
          isLocked={isLocked}
        />

        {/* Posttest - tetap tampil meskipun terkunci */}
        <CardListPostTest
          data={postTest?.data || []}
          isLoading={postTestIsPending}
          history={historyPostTest?.data || []}
          isLocked={isLocked}
        />
      </div>
    </div>
  );
}

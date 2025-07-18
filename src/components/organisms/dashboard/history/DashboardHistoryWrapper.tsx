"use client";

import CardListHistoryPostTest from "@/components/molecules/card/CardListHistoryPostTest";
import CardListHistoryPreTest from "@/components/molecules/card/CardListHistoryPreTest";
import CardListHistoryScreening from "@/components/molecules/card/CardListHistoryScreening";
import CardListHistoryScreeningScoring from "@/components/molecules/card/CardListHistoryScreeningScoring"; // pastikan file ini ada
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useGetAllHistoryPostTest } from "@/http/history/post-test/get-history-post-test";
import { useGetAllHistoryScreening } from "@/http/screening/get-history-all-screening";
import { useGetAllHistoryScreeningScoring } from "@/http/screening-scoring/get-history-all-screening-scoring"; // tambahkan ini
import { useGetAllHistoryPreTest } from "@/http/test/get-history-pre-test";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardHistoryWrapper() {
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("screening");

  const { data, isPending } = useGetAllHistoryPreTest(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && selectedTab === "pre-test",
    },
  );

  const { data: screening, isPending: screeningIsPending } =
    useGetAllHistoryScreening(session?.access_token as string, {
      enabled: status === "authenticated" && selectedTab === "screening",
    });

  const { data: postTest, isPending: postTestIsPending } =
    useGetAllHistoryPostTest(session?.access_token as string, {
      enabled: status === "authenticated" && selectedTab === "post-test",
    });

  const {
    data: screeningScoring,
    isPending: screeningScoringIsPending,
  } = useGetAllHistoryScreeningScoring(session?.access_token as string, {
    enabled: status === "authenticated" && selectedTab === "screening-scoring",
  });

  return (
    <div>
      <Tabs
        defaultValue="screening"
        className="space-y-2"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <TabsList className="grid w-full max-w-[340px] grid-cols-4">
          <TabsTrigger value="screening">Screening</TabsTrigger>
          <TabsTrigger value="screening-scoring">Scr Scoring</TabsTrigger>
          <TabsTrigger value="pre-test">Pre Test</TabsTrigger>
          <TabsTrigger value="post-test">Post Test</TabsTrigger>
        </TabsList>

        <TabsContent value="screening">
          <CardListHistoryScreening
            data={screening?.data || []}
            isLoading={screeningIsPending}
          />
        </TabsContent>

        <TabsContent value="screening-scoring">
          <CardListHistoryScreeningScoring
            data={screeningScoring?.data || []}
            isLoading={screeningScoringIsPending}
          />
        </TabsContent>

        <TabsContent value="pre-test">
          <CardListHistoryPreTest
            data={data?.data || []}
            isLoading={isPending}
          />
        </TabsContent>

        <TabsContent value="post-test">
          <CardListHistoryPostTest
            data={postTest?.data || []}
            isLoading={postTestIsPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

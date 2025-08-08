"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import CardListHistoryPostTest from "@/components/molecules/card/CardListHistoryPostTest";
import CardListHistoryPreTest from "@/components/molecules/card/CardListHistoryPreTest";
import CardListHistoryScreening from "@/components/molecules/card/CardListHistoryScreening";
import CardListHistoryScreeningScoring from "@/components/molecules/card/CardListHistoryScreeningScoring";
import CardListHistoryScreeningDASS from "@/components/molecules/card/CardListHistoryScreeningDASS";
import CardListHistoryScreeningHSMBQ from "@/components/molecules/card/CardListHistoryScreeningHSMBQ";
import CardListHistoryScreeningDSMQ from "@/components/molecules/card/CardListHistoryScreeningDSMQ";

import {
  Tabs,
  TabsContent,
  TabsList,
} from "@/components/ui/tabs";
import StyledTabTrigger from "@/components/ui/styled-tab-trigger";

import { useGetAllHistoryPostTest } from "@/http/history/post-test/get-history-post-test";
import { useGetAllHistoryPreTest } from "@/http/test/get-history-pre-test";
import { useGetAllHistoryScreening } from "@/http/screening/get-history-all-screening";
import { useGetAllHistoryScreeningScoring } from "@/http/screening-scoring/get-history-all-screening-scoring";
import { useGetAllHistoryScreeningDASS } from "@/http/screening-dass/get-history-all-screening-dass";
import { useGetAllHistoryScreeningHSMBQ } from "@/http/screening-hsmbq/get-history-all-screening-hsmbq";
import { useGetAllHistoryScreeningDSMQ } from "@/http/screening-dsmq/get-history-all-screening-dsmq";

export default function DashboardHistoryWrapper() {
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("screening");

  const { data: preTest, isPending: preTestIsPending } = useGetAllHistoryPreTest(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && selectedTab === "pre-test",
    }
  );

  const { data: screening, isPending: screeningIsPending } = useGetAllHistoryScreening(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && selectedTab === "screening",
    }
  );

  const { data: postTest, isPending: postTestIsPending } = useGetAllHistoryPostTest(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && selectedTab === "post-test",
    }
  );

  const { data: screeningScoring, isPending: screeningScoringIsPending } =
    useGetAllHistoryScreeningScoring(session?.access_token as string, {
      enabled: status === "authenticated" && selectedTab === "screening-scoring",
    });

  const { data: screeningDASS, isPending: screeningDASSIsPending } =
    useGetAllHistoryScreeningDASS(session?.access_token as string, {
      enabled: status === "authenticated" && selectedTab === "dass-21",
    });

  const { data: screeningHSMBQ, isPending: screeningHSMBQIsPending } =
    useGetAllHistoryScreeningHSMBQ(session?.access_token as string, {
      enabled: status === "authenticated" && selectedTab === "hsmbq",
    });

  const { data: screeningDSMQ, isPending: screeningDSMQIsPending } =
    useGetAllHistoryScreeningDSMQ(session?.access_token as string, {
      enabled: status === "authenticated" && selectedTab === "dsmq",
    });

  return (
    <div>
      <Tabs
        defaultValue="screening"
        className="space-y-2"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <TabsList className="grid w-full max-w-[630px] grid-cols-5">
          {/* 
            [HIDE] Tabs screening & scoring disembunyikan sementara karena belum digunakan 
            <StyledTabTrigger value="screening">Screening</StyledTabTrigger>
            <StyledTabTrigger value="screening-scoring">Scr Scoring</StyledTabTrigger>
          */}
          <StyledTabTrigger value="dsmq">DSMQ</StyledTabTrigger>
          <StyledTabTrigger value="hsmbq">HSMBQ</StyledTabTrigger>
          <StyledTabTrigger value="dass-21">DASS-21</StyledTabTrigger>
          <StyledTabTrigger value="pre-test">Pre Test</StyledTabTrigger>
          <StyledTabTrigger value="post-test">Post Test</StyledTabTrigger>
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

        <TabsContent value="dass-21">
          <CardListHistoryScreeningDASS
            data={screeningDASS || []}
            isLoading={screeningDASSIsPending}
          />
        </TabsContent>

        <TabsContent value="hsmbq">
          <CardListHistoryScreeningHSMBQ
            data={screeningHSMBQ || []}
            isLoading={screeningHSMBQIsPending}
          />
        </TabsContent>

        <TabsContent value="dsmq">
          <CardListHistoryScreeningDSMQ
            data={screeningDSMQ || []}
            isLoading={screeningDSMQIsPending}
          />
        </TabsContent>

        <TabsContent value="pre-test">
          <CardListHistoryPreTest
            data={preTest?.data || []}
            isLoading={preTestIsPending}
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

"use client";

import CardListReportHistoryPostTest from "@/components/molecules/card/CardListReportHistoryPostTestForMedical";
import CardListReportHistoryPreTest from "@/components/molecules/card/CardListReportHistoryPreTestForMedical";
import CardDASS21Overview from "@/components/molecules/card/CardDASS21OverviewForMedical";
import CardHSMBQOverview from "@/components/molecules/card/CardHSMBQOverviewForMedical";
import CardDSMQOverview from "@/components/molecules/card/CardDSMQOverviewForMedical";
import ReportSearchAndFilter from "@/components/molecules/search/ReportSearchFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllPreTest } from "@/http/test/medical-get-all-pre-test";
import { useGetAllPostTest } from "@/http/test/medical-get-all-post-test";
import { useSession } from "next-auth/react";
import { useState, useMemo } from "react";

export default function DashboardAdminReportWrapper() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("pre-test");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: preTest, isPending: preTestIsPending } = useGetAllPreTest(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && activeTab === "pre-test",
    },
  );

  const { data: postTest, isPending: postTestIsPending } = useGetAllPostTest(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && activeTab === "post-test",
    },
  );

  const filteredPreTest = useMemo(() => {
    return (preTest?.data ?? []).filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchType =
        typeFilter === "all" || item.sub_module?.module?.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [preTest?.data, search, typeFilter]);

  const filteredPostTest = useMemo(() => {
    return (postTest?.data ?? []).filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchType =
        typeFilter === "all" || item.sub_module?.module?.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [postTest?.data, search, typeFilter]);

  return (
    <div>
      <Tabs
        defaultValue="pre-test"
        className="w-full"
        onValueChange={(val) => {
          setActiveTab(val);
          setSearch("");
          setTypeFilter("all");
        }}
      >
        <TabsList className="mb-4 grid w-full max-w-6xl grid-cols-5">
          <TabsTrigger value="dass-21">DASS-21</TabsTrigger>
          <TabsTrigger value="hsmbq">HSMBQ</TabsTrigger>
          <TabsTrigger value="dsmq">DSMQ</TabsTrigger>
          <TabsTrigger value="pre-test">Pre Test</TabsTrigger>
          <TabsTrigger value="post-test">Post Test</TabsTrigger>
        </TabsList>

        <ReportSearchAndFilter
          tab={activeTab}
          searchValue={search}
          onSearchChange={setSearch}
          selectedType={typeFilter}
          onTypeChange={setTypeFilter}
        />

        <TabsContent value="dass-21">
          <CardDASS21Overview />
        </TabsContent>

        <TabsContent value="hsmbq">
          <CardHSMBQOverview />
        </TabsContent>

        <TabsContent value="dsmq">
          <CardDSMQOverview />
        </TabsContent>

        <TabsContent value="pre-test">
          <CardListReportHistoryPreTest
            data={filteredPreTest}
            isLoading={preTestIsPending}
          />
        </TabsContent>

        <TabsContent value="post-test">
          <CardListReportHistoryPostTest
            data={filteredPostTest}
            isLoading={postTestIsPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

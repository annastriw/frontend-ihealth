"use client";

import CardListReportHistoryPostTest from "@/components/molecules/card/CardListReportHistoryPostTest";
import CardListReportHistoryPreTest from "@/components/molecules/card/CardListReportHistoryPreTest";
import CardListReportHistoryScreening from "@/components/molecules/card/CardListReportHistoryScreening";
import ReportSearchAndFilter from "@/components/molecules/search/ReportSearchFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllScreening } from "@/http/screening/get-all-screening";
import { useGetAllPostTest } from "@/http/test/get-all-post-test";
import { useGetAllPreTest } from "@/http/test/get-all-pre-test";
import { useSession } from "next-auth/react";
import { useState, useMemo } from "react";

export default function DashboardAdminReportWrapper() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("screening");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data, isPending } = useGetAllScreening(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && activeTab === "screening",
    },
  );

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

  const filteredScreening = useMemo(() => {
    return (data?.data ?? []).filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data?.data, search]);

  return (
    <div>
      <Tabs
        defaultValue="screening"
        className="w-full"
        onValueChange={(val) => {
          setActiveTab(val);
          setSearch(""); // reset search
          setTypeFilter("all"); // reset filter
        }}
      >
        <TabsList className="mb-4 grid w-full max-w-sm grid-cols-3">
          <TabsTrigger value="screening">Screening</TabsTrigger>
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

        <TabsContent value="screening">
          <CardListReportHistoryScreening
            data={filteredScreening}
            isLoading={isPending}
          />
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

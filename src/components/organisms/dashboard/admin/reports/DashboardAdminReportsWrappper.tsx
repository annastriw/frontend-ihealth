"use client";

import CardListReportHistoryPostTest from "@/components/molecules/card/CardListReportHistoryPostTest";
import CardListReportHistoryPreTest from "@/components/molecules/card/CardListReportHistoryPreTest";
import CardListReportHistoryScreening from "@/components/molecules/card/CardListReportHistoryScreening";
import CardListReportHistoryScreeningScoring from "@/components/molecules/card/CardListReportHistoryScreeningScoring";
import CardDASS21Overview from "@/components/molecules/card/CardDASS21Overview"; // ✅ tambahan komponen baru
import ReportSearchAndFilter from "@/components/molecules/search/ReportSearchFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllScreening } from "@/http/screening/get-all-screening";
import { useGetAllPreTest } from "@/http/test/get-all-pre-test";
import { useGetAllPostTest } from "@/http/test/get-all-post-test";
import { useGetAllScreeningScoring } from "@/http/screening-scoring/get-all-screening-scoring";
import { useSession } from "next-auth/react";
import { useState, useMemo } from "react";

export default function DashboardAdminReportWrapper() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("screening");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data, isPending } = useGetAllScreening(
    session?.access_token as string,
    undefined,
    {
      enabled: status === "authenticated" && activeTab === "screening",
    },
  );

  const { data: screeningScoring, isPending: screeningScoringIsPending } = useGetAllScreeningScoring(
    session?.access_token as string,
    undefined,
    {
      enabled: status === "authenticated" && activeTab === "screening-scoring",
    }
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

  const filteredScreeningScoring = useMemo(() => {
    return (screeningScoring?.data ?? []).filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || item.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [screeningScoring?.data, search, typeFilter]);

  return (
    <div>
      <Tabs
        defaultValue="screening"
        className="w-full"
        onValueChange={(val) => {
          setActiveTab(val);
          setSearch("");
          setTypeFilter("all");
        }}
      >
        <TabsList className="mb-4 grid w-full max-w-4xl grid-cols-5">
          <TabsTrigger value="screening">Screening</TabsTrigger>
          <TabsTrigger value="screening-scoring">Scr Scoring</TabsTrigger>
          <TabsTrigger value="dass-21">DASS-21</TabsTrigger>
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

        <TabsContent value="screening-scoring">
          <CardListReportHistoryScreeningScoring
            data={filteredScreeningScoring}
            isLoading={screeningScoringIsPending}
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

        <TabsContent value="dass-21">
          <CardDASS21Overview /> {/* ✅ Komponen DASS-21 */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

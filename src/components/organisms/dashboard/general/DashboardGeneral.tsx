"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import StyledTabTrigger from "@/components/ui/styled-tab-trigger";

import TabHipertensi from "./TabHipertensi";
import TabDiabetes from "./TabDiabetes";
import TabKesehatanMental from "./TabKesehatanMental";

export default function DashboardGeneral() {
  return (
    <div className="w-full px-4 py-10 md:px-10 lg:px-24">
      <Tabs defaultValue="hipertensi" className="w-full">
        <div className="w-full overflow-x-auto">
          <TabsList className="flex w-max gap-3 px-2 md:w-full md:justify-center">
            <StyledTabTrigger value="hipertensi">Hipertensi</StyledTabTrigger>
            <StyledTabTrigger value="diabetes">Diabetes Melitus</StyledTabTrigger>
            <StyledTabTrigger value="kesehatan-mental">Kesehatan Mental</StyledTabTrigger>
          </TabsList>
        </div>

        <TabsContent value="hipertensi" className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="w-full max-w-5xl mx-auto">
            <TabHipertensi />
          </div>
        </TabsContent>

        <TabsContent value="diabetes" className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="w-full max-w-5xl mx-auto">
            <TabDiabetes />
          </div>
        </TabsContent>

        <TabsContent value="kesehatan-mental" className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="w-full max-w-5xl mx-auto">
            <TabKesehatanMental />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

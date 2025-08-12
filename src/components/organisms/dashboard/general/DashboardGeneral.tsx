"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import StyledTabTrigger from "@/components/ui/styled-tab-trigger";

import TabHipertensi from "./TabHipertensi";
import TabDiabetes from "./TabDiabetes";
import TabKesehatanMental from "./TabKesehatanMental";

export default function DashboardGeneral() {
  return (
    <div className="w-full px-1 pt-2 sm:px-2 md:px-3 lg:px-6">
      <Tabs defaultValue="hipertensi" className="w-full">
        <div className="w-full overflow-x-auto">
          <TabsList className="flex w-max gap-3 px-1 md:w-full md:justify-center">
            <StyledTabTrigger value="hipertensi">Hipertensi</StyledTabTrigger>
            <StyledTabTrigger value="diabetes">
              Diabetes Melitus
            </StyledTabTrigger>
            <StyledTabTrigger value="kesehatan-mental">
              Kesehatan Mental
            </StyledTabTrigger>
          </TabsList>
        </div>

        <TabsContent value="hipertensi" className="w-full px-1 sm:px-2 md:px-3">
          <div className="mx-auto w-full max-w-7xl">
            <TabHipertensi />
          </div>
        </TabsContent>

        <TabsContent value="diabetes" className="w-full px-1 sm:px-2 md:px-3">
          <div className="mx-auto w-full max-w-7xl">
            <TabDiabetes />
          </div>
        </TabsContent>

        <TabsContent
          value="kesehatan-mental"
          className="w-full px-1 sm:px-2 md:px-3"
        >
          <div className="mx-auto w-full max-w-7xl">
            <TabKesehatanMental />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

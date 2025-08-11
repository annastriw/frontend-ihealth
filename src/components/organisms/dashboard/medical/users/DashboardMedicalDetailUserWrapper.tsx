"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetPersonalInformationByUserId } from "@/http/personal-information/get-personal-information-user-id";
import { useGetDetailUser } from "@/http/users/get-detail-users";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CardPersonalInformationUserId from "@/components/molecules/card/CardPersonalInformationUserId";
import CardUserLocation from "@/components/molecules/card/CardUserLocationForMedical";

interface DashboardMedicalDetailUserWrapperProps {
  id: string;
}

export default function DashboardMedicalDetailUserWrapper({
  id,
}: DashboardMedicalDetailUserWrapperProps) {
  const { data: session, status } = useSession();
  // Default tab langsung personal-information
  const [activeTab, setActiveTab] = useState("personal-information");

  const { data: userDetail } = useGetDetailUser(id, session?.access_token as string, {
    enabled: status === "authenticated" && activeTab === "personal-information",
  });

  const { data: personal, isLoading: isPersonalLoading } =
    useGetPersonalInformationByUserId(session?.access_token as string, id, {
      enabled: status === "authenticated" && activeTab === "personal-information",
    });

  const { data: accountData } = useGetDetailUser(id, session?.access_token as string, {
    enabled: status === "authenticated" && activeTab === "account-information",
  });

  return (
    <div>
      <Tabs
        defaultValue="personal-information"
        value={activeTab}
        onValueChange={(val) => setActiveTab(val)}
        className="w-full"
      >
        <TabsList className="mb-2 grid w-fit grid-cols-2">
          {/* Hanya dua tab ini yang ditampilkan */}
          <TabsTrigger value="personal-information">Informasi Pribadi</TabsTrigger>
          <TabsTrigger value="location-information">Informasi Alamat</TabsTrigger>
        </TabsList>

        {/* Tab Informasi Akun tetap ada tapi tidak punya tab trigger */}
        <TabsContent value="account-information" className="hidden">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Akun</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <div className="flex flex-col gap-1">
                  <div className="text-muted-foreground md:w-4/12">Nama</div>
                  <div className="md:w-8/12">{accountData?.data.name ?? "-"}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-muted-foreground md:w-4/12">Email</div>
                  <div className="md:w-8/12">{accountData?.data.email ?? "-"}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-muted-foreground md:w-4/12">Username</div>
                  <div className="md:w-8/12">{accountData?.data.username ?? "-"}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-muted-foreground md:w-4/12">Nomor Telepon</div>
                  <div className="md:w-8/12">{accountData?.data.phone_number ?? "-"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal-information">
          <CardPersonalInformationUserId
            data={personal?.data}
            isLoading={isPersonalLoading || status === "loading"}
            diseaseType={userDetail?.data?.disease_type}
          />
        </TabsContent>

        <TabsContent value="location-information">
          <CardUserLocation userId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetPersonalInformationByUserId } from "@/http/personal-information/get-personal-information-user-id";
import { useGetDetailUser } from "@/http/users/get-detail-users";
import { format } from "date-fns";
import { id as IdLocale } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface DashboardAdminDetailUsersWrapperProps {
  id: string;
}

export default function DashboardAdminDetailUsersWrapper({
  id,
}: DashboardAdminDetailUsersWrapperProps) {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("personal-information");

  const { data } = useGetDetailUser(id, session?.access_token as string, {
    enabled: status === "authenticated" && activeTab === "account-information",
  });

  const { data: personal } = useGetPersonalInformationByUserId(
    session?.access_token as string,
    id,
    {
      enabled:
        status === "authenticated" && activeTab === "personal-information",
    },
  );
  return (
    <div>
      <Tabs
        defaultValue="personal-information"
        value={activeTab}
        onValueChange={(val) => setActiveTab(val)}
        className="w-full"
      >
        <TabsList className="mb-2 grid w-fit grid-cols-2">
          <TabsTrigger value="personal-information">
            Informasi Pribadi
          </TabsTrigger>
          <TabsTrigger value="account-information">Informasi Akun</TabsTrigger>
        </TabsList>
        <TabsContent value="account-information">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Akun</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">Nama</div>
                    <div className="md:w-8/12">{data?.data.name}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">Email</div>
                    <div className="md:w-8/12">{data?.data.email}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Username
                    </div>
                    <div className="md:w-8/12">{data?.data.username}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Nomor Telepon
                    </div>
                    <div className="md:w-8/12">{data?.data.phone_number}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="personal-information">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">Nama</div>
                    <div className="md:w-8/12">{personal?.data.name}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Tempat Lahir
                    </div>
                    <div className="md:w-8/12">
                      {personal?.data.place_of_birth}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Tanggal Lahir
                    </div>
                    <div className="md:w-8/12">
                      {personal?.data.date_of_birth
                        ? format(
                            new Date(personal.data.date_of_birth),
                            "dd MMMM yyyy",
                            {
                              locale: IdLocale,
                            },
                          )
                        : "-"}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">Umur</div>
                    <div className="md:w-8/12">{personal?.data.age} Tahun</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Jenis Kelamin
                    </div>
                    <div className="md:w-8/12">
                      {personal?.data.gender === "male"
                        ? "Laki-laki"
                        : personal?.data.gender === "female"
                          ? "Perempuan"
                          : "-"}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Pekerjaan
                    </div>
                    <div className="md:w-8/12">{personal?.data.work}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Apakah Sudah Berkeluarga
                    </div>
                    <div className="md:w-8/12">
                      {personal?.data.is_married
                        ? "Sudah Menikah"
                        : "Belum Menikah"}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Pendidikan Terakhir
                    </div>
                    <div className="md:w-8/12">
                      {personal?.data.last_education}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Riwayat pelayanan kesehatan sebelumnya
                    </div>
                    <div className="md:w-8/12">
                      {personal?.data.origin_disease}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Tipe Pasien
                    </div>
                    <div className="uppercase md:w-8/12">
                      {personal?.data.patient_type}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Lama Terdiagnosis Ginjal
                    </div>
                    <div className="md:w-8/12">
                      {personal?.data.disease_duration}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground md:w-4/12">
                      Terapi Yang Pernah Dijalani
                    </div>
                    <div className="uppercase md:w-8/12">
                      {personal?.data.history_therapy?.toLowerCase() ===
                      "nothing"
                        ? "Tidak ada"
                        : personal?.data.history_therapy}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

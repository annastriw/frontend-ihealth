"use client";

import AlertInformationModule from "@/components/atoms/alert/AlertInformationModule";
import CardListModule from "@/components/molecules/card/CardListModule";
import { useGetAllModulesUsers } from "@/http/modulels/get-module-users";
import { useGetPersonalInformationUser } from "@/http/personal-information/get-personal-information";
import { useSession } from "next-auth/react";

export default function DashboardModulesWrapper() {
  const { data: session, status } = useSession();

  const { data: personal } = useGetPersonalInformationUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data, isPending } = useGetAllModulesUsers(
    personal?.data.patient_type as string,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="space-y-4">
      <AlertInformationModule type={personal?.data.patient_type} />
      <CardListModule data={data?.data || []} isLoading={isPending} />
    </div>
  );
}

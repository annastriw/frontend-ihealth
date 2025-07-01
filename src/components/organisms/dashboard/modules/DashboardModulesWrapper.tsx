"use client";

import { useSession } from "next-auth/react";
import AlertInformationModule from "@/components/atoms/alert/AlertInformationModule";
import CardListModule from "@/components/molecules/card/CardListModule";
import { useGetPersonalInformationUser } from "@/http/personal-information/get-personal-information";
import { useGetAllModules } from "@/http/modulels/get-all-modules";

export default function DashboardModulesWrapper() {
  const { data: session, status } = useSession();

  const {
    data: personal,
    isLoading: isLoadingPersonal,
    isError: isErrorPersonal,
  } = useGetPersonalInformationUser(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const {
    data: modules,
    isLoading: isLoadingModules,
    isError: isErrorModules,
  } = useGetAllModules(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  if (status === "loading" || isLoadingPersonal) return <div>Loading...</div>;
  if (isErrorPersonal) return <div>Gagal mengambil data personal.</div>;
  if (isErrorModules) return <div>Gagal mengambil modul.</div>;

  return (
    <div className="space-y-4">
      <AlertInformationModule type="ALL" />
      <CardListModule data={modules || []} isLoading={isLoadingModules} />
    </div>
  );
}

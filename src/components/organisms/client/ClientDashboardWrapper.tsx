"use client";

import { ReactNode } from "react";
import { useGetCheckPersonalInformation } from "@/http/personal-information/get-check-personal-information";
import { useGetCheckMapsUser } from "@/http/users/get-check-maps-users";
import DashboardPersonalInformationWrapper from "../dashboard/DashboardPersonalInformationWrapper";
import SimpleMapTest from "../dashboard/maps/DashboardMapsWrapper";

export default function ClientDashboardWrapper({
  accessToken,
  role,
  children,
}: {
  accessToken: string;
  role: string;
  children: ReactNode;
}) {
  const shouldCheck = role !== "admin" && role !== "medical_personal";
  const canFetch = !!accessToken && shouldCheck;

  const {
    data: personalInfoData,
    isLoading: isPersonalInfoLoading,
  } = useGetCheckPersonalInformation(accessToken, {
    enabled: canFetch,
  });

  const personalInfoCompleted = personalInfoData?.data.is_completed ?? false;

  const {
    data: mapsData,
    isLoading: isMapsLoading,
  } = useGetCheckMapsUser(accessToken, {
    enabled: canFetch && personalInfoCompleted, 
  });

  const mapsCompleted = mapsData?.data.is_completed ?? false;

  if (shouldCheck && isPersonalInfoLoading) {
    return <div>Loading personal information...</div>;
  }

  if (shouldCheck && !personalInfoCompleted) {
    return <DashboardPersonalInformationWrapper />;
  }

  if (shouldCheck && isMapsLoading) {
    return <div>Loading maps...</div>;
  }

  if (shouldCheck && !mapsCompleted) {
    return <SimpleMapTest />;
  }

  return <>{children}</>;
}

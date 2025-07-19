// src/components/organisms/dashboard/booklet/DashboardModulesBookletWrapper.tsx
"use client";

import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import VideoYoutubeEmbed from "@/components/atoms/video/VideoYoutubeEmbed";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDetailBooklet } from "@/http/booklet/get-detail-booklet";
import { BASE_URL } from "@/lib/url";
import { ArrowDownToLine } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface DashboardModulesBookletWrapperProps {
  id: string;
}

export default function DashboardModulesBookletWrapper({
  id,
}: DashboardModulesBookletWrapperProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailBooklet(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filePath = data?.data.file_path
    ? `${BASE_URL}/storage/${data.data.file_path}`
    : "";

  return (
    <>
      <DashboardTitleBold head={data?.data.name ?? ""} />
      <div className="space-y-6">
        <VideoYoutubeEmbed
          url={data?.data.video_url ?? ""}
          isLoading={isPending}
        />
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="mb-4 grid w-fit max-w-sm grid-cols-2">
            <TabsTrigger value="content">Penjelasan Singkat</TabsTrigger>
            <TabsTrigger value="module-contents">Baca Booklet</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <div
              dangerouslySetInnerHTML={{ __html: data?.data.content ?? "" }}
            />
          </TabsContent>
          <TabsContent value="module-contents">
            <div className="space-y-4">
              
              {filePath && (
                <>
                  <div>
                    <Link href={filePath} target="_blank" rel="noopener noreferrer">
                      <Button>
                        <ArrowDownToLine className="mr-2" /> Simpan Booklet
                      </Button>
                    </Link>
                  </div>
                  <iframe
                    src={`https://docs.google.com/gview?url=${filePath}&embedded=true`}
                    className="h-[500px] w-full rounded border md:h-[800px] md:rounded-xl"
                    loading="lazy"
                  />
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

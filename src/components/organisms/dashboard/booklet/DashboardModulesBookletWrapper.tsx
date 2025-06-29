"use client";

import AlertDetailBookletModule from "@/components/atoms/alert/AlertDetailBookletModule";
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
  return (
    <>
      <DashboardTitleBold head={data?.data.name ?? ""} />
      <div className="space-y-6">
        <VideoYoutubeEmbed
          url={data?.data.video_url ?? ""}
          isLoading={isPending}
        />
        <Tabs defaultValue="module-contents" className="w-full">
          <TabsList className="mb-4 grid w-fit max-w-sm grid-cols-2">
            <TabsTrigger value="content">Konten Materi</TabsTrigger>
            <TabsTrigger value="module-contents">File Booklet</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <div
              dangerouslySetInnerHTML={{ __html: data?.data.content ?? "" }}
            />
          </TabsContent>
          <TabsContent value="module-contents">
            <div className="space-y-4">
              <AlertDetailBookletModule />
              <div>
                <Link
                  href={`${BASE_URL}/public/public/${data?.data.file_path}`}
                  target="_blank"
                >
                  <Button>
                    <ArrowDownToLine /> Download Booklet
                  </Button>
                </Link>
              </div>
              <iframe
                src={`https://docs.google.com/gview?url=${BASE_URL}/public/public/${data?.data.file_path}&embedded=true`}
                className="h-[500px] w-full rounded border md:h-[800px] md:rounded-xl"
                loading="lazy"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import VideoYoutubeEmbed from "@/components/atoms/video/VideoYoutubeEmbed";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDetailBooklet } from "@/http/booklet/get-detail-booklet";
import { BASE_URL } from "@/lib/url";
import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

interface DashboardModulesBookletWrapperProps {
  id: string;
}

export default function DashboardModulesBookletWrapper({
  id,
}: DashboardModulesBookletWrapperProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      if (session && typeof session === "object" && "access_token" in session) {
        setAccessToken((session as any).access_token ?? null);
      }
    };
    fetchToken();
  }, []);

  const { data, isPending } = useGetDetailBooklet(id, accessToken ?? "", {
    enabled: !!accessToken,
  });

  const filePath = data?.data.file_path
    ? `${BASE_URL}/storage/${data.data.file_path}`
    : "";

  return (
    <>
      <DashboardTitleBold head={data?.data.name ?? ""} />
      <div className="space-y-6">
        {data?.data.video_url !== "-" && data?.data.video_url && (
          <VideoYoutubeEmbed
            url={data.data.video_url}
            isLoading={isPending}
          />
        )}
        <Tabs defaultValue="module-contents" className="w-full">
          <TabsList className="mb-4 grid w-fit max-w-sm grid-cols-2 gap-2 bg-gray-100 p-1 rounded-md shadow-inner">
  <TabsTrigger
    value="module-contents"
    className="data-[state=active]:bg-primary data-[state=active]:text-black text-black rounded-md px-5 py-2 text-sm font-semibold transition-all duration-200 hover:bg-primary/20"
  >
    Baca Booklet
  </TabsTrigger>
  <TabsTrigger
    value="content"
    className="data-[state=active]:bg-primary data-[state=active]:text-black text-black rounded-md px-5 py-2 text-sm font-semibold transition-all duration-200 hover:bg-primary/20"
  >
    Penjelasan Singkat
  </TabsTrigger>
</TabsList>

          <TabsContent value="content">
  <div className="rounded-xl border bg-white px-6 py-6 shadow-sm">
    <div
      className="prose prose-base max-w-none text-gray-800 prose-headings:font-semibold prose-headings:text-primary prose-a:text-primary hover:prose-a:underline prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: data?.data.content ?? "" }}
    />
  </div>
</TabsContent>

          <TabsContent value="module-contents">
            <div className="space-y-4">
              {filePath && (
                <>
                  <div className="w-full flex justify-center md:justify-start">
                    <Link
                      href={filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto"
                    >
                      <Button
                        variant="ghost"
                        className="w-full md:w-auto text-black rounded-md bg-gray-100 px-5 py-2 text-sm font-semibold transition-all duration-200 hover:bg-primary/20"
                      >
                        <ArrowDownToLine className="mr-2 h-4 w-4" />
                        Simpan Booklet
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

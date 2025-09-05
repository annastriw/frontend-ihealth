"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import VideoYoutubeEmbed from "@/components/atoms/video/VideoYoutubeEmbed";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import StyledTabTrigger from "@/components/ui/styled-tab-trigger";
import { useGetDetailBooklet } from "@/http/booklet/get-detail-booklet";
import { BASE_URL } from "@/lib/url";
import { Maximize } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface DashboardModulesBookletWrapperProps {
  id: string;
}

// ✅ cubic-bezier dengan tuple (TS safe)
const cubicEaseOut = [0.25, 0.1, 0.25, 1] as const; // mirip easeOut
const cubicEaseIn = [0.42, 0, 1, 1] as const; // mirip easeIn

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: cubicEaseOut },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: cubicEaseIn },
  },
};

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
    <AnimatePresence mode="wait">
      {isPending ? (
        <motion.div
          key="skeleton"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <Skeleton className="h-8 w-1/3 rounded-md" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Skeleton className="h-64 w-full rounded-xl md:h-96" />
          </motion.div>
          <motion.div variants={itemVariants} className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-40 rounded-md" />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="space-y-2 rounded-xl border bg-white p-6 shadow-sm"
          >
            <Skeleton className="h-4 w-2/3 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-4">
            <Skeleton className="h-10 w-48 rounded-md" />
            <Skeleton className="h-[500px] w-full rounded-xl md:h-[800px]" />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <DashboardTitleBold head={data?.data.name ?? ""} />
          </motion.div>

          {data?.data.video_url !== "-" && data?.data.video_url && (
            <motion.div variants={itemVariants}>
              <VideoYoutubeEmbed
                url={data.data.video_url}
                isLoading={isPending}
              />
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="module-contents" className="w-full">
              <TabsList className="mb-4 flex w-full flex-wrap justify-center gap-2 rounded-md bg-gray-100 p-1 shadow-inner md:w-fit md:justify-start">
                <StyledTabTrigger value="module-contents">
                  Baca Booklet
                </StyledTabTrigger>
                <StyledTabTrigger value="content">
                  Penjelasan Singkat
                </StyledTabTrigger>
              </TabsList>

              <TabsContent value="content">
                <div className="rounded-xl border bg-white px-6 py-6 shadow-sm">
                  <div
                    className="prose prose-base max-w-none text-gray-800 prose-headings:font-semibold prose-headings:text-primary prose-a:text-primary hover:prose-a:underline prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{
                      __html: data?.data.content ?? "",
                    }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="module-contents">
                <div className="space-y-4">
                  {filePath && (
                    <>
                      <div className="flex w-full justify-center md:justify-start">
                        <Link
                          href={filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full md:w-auto"
                        >
                          <Button
                            variant="ghost"
                            className="w-full rounded-md bg-gray-100 px-5 py-2 text-sm font-semibold text-black transition-all duration-200 hover:bg-primary/20 md:w-auto"
                          >
                            <Maximize className="mr-2 h-4 w-4" />
                            Perbesar Booklet
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

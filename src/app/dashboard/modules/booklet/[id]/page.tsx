"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import DashboardModulesBookletWrapper from "@/components/organisms/dashboard/booklet/DashboardModulesBookletWrapper";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardModulesBookletPageProps {
  params: Promise<{ id: string }>;
}

// cubic-bezier easing → harus pakai `as const` biar TypeScript tau ini tuple, bukan number[]
const cubicEase = [0.25, 0.1, 0.25, 1] as const;

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
    transition: { duration: 0.4, ease: cubicEase },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: cubicEase },
  },
};

export default function DashboardModulesBookletPage({
  params,
}: DashboardModulesBookletPageProps) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id }) => setId(id));
  }, [params]);

  return (
    <section className="p-4">
      <AnimatePresence mode="wait">
        {!id ? (
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
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: cubicEase },
            }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.2, ease: cubicEase },
            }}
          >
            <DashboardModulesBookletWrapper id={id} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

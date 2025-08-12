"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQDiscussion } from "@/types/faq/faq";
import { motion } from "framer-motion";

interface AccordionFAQDashboardProps {
  data?: FAQDiscussion[];
}

export default function AccordionFAQDashboard({
  data,
}: AccordionFAQDashboardProps) {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {data?.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05,
              duration: 0.35,
              ease: "easeOut",
            }}
            className="rounded-md border border-green-500 bg-green-50 shadow-sm transition-shadow hover:bg-green-100 hover:shadow-md dark:border-green-400 dark:bg-green-900/40 dark:hover:bg-green-800/50"
          >
            <AccordionItem
              value={faq.id}
              className="group overflow-hidden transition-colors"
            >
              <AccordionTrigger
                className={`px-3 py-2 text-left text-sm font-medium text-white transition-colors duration-300 ease-in-out group-data-[state=open]:bg-[oklch(var(--primary)/0.06)] group-data-[state=open]:text-green-700 hover:bg-[oklch(var(--primary)/0.05)] hover:text-green-700 sm:px-4 sm:py-3 sm:text-[15px] dark:text-white dark:group-data-[state=open]:bg-[oklch(var(--primary-dark)/0.1)] dark:group-data-[state=open]:text-green-300 dark:hover:bg-[oklch(var(--primary-dark)/0.06)] dark:hover:text-green-300`}
              >
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground bg-white px-3 py-2 text-sm leading-relaxed sm:px-4 sm:py-3 dark:bg-neutral-900 dark:text-white">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
}

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqItems = [
  {
    value: "item-1",
    question: "Apakah penderita hipertensi harus menghindari garam sepenuhnya?",
    answer:
      "Tidak harus sepenuhnya, tetapi penderita hipertensi sangat disarankan untuk membatasi asupan garam (natrium). Garam yang berlebihan dapat meningkatkan tekanan darah. Sebaiknya gunakan garam rendah natrium dan perbanyak konsumsi makanan segar tanpa tambahan garam berlebih.",
  },
  {
    value: "item-2",
    question: "Apakah Diabetes Melitus bisa disembuhkan?",
    answer:
      "Diabetes Melitus tipe 1 dan 2 tidak dapat disembuhkan secara total, tetapi dapat dikendalikan dengan pola makan sehat, olahraga teratur, pengobatan yang tepat, dan pemantauan gula darah rutin. Manajemen yang baik membantu mencegah komplikasi jangka panjang.",
  },
  {
    value: "item-3",
    question: "Bagaimana cara sederhana menjaga kesehatan mental sehari-hari?",
    answer:
      "Menjaga kesehatan mental dapat dimulai dengan tidur cukup, olahraga ringan, berbagi cerita dengan orang terdekat, membatasi paparan stres, serta meluangkan waktu untuk aktivitas yang menyenangkan. Jika merasa kewalahan, penting untuk berkonsultasi dengan profesional seperti psikolog atau konselor.",
  },
];

export default function AccordionFAQ() {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="space-y-3">
        {faqItems.map((item, index) => (
          <motion.div
            key={item.value}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05,
              duration: 0.35,
              ease: "easeOut",
            }}
            className="rounded-md border border-[oklch(var(--primary)/0.15)] bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-neutral-900"
          >
            <AccordionItem
              value={item.value}
              className="group overflow-hidden transition-colors"
            >
              <AccordionTrigger
                className={`px-3 py-2 text-left text-sm font-medium text-neutral-800 transition-colors duration-200 group-data-[state=open]:bg-[oklch(var(--primary)/0.06)] group-data-[state=open]:text-green-700 hover:bg-[oklch(var(--primary)/0.05)] sm:px-4 sm:py-3 sm:text-[15px] dark:text-white dark:group-data-[state=open]:bg-[oklch(var(--primary-dark)/0.1)] dark:group-data-[state=open]:text-green-300 dark:hover:bg-[oklch(var(--primary-dark)/0.06)]`}
              >
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground bg-white px-3 py-2 text-sm leading-relaxed sm:px-4 sm:py-3 dark:bg-neutral-900">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
}

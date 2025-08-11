import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQDiscussion } from "@/types/faq/faq";

interface AccordionFAQDashboardProps {
  data?: FAQDiscussion[];
}

export default function AccordionFAQDashboard({
  data,
}: AccordionFAQDashboardProps) {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {data?.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="border bg-white text-black">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="border bg-white text-black">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

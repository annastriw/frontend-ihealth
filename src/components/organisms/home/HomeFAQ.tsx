import SectionTitle from "@/components/atoms/typography/SectionTitle";
import AccordionFAQ from "@/components/molecules/accordion/AccordionFAQ";

export default function HomeFAQ() {
  return (
    <section className="mt-24 space-y-6 md:space-y-12">
      <SectionTitle title="Pertanyaan Yang Sering Ditanyakan" />
      <AccordionFAQ />
    </section>
  );
}

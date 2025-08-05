import SectionTitle from "@/components/atoms/typography/SectionTitle";
import AccordionFAQ from "@/components/molecules/accordion/AccordionFAQ";

export default function HomeFAQ() {
  return (
    <section className="w-full scroll-mt-24 bg-white px-3 pt-6 pb-3 sm:px-4 sm:pt-8 sm:pb-4 md:px-6 md:pt-10 md:pb-5 lg:px-10 lg:pt-12 lg:pb-6 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl space-y-5 md:space-y-8">
        <SectionTitle title="Pertanyaan Yang Sering Ditanyakan" />
        <AccordionFAQ />
      </div>
    </section>
  );
}

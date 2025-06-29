import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionFAQ() {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Apakah pasien HD disarankan mengonsumsi buah segar?
          </AccordionTrigger>
          <AccordionContent>
            Pasien hemodialisis sebaiknya tidak mengonsumsi buah segar secara
            langsung karena umumnya mengandung kalium dalam jumlah tinggi. Untuk
            mengurangi kadar kalium, buah sebaiknya direndam atau dimasak
            terlebih dahulu sebelum dikonsumsi.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Apakah saya bisa berpindah dari HD ke CAPD, atau sebaliknya?
          </AccordionTrigger>
          <AccordionContent>
            Ya, pasien dapat berpindah dari Hemodialisis (HD) ke Continuous
            Ambulatory Peritoneal Dialysis (CAPD), atau sebaliknya, jika kondisi
            medis memungkinkan dan mendapatkan persetujuan dari dokter.
            Perpindahan ini biasanya didasarkan pada kenyamanan, efektivitas
            terapi, dan kemungkinan komplikasi.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Apakah kebutuhan nutrisi pada pasien CAPD dan HD sama?
          </AccordionTrigger>
          <AccordionContent>
            Kebutuhan nutrisi pasien CAPD dan HD tidak sepenuhnya sama. Hal ini
            disebabkan oleh perbedaan mekanisme pengeluaran cairan dan zat gizi
            dalam kedua metode dialisis, sehingga masing-masing memerlukan
            pengaturan diet yang spesifik untuk mengurangi risiko komplikasi dan
            menunjang kondisi tubuh secara optimal.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

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
            Apakah penderita hipertensi harus menghindari garam sepenuhnya?
          </AccordionTrigger>
          <AccordionContent>
            Tidak harus sepenuhnya, tetapi penderita hipertensi sangat disarankan
            untuk membatasi asupan garam (natrium). Garam yang berlebihan dapat
            meningkatkan tekanan darah. Sebaiknya gunakan garam rendah natrium dan
            perbanyak konsumsi makanan segar tanpa tambahan garam berlebih.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            Apakah Diabetes Melitus bisa disembuhkan?
          </AccordionTrigger>
          <AccordionContent>
            Diabetes Melitus tipe 1 dan 2 tidak dapat disembuhkan secara total,
            tetapi dapat dikendalikan dengan pola makan sehat, olahraga teratur,
            pengobatan yang tepat, dan pemantauan gula darah rutin. Manajemen yang
            baik membantu mencegah komplikasi jangka panjang.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            Bagaimana cara sederhana menjaga kesehatan mental sehari-hari?
          </AccordionTrigger>
          <AccordionContent>
            Menjaga kesehatan mental dapat dimulai dengan tidur cukup, olahraga
            ringan, berbagi cerita dengan orang terdekat, membatasi paparan
            stres, serta meluangkan waktu untuk aktivitas yang menyenangkan.
            Jika merasa kewalahan, penting untuk berkonsultasi dengan profesional
            seperti psikolog atau konselor.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

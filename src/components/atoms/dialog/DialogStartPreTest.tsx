import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface DialogStartPreTestProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogStartPreTest({
  open,
  setOpen,
  id,
}: DialogStartPreTestProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kerjakan Pre Test?</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72 pr-4">
          <div className="text-muted-foreground space-y-2 text-sm">
            <p>
              Pastikan Anda memahami hal-hal berikut sebelum memulai <strong>pre test</strong>:
            </p>
            <ol className="ml-5 list-decimal space-y-1">
              <li>
                <strong>Pre test</strong> bertujuan untuk mengetahui tingkat <strong>pemahaman awal</strong> Anda sebelum mempelajari materi edukasi kesehatan.
              </li>
              <li>
                Anda hanya memiliki <strong>1 (satu) kali kesempatan</strong> untuk mengerjakan pre test. Setelah dikumpulkan, Anda <strong>tidak dapat mengulang</strong>.
              </li>
              <li>
                Pastikan <strong>koneksi internet</strong> dalam kondisi <strong>stabil</strong> selama pengerjaan pre test.
              </li>
              <li>
                Jika koneksi internet <strong>terputus</strong> atau terjadi gangguan, Anda harus <strong>mengulang dari awal</strong>.
              </li>
              <li>
                Setelah menekan tombol <strong>“Selesai untuk Dinilai”</strong>, jawaban akan langsung dinilai dan <strong>tidak dapat diubah</strong>.
              </li>
              <li>
                Hasil <strong>penilaian</strong> dan <strong>jawaban benar</strong> akan ditampilkan setelah Anda menyelesaikan pre test.
              </li>
            </ol>
          </div>
        </ScrollArea>
      <DialogFooter>
        <div className="w-full flex justify-center">
          <Link href={`/work/pre-test/${id}`} className="w-full">
            <Button className="w-full">Kerjakan Sekarang</Button>
          </Link>
        </div>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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

interface DialogStartPostTestProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogStartPostTest({
  open,
  setOpen,
  id,
}: DialogStartPostTestProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kerjakan Post Test?</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-72 pr-4">
          <div className="text-muted-foreground space-y-2 text-sm">
            <p>
              Pastikan Anda memahami hal-hal berikut sebelum memulai <strong>post test</strong>:
            </p>
            <ol className="ml-5 list-decimal space-y-1">
              <li>
                <strong>Post test</strong> digunakan untuk mengevaluasi pemahaman Anda setelah mempelajari materi edukasi kesehatan.
              </li>
              <li>
                Anda dapat <strong>mengerjakan post test lebih dari satu kali</strong>, tanpa batasan jumlah percobaan.
              </li>
              <li>
                Pastikan <strong>koneksi internet</strong> dalam kondisi <strong>stabil</strong> selama pengerjaan.
              </li>
              <li>
                Jika koneksi internet <strong>terputus</strong>, Anda harus <strong>mengulang dari awal</strong>.
              </li>
              <li>
                Setelah menekan tombol <strong>“Selesai untuk Dinilai”</strong>, hasil akan disimpan dan dapat dilihat di menu <strong>Riwayat</strong>.
              </li>
              <li>
                Anda dapat melihat <strong>hasil penilaian</strong> dan <strong>jawaban benar</strong> setelah menyelesaikan post test.
              </li>
            </ol>
          </div>
        </ScrollArea>

      <DialogFooter className="flex justify-center">
        <Link href={`/work/post-test/${id}`} className="w-full max-w-md">
          <Button className="w-full">Kerjakan Sekarang</Button>
        </Link>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// src/components/atoms/dialog/DialogStartScreeningScoring.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface DialogStartScreeningScoringProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogStartScreeningScoring({
  open,
  setOpen,
  id,
}: DialogStartScreeningScoringProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mulai Screening Skoring?</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground">
          <p className="text-muted-foreground text-sm leading-6">
            Screening skoring ini bertujuan untuk memberikan <strong>evaluasi awal berbasis poin</strong> terhadap risiko Anda terhadap kondisi seperti <strong>Hipertensi</strong> atau <strong>Diabetes Melitus</strong>. Hasil yang diperoleh akan membantu Anda memahami sejauh mana kemungkinan risiko Anda.
          </p>
          <p className="mt-4 text-sm font-medium">Sebelum memulai, mohon perhatikan hal-hal berikut:</p>
          <ul className="list-outside list-decimal pl-5 text-sm leading-6 mt-2">
            <li>Pastikan koneksi internet Anda stabil.</li>
            <li>Setiap jawaban memiliki bobot skor tertentu.</li>
            <li>
              Anda <strong>bisa mengerjakan lebih dari satu kali</strong> untuk evaluasi berkala.
            </li>
            <li>
              Jawaban yang telah dikirim <strong>tidak dapat diubah</strong>.
            </li>
            <li>
              Isi sesuai kondisi dan keadaan Anda secara <strong>jujur</strong>.
            </li>
            <li>
              Setelah klik <strong>“Kerjakan Sekarang”</strong>, Anda akan diarahkan ke halaman pengisian.
            </li>
          </ul>
        </div>
        <DialogFooter>
          <Link href={`/work/screening-scoring/${id}`}>
            <Button>Kerjakan Sekarang</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

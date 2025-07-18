// src/components/atoms/dialog/DialogStartScreeningDASS.tsx

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface DialogStartScreeningDASSProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogStartScreeningDASS({
  open,
  setOpen,
  id,
}: DialogStartScreeningDASSProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mulai Screening DASS-21?</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground">
          <p className="text-sm leading-6">
            Screening ini menggunakan <strong>kuisioner DASS-21</strong> untuk menilai kondisi <strong>Depresi</strong>, <strong>Kecemasan</strong>, dan <strong>Stres</strong> yang Anda alami. Hasil ini bukan diagnosis medis, namun dapat digunakan sebagai acuan untuk memahami kondisi kesehatan mental Anda.
          </p>
          <p className="mt-4 text-sm font-medium">Sebelum memulai, perhatikan hal-hal berikut:</p>
          <ul className="list-outside list-decimal pl-5 text-sm leading-6 mt-2">
            <li>Pastikan koneksi internet Anda stabil.</li>
            <li>Jawaban Anda akan memengaruhi hasil skor interpretasi.</li>
            <li>
              Anda <strong>bisa mengerjakan lebih dari satu kali</strong> untuk evaluasi berkala.
            </li>
            <li>
              Jawaban yang telah dikirim <strong>tidak dapat diubah</strong>.
            </li>
            <li>
              Isi sesuai kondisi dan perasaan Anda selama <strong>1 minggu terakhir</strong>.
            </li>
            <li>
              Setelah klik <strong>“Kerjakan Sekarang”</strong>, Anda akan diarahkan ke halaman pertanyaan.
            </li>
          </ul>
        </div>
        <DialogFooter>
          <Link href={`/work/screening-dass/${id}`}>
            <Button>Kerjakan Sekarang</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

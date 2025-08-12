// src/components/atoms/dialog/DialogStartScreeningDASS.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleStart = () => {
    setOpen(false); // tutup dialog
    router.push(`/work/screening-dass`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mulai Screening DASS-21?</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground space-y-2 text-sm leading-6">
          <p>
            Screening ini menggunakan <strong>kuisioner DASS-21</strong> untuk menilai kondisi <strong>Depresi</strong>, <strong>Kecemasan</strong>, dan <strong>Stres</strong>. Hasil ini bukan diagnosis medis, namun dapat digunakan sebagai acuan untuk memahami kondisi kesehatan mental Anda.
          </p>
          <p className="font-medium">Sebelum memulai, perhatikan hal-hal berikut:</p>
          <ul className="list-decimal pl-5">
            <li>Pastikan koneksi internet Anda stabil.</li>
            <li>Jawaban Anda akan memengaruhi hasil skor interpretasi.</li>
            <li><strong>Bisa dikerjakan lebih dari satu kali</strong> untuk evaluasi berkala.</li>
            <li>Jawaban yang telah dikirim <strong>tidak dapat diubah</strong>.</li>
            <li>Isi sesuai kondisi dan perasaan selama <strong>1 minggu terakhir</strong>.</li>
            <li>Setelah klik <strong>“Kerjakan Sekarang”</strong>, Anda akan diarahkan ke halaman pertanyaan.</li>
          </ul>
        </div>
      <DialogFooter className="flex justify-center">
        <Button className="w-full max-w-md" onClick={handleStart}>
          Kerjakan Sekarang
        </Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

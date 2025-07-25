// src/components/atoms/dialog/DialogStartScreeningHSMBQ.tsx
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

interface DialogStartScreeningHSMBQProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogStartScreeningHSMBQ({
  open,
  setOpen,
  id,
}: DialogStartScreeningHSMBQProps) {
  const router = useRouter();

  const handleStart = () => {
    setOpen(false);
    router.push(`/work/screening-hsmbq`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mulai Screening HSMBQ?</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground space-y-2 text-sm leading-6">
          <p>
            Screening ini menggunakan <strong>kuisioner HSMBQ</strong> untuk menilai kesejahteraan spiritual dan psikologis Anda. Hasil ini bukan diagnosis medis, namun dapat menjadi panduan dalam menjaga kesehatan mental dan emosional.
          </p>
          <p className="font-medium">Sebelum memulai, perhatikan hal-hal berikut:</p>
          <ul className="list-decimal pl-5">
            <li>Pastikan koneksi internet Anda stabil.</li>
            <li>Jawaban Anda akan memengaruhi hasil interpretasi.</li>
            <li><strong>Bisa dikerjakan lebih dari satu kali</strong> untuk evaluasi berkala.</li>
            <li>Jawaban yang telah dikirim <strong>tidak dapat diubah</strong>.</li>
            <li>Isi sesuai kondisi dan perasaan selama <strong>1 minggu terakhir</strong>.</li>
            <li>Setelah klik <strong>“Kerjakan Sekarang”</strong>, Anda akan diarahkan ke halaman pertanyaan.</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={handleStart}>Kerjakan Sekarang</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

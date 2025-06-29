import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface DialogStartScreeningProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogStartScreening({
  open,
  setOpen,
  id,
}: DialogStartScreeningProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mulai Screening?</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground">
          <p className="text-muted-foreground text-sm leading-6">
            Formulir screening ini dirancang untuk membantu mengidentifikasi
            tanda atau faktor risiko yang dapat mengarah pada masalah ginjal.
            Hasil dari screening ini bukan merupakan diagnosis medis. Untuk
            kepastian lebih lanjut, disarankan berkonsultasi dengan dokter atau
            tenaga kesehatan. Sebelum mengisi, perhatikan hal berikut:
          </p>
          <ul className="list-outside list-decimal pl-5 text-sm leading-6">
            <li>Pastikan koneksi internet Anda stabil selama pengisian.</li>
            <li>Formulir ini hanya bisa diisi satu kali.</li>
            <li>Jika koneksi terputus, pengisian harus dimulai dari awal.</li>
            <li>
              Jawaban Anda akan digunakan untuk analisis awal dan tidak dapat
              diubah setelah dikirim.
            </li>
            <li>
              Tidak ada jawaban benar atau salah, isi sesuai kondisi Anda dengan
              jujur.
            </li>
            <li>
              Setelah Anda klik “Selesai & Kumpulkan”, screening dianggap
              selesai.
            </li>
          </ul>
        </div>
        <DialogFooter>
          <Link href={`/work/screening/${id}`}>
            <Button>Kerjakan Sekarang</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
            tanda atau faktor risiko yang dapat mengarah pada{" "}
            <strong>Hipertensi</strong> dan <strong>Diabetes Melitus</strong>.
            Hasil dari screening ini <strong>bukan merupakan diagnosis medis</strong>.
            Untuk kepastian lebih lanjut, disarankan untuk berkonsultasi langsung
            dengan dokter atau tenaga kesehatan profesional.
          </p>
          <p className="mt-4 text-sm font-medium">Sebelum mengisi, harap perhatikan hal-hal berikut:</p>
          <ul className="list-outside list-decimal pl-5 text-sm leading-6 mt-2">
            <li>Pastikan koneksi internet Anda stabil selama pengisian.</li>
            <li>
              Formulir ini <strong>dapat diisi lebih dari satu kali</strong>, jika Anda ingin
              melakukan evaluasi ulang.
            </li>
            <li>Jika koneksi terputus, Anda dapat memulai kembali pengisian dari awal.</li>
            <li>
              Jawaban Anda akan digunakan untuk analisis awal dan{" "}
              <strong>tidak dapat diubah</strong> setelah dikirim.
            </li>
            <li>
              Tidak ada jawaban benar atau salah — mohon isi dengan <strong>jujur</strong>{" "}
              sesuai kondisi Anda saat ini.
            </li>
            <li>
              Setelah Anda klik tombol <strong>“Selesai & Kumpulkan”</strong>, pengisian
              screening dianggap selesai dan akan tersimpan di riwayat Anda.
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

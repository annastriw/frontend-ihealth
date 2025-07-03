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
      Pastikan anda memahami hal berikut sebelum mengerjakan post test:
    </p>
    <ol className="ml-5 list-outside list-decimal space-y-1">
      <li>Pastikan koneksi internet anda stabil.</li>
      <li>Anda dapat mengerjakan post test lebih dari satu kali.</li>
      <li>
        Jika koneksi internet anda terputus, anda harus mengulang post test dari awal.
      </li>
      <li>
        Setelah anda memilih &quot;Selesai untuk Dinilai&quot;, hasil akan disimpan dan ditampilkan di riwayat.
      </li>
      <li>Jawaban dapat anda lihat setelah selesai mengerjakan.</li>
    </ol>
  </div>
</ScrollArea>


        <DialogFooter>
          <Link href={`/work/post-test/${id}`}>
            <Button>Kerjakan Sekarang</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

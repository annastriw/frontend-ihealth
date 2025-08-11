import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DialogAgreementRegisterProps {
  open: boolean;
  onConfirm: () => void;
  setOpen: (open: boolean) => void;
}

export default function DialogAgreementRegister({
  open,
  onConfirm,
  setOpen,
}: DialogAgreementRegisterProps) {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Syarat dan Persetujuan</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-72">
          <div className="text-muted-foreground space-y-3 text-sm">
            <div>
              Dengan ini saya menyatakan bahwa saya setuju untuk ikut
              berpartisipasi dalam penelitian berbasis website ini
              &quot;iHealth Edu&quot; dengan penuh kesadaran dan tanpa
              ada paksaan dari siapapun dengan kondisi:
            </div>
            <ol className="ml-4 list-decimal space-y-1">
              <li>
                Data yang didapatkan dari penelitian ini akan dijaga
                kerahasiaannya dan hanya digunakan untuk kepentingan ilmiah.
              </li>
              <li>
                Saya berhak untuk mengundurkan diri dari penelitian ini kapan
                saja tanpa perlu memberikan alasan apa pun.
              </li>
            </ol>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="agree"
                checked={isAgreed}
                onCheckedChange={(value) => setIsAgreed(!!value)}
              />
              <Label htmlFor="agree">Saya menyetujui persyaratan di atas</Label>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={onConfirm} disabled={!isAgreed}>
            Daftar Sekarang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

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
import { useState, useTransition } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    if (isAgreed && !isPending) {
      startTransition(() => {
        onConfirm();
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-visible border-none bg-transparent p-0 shadow-none">
        <AnimatePresence>
          {open && (
            <motion.div
              key="dialog-motion"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-background mx-auto w-full max-w-lg space-y-4 rounded-2xl p-6 shadow-xl"
            >
              <DialogHeader>
                <DialogTitle>Syarat dan Persetujuan</DialogTitle>
              </DialogHeader>

              <ScrollArea className="h-72 pr-4">
                <div className="text-muted-foreground space-y-3 text-sm">
                  <div>
                    Dengan ini saya menyatakan bahwa saya setuju untuk ikut
                    berpartisipasi dalam penelitian berbasis website ini
                    <strong>&quot;iHealth Edu&quot;</strong> dengan penuh
                    kesadaran dan tanpa ada paksaan dari siapapun dengan
                    kondisi:
                  </div>
                  <ol className="ml-4 list-decimal space-y-1">
                    <li>
                      Data yang didapatkan dari penelitian ini akan dijaga
                      kerahasiaannya dan hanya digunakan untuk kepentingan
                      ilmiah.
                    </li>
                    <li>
                      Saya berhak untuk mengundurkan diri dari penelitian ini
                      kapan saja tanpa perlu memberikan alasan apa pun.
                    </li>
                  </ol>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="agree"
                      checked={isAgreed}
                      onCheckedChange={(value) => setIsAgreed(!!value)}
                    />
                    <Label htmlFor="agree">
                      Saya menyetujui persyaratan di atas
                    </Label>
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleConfirm}
                  disabled={!isAgreed || isPending}
                  className="hover:bg-primary/90 w-full transform transition-transform duration-200 hover:scale-105"
                >
                  {isPending ? "Loading..." : "Daftar Sekarang"}
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

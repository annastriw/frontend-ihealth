import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CardComunity() {
  return (
    <div>
      <div className="text-card-foreground relative flex w-full flex-col justify-between overflow-hidden rounded-xl shadow-xl">
        <div className="z-10 flex flex-col space-y-5">
          <div className="from-primary to-secondary relative flex min-h-36 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-tr p-12">
            <div className="flex flex-col gap-6 text-center">
              <h3 className="font-paytone text-4xl text-white">
                Bergabung di Forum Komunitas
              </h3>
              <p className="text-center text-lg text-white">
                Berbagi pengalaman dan Saling Bertanya!
              </p>
              <Link href={"/login"}>
                <Button
                  className="text-primary hover:text-primary bg-white text-base font-semibold hover:bg-white"
                  size={"lg"}
                >
                  Bergabung Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="from-secondary/30 to-primary/30 absolute -top-10 right-0 h-52 w-60 rotate-45 rounded-full bg-gradient-to-r blur-lg"></div>
      </div>
    </div>
  );
}

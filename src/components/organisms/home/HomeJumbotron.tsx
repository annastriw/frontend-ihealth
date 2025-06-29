import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomeJumbotron() {
  return (
    <div className="flex items-center md:min-h-screen">
      <div className="flex w-full flex-col items-center gap-16 md:min-h-screen lg:flex-row lg:items-center">
        <div className="flex w-full flex-col gap-10 text-start md:text-center lg:w-1/2 lg:text-start">
          <h1 className="font-paytone mt-12 text-3xl font-bold uppercase md:leading-[72px] lg:-mt-24 lg:text-5xl">
            <span>Platform Edukasi</span>
            <span className="from-primary to-secondary inline-block bg-gradient-to-r bg-clip-text text-4xl text-transparent md:text-6xl">
              Dialisis Connect Edu
            </span>
          </h1>
          <p className="text-md">
            Website ini menyediakan informasi terpercaya tentang terapi
            pengganti ginjal, seperti dialisis dan transplantasi, untuk pasien,
            keluarga, dan masyarakat. Dengan konten berbasis ilmu keperawatan
            yang mudah dipahami, kami bertujuan meningkatkan kesadaran,
            pengetahuan, dan kepatuhan dalam perawatan gagal ginjal kronis.
          </p>
          <div>
            <Link href={"/login"}>
              <Button size={"lg"} className="min-w-[200px]">
                Coba Sekarang
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden w-full md:block lg:w-1/2">
          <Image
            src={"/images/assets/bg-hero.png"}
            alt="Hero"
            width={1024}
            height={1024}
          />
        </div>
      </div>
    </div>
  );
}

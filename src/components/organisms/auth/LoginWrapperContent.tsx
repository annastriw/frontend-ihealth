import FormAuthLogin from "@/components/molecules/form/auth/FormAuthLogin";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function LoginWrapperContent() {
  return (
    <div className="relative flex h-screen flex-col md:grid lg:grid-cols-2 lg:max-w-none lg:px-0">
      {/* Tombol Sign In (Desktop Only) */}
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 z-50 hidden md:right-8 md:top-8"
        )}
      >
        Sign In
      </Link>

      {/* Kiri: Gambar Dokter di Tengah + Tulisan di Pojok */}
      <div className="relative hidden h-full bg-primary lg:flex flex-col justify-between p-10 text-white dark:border-r">
        {/* Logo Kiri Atas */}
        <div className="relative z-20 flex items-center gap-3 text-lg font-medium">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/assets/bg-about-us.png"
              alt="iHealth Edu"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-semibold tracking-wide text-white">
              iHealth Edu
            </span>
          </Link>
        </div>

        {/* Gambar Dokter di Tengah */}
        <div className="flex flex-1 justify-center items-center">
          <Image
            src="/images/assets/bg-hero.png" // ganti jika beda
            alt="Dokter"
            width={384}
            height={384}
            className="w-200 h-auto object-contain"
          />
        </div>

        {/* Tulisan Bawah Kiri */}
        <div className="z-20 mt-4">
          <p className="max-w-md text-lg leading-relaxed">
            Platform edukasi kesehatan untuk <strong>Hipertensi</strong>,{" "}
            <strong>Diabetes Melitus</strong>, dan{" "}
            <strong>Kesehatan Mental</strong>
          </p>
        </div>
      </div>

      {/* Kanan: Form Login + Logo Mobile */}
      <div className="flex h-full items-center justify-center px-4 py-8 sm:px-6 md:px-10 lg:px-16 bg-background">
        <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-white p-6 shadow-md dark:bg-gray-900 dark:border-gray-800">
          {/* Logo Mobile di Dalam Card */}
          <div className="mb-2 flex justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/assets/bg-about-us.png"
                alt="iHealth Edu"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-semibold text-black dark:text-white">
                iHealth Edu
              </span>
            </Link>
          </div>

          {/* Form Login */}
          <FormAuthLogin />
        </div>
      </div>
    </div>
  );
}

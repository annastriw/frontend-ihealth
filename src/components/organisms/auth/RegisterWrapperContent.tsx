import FormAuthRegister from "@/components/molecules/form/auth/FormAuthRegister";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function RegisterWrapperContent() {
  return (
    <div className="relative flex h-screen flex-col md:grid lg:grid-cols-2 lg:max-w-none lg:px-0">
      {/* Tombol Sign In (Desktop only) */}
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 z-50 hidden md:right-8 md:top-8"
        )}
      >
        Sign In
      </Link>

      {/* Kiri: Gambar, Logo, dan Quote (Desktop only) */}
      <div className="relative hidden h-full flex-col justify-between bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0">
          <div className="bg-primary absolute inset-0 bg-cover bg-center bg-no-repeat" />
        </div>

        {/* Logo iHealth Edu */}
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/assets/bg-about-us.png"
              alt="iHealth Edu"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-semibold tracking-wide text-white dark:text-white">
              iHealth Edu
            </span>
          </Link>
        </div>

        {/* Gambar dokter di tengah */}
        <div className="relative z-20 flex flex-1 items-center justify-center">
          <Image
            src="/images/assets/bg-hero.png"
            alt="Dokter"
            width={384}
            height={384}
            className="w-200 h-auto object-contain"
          />
        </div>

        {/* Quote di kiri bawah */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="max-w-md text-lg">
              Platform edukasi kesehatan untuk <strong>Hipertensi</strong>, <strong>Diabetes Melitus</strong>, dan <strong>Kesehatan Mental</strong>.
            </p>
          </blockquote>
        </div>
      </div>

      {/* Kanan: Form Register dan Logo untuk Mobile */}
      <div className="flex h-full items-start justify-center overflow-y-auto px-4 py-8 sm:px-6 md:px-10 lg:px-16 bg-background mt-2 md:mt-0">
        <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-white p-6 shadow-md dark:bg-gray-900 dark:border-gray-800">
          
          {/* Logo iHealth Edu untuk Mobile */}
          <div className="mb-4 mt-2 flex justify-center lg:hidden">
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

          {/* Form Pendaftaran */}
          <FormAuthRegister />
        </div>
      </div>
    </div>
  );
}

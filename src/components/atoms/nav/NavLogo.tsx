"use client";
import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-all">
      <Image
        src="/images/assets/bg-about-us.png"
        alt="iHealth Edu"
        width={40}
        height={40}
        className="w-10 h-10 md:w-12 md:h-12 object-contain"
      />
      <span className="text-lg font-bold tracking-tight text-black">
        iHealth Edu
      </span>
    </Link>
  );
}

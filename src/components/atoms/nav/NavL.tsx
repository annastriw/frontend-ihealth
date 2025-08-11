import Image from "next/image";
import Link from "next/link";

export default function NavL() {
  return (
    <div className="flex items-center gap-3 md:gap-5 px-4 py-2">
      <Link href="/" className="flex items-center gap-1 md:gap-2">
        <div className="flex-shrink-0">
          <Image
            src="/images/assets/bg-about-us.png"
            alt="iHealth Edu"
            width={64}
            height={64}
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />
        </div>
        <h1 className="font-bold text-lg md:text-xl">iHealth Edu</h1>
      </Link>
    </div>
  );
}

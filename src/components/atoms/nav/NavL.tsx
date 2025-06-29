import Image from "next/image";
import Link from "next/link";

export default function NavL() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <div className="flex items-center">
              <Image
                src={"/images/assets/bg-about-us.png"}
                alt="Dialisis Connect"
                width={75}
                height={75}
              />
            </div>
            <h1 className="font-bold">Dialisis Connect Edu</h1>
          </Link>
        </div>
      </div>
    </>
  );
}

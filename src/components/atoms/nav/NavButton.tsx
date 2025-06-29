import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link as NavbarLink } from "@/components/organisms/navbar/Navbar";
import NavLink from "./NavLink";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface NavHeaderProps {
  links: NavbarLink[];
}

export default function NavButton({ links }: NavHeaderProps) {
  const { data: session } = useSession();

  return (
    <>
      <div className="hidden items-center gap-4 md:flex">
        {session ? (
          <div>
            <Link href={"/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant={"outline"} size={"lg"} className="font-semibold">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button variant={"default"} size={"lg"} className="font-semibold">
                Daftar
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center md:hidden">
        <Sheet>
          {/* Hamburger */}
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-full shrink-0 border-0 bg-white text-black shadow-none md:hidden"
            >
              <Menu
                style={{ height: "20px", width: "20px" }}
                className="h-24 w-24"
              />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col">
            <div className="mx-auto my-8">
              <Link href={"/"} className="flex items-center gap-2">
                <Image
                  src={"/images/assets/bg-about-us.png"}
                  alt="iHealth Edu"
                  width={37}
                  height={37}
                />
                <h1 className="font-bold">iHealth Edu</h1>
              </Link>
            </div>
            {session ? (
              <div className="w-full gap-2 px-4">
                <Link href={"/dashboard"}>
                  <Button className="w-full">Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="flex w-full gap-2 px-4">
                <Link href="/login" className="w-full">
                  <Button variant={"outline"} className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="w-full">
                  <Button variant={"default"} className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
            <nav className="grid-gap-2 space-y-4 px-4">
              {links.map((link) => (
                <NavLink key={link.label} {...link} />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

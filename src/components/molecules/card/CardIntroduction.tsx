import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CardIntroductionProps {
  title: string;
  description: string;
  href: string;
}

export default function CardIntroduction({
  title,
  description,
  href,
}: CardIntroductionProps) {
  return (
    <div className="bg-card text-card-foreground relative flex w-full max-w-[40rem] flex-col justify-between overflow-hidden rounded-xl shadow-xl">
      <div className="z-10 flex flex-col space-y-5 p-6">
        <div className="from-primary to-secondary relative flex min-h-36 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-tr p-5">
          <h3 className="text-2xl font-bold tracking-tight break-words text-white">
            {title}
          </h3>
        </div>
        <p className="text-md text-muted-foreground">{description}</p>
        <Link href={href} className="w-full">
          <Button size={"lg"} className="text-md w-full font-semibold">
            Baca Selengkapnya
          </Button>
        </Link>
      </div>
      <div className="from-secondary/30 to-primary/30 absolute -top-10 right-0 h-52 w-60 rotate-45 rounded-full bg-gradient-to-r blur-lg"></div>
    </div>
  );
}

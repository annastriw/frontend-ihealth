import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import Link from "next/link";

interface CardDashboardTitleProps {
  title: string;
  icon?: React.ComponentType<LucideProps>;
  iconProps?: LucideProps;
  link: string;
  description?: string;
}

export default function CardDashboardTitle({
  title,
  icon: Icon,
  iconProps,
  link,
  description,
}: CardDashboardTitleProps) {
  return (
    <Link href={`/dashboard/${link}`} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary">
        <CardHeader className="flex flex-col items-center justify-center gap-1 p-3">
          {Icon && (
            <Icon
              className="text-primary w-8 h-8 group-hover:scale-110 transition-transform"
              {...iconProps}
            />
          )}
          <h1 className="text-center text-base font-semibold">{title}</h1>
        </CardHeader>
        <CardContent className="px-4 pb-4 text-center text-xs text-muted-foreground">
          {description}
        </CardContent>
      </Card>
    </Link>
  );
}

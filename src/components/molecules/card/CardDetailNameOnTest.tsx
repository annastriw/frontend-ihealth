import { Card, CardContent } from "@/components/ui/card";

interface CardDetailNameOnTestProps {
  name: string;
}

export default function CardDetailNameOnTest({
  name,
}: CardDetailNameOnTestProps) {
  return (
    <Card>
      <CardContent>
        <div className="space-y-1">
          <div className="text-muted-foreground">Nama Lengkap</div>
          <div className="text-lg font-semibold capitalize">{name}</div>
        </div>
      </CardContent>
    </Card>
  );
}

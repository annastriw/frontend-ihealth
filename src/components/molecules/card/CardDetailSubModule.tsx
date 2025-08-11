import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SubModules } from "@/types/modules/modules";

interface CardDetailSubModuleProps {
  data?: SubModules;
  isLoading: boolean;
}

export default function CardDetailSubModule({
  data,
  isLoading,
}: CardDetailSubModuleProps) {
  return (
    <div>
      <Card>
        <CardContent>
          <div className="space-y-2">
            <h1 className="font-semibold">Deskripsi</h1>
            {isLoading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <p className="text-muted-foreground">
                {data?.description ?? "Tidak ada deskripsi"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

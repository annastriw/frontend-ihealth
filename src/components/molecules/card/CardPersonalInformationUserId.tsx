import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PersonalInformation } from "@/types/personal-information/personal-information";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface CardPersonalInformationUserIdProps {
  data?: PersonalInformation;
  isLoading: boolean;
}

export default function CardPersonalInformationUserId({
  data,
  isLoading,
}: CardPersonalInformationUserIdProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
          <CardDescription>
            Menampilkan data informasi pribadi dari pasien.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:space-y-6">
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">Nama</div>
              <div>
                {isLoading ? <Skeleton className="w-32" /> : data?.name}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">Tempat Lahir</div>
              <div>
                {isLoading ? (
                  <Skeleton className="w-32" />
                ) : (
                  data?.place_of_birth
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">Tanggal Lahir</div>
              <div>
                {isLoading ? (
                  <Skeleton className="w-32" />
                ) : data?.date_of_birth ? (
                  format(new Date(data.date_of_birth), "dd MMMM yyyy", {
                    locale: id,
                  })
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">Umur</div>
              <div>
                {isLoading ? (
                  <Skeleton className="w-20" />
                ) : (
                  `${data?.age} Tahun`
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">Jenis Kelamin</div>
              <div>
                {isLoading ? (
                  <Skeleton className="w-32" />
                ) : data?.gender === "male" ? (
                  "Laki-laki"
                ) : data?.gender === "female" ? (
                  "Perempuan"
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">Pekerjaan</div>
              <div>
                {isLoading ? <Skeleton className="w-32" /> : data?.work}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">Sudah Menikah</div>
              <div>
                {isLoading ? (
                  <Skeleton className="w-32" />
                ) : data?.is_married ? (
                  "Sudah Menikah"
                ) : (
                  "Belum Menikah"
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">Pendidikan Terakhir</div>
              <div>
                {isLoading ? (
                  <Skeleton className="w-32" />
                ) : (
                  data?.last_education
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">
                Riwayat pelayanan kesehatan sebelumnya
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="w-32" />
                ) : (
                  data?.origin_disease
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">Tipe Pasien</div>
              <div className="uppercase">
                {isLoading ? <Skeleton className="w-32" /> : data?.patient_type}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">
                Lama Pelayanan Kesehatan
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="w-32" />
                ) : (
                  data?.disease_duration
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground">
                Terapi Yang Pernah Dijalani
              </div>
              <div className="uppercase">
                {isLoading ? (
                  <Skeleton className="w-32" />
                ) : data?.history_therapy?.toLowerCase() === "nothing" ? (
                  "Tidak ada"
                ) : (
                  data?.history_therapy
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
